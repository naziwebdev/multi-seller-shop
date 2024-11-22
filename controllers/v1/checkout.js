const {
  Checkout,
  Order,
  Cart,
  CartItem,
  SellersProduct,
  CheckoutItem,
  OrderItem,
} = require("../../db");
const { createPeyment, verifyPeyment } = require("../../services/zarinpal");
const { createCheckoutValidator } = require("../../validators/checkout");

exports.createCheckout = async (req, res, next) => {
  try {
    const user = req.user;
    const { shippingAddress } = req.body;

    await createCheckoutValidator.validate(req.body, { abortEarly: false });

    const cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
    });
    if (cartItems.length === 0) {
      return res.status(404).json({ message: "cart is empety" });
    }

    const checkoutItems = [];

    for (const item of cartItems) {
      const { product_id, seller_id } = item;

      const sellerProductDetail = await SellersProduct.findOne({
        where: { seller_id, product_id },
      });

      if (!sellerProductDetail) {
        return res
          .status(404)
          .json({ message: "seller doenot sell this product" });
      }

      checkoutItems.push({
        quantity: item.quantity,
        priceAtTimeOfPurchase: sellerProductDetail.price,
        product_id,
        seller_id,
      });
    }

    const totalPrice = checkoutItems.reduce((total, item) => {
      return total + item.priceAtTimeOfPurchase * item.quantity;
    }, 0);

    const peyment = await createPeyment({
      amoutInRial: totalPrice,
      description: `پرداخت از فروشکاه مولتی سلر`,
    });

    const newCheckout = await Checkout.create({
      user_id: user.id,
      shippingAddress,
      authority: peyment.authority,
    });

    for (const item of checkoutItems) {
      item.checkout_id = newCheckout.id;
      await CheckoutItem.create({ ...item });
    }

    return res.status(201).json({
      message: "checkout created successfully",
      paymentUrl: peyment.paymentUrl,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyCheckout = async (req, res, next) => {
  try {
    const { Status, Authority: authority } = req.query;

    const existOrder = await Order.findOne({ where: { authority } });
    if (existOrder) {
      return res.status(400).json({ message: "peyment already veryfied" });
    }

    const checkout = await Checkout.findOne({ where: { authority } });
    if (!checkout) {
      return res.status(404).json({ message: "not found checkout" });
    }

    const checkoutItems = await CheckoutItem.findAll({
      where: { checkout_id: checkout.id },
    });
    if (!checkoutItems) {
      return res.status(404).json({ message: "not found checkoutItems" });
    }

    const totalPrice = checkoutItems.reduce((total, item) => {
      return total + item.priceAtTimeOfPurchase * item.quantity;
    }, 0);

    const peyment = await verifyPeyment({ amoutInRial: totalPrice, authority });

    if (![100, 101].includes(peyment.code)) {
      return res.status(400).json({ message: "peyment is not verified !" });
    }

    const newOrder = await Order.create({
      shippingAddress: JSON.parse(checkout.shippingAddress),
      user_id: checkout.user_id,
      authority,
    });

    for (const item of checkoutItems) {
      const newItem = {
        quantity: item.quantity,
        priceAtTimeOfPurchase: item.priceAtTimeOfPurchase,
        product_id: item.product_id,
        seller_id: item.seller_id,
        order_id: newOrder.id,
      };
      await OrderItem.create({ ...newItem });

      const productSeller = await SellersProduct.findOne({
        where: { seller_id: item.seller_id, product_id: item.product_id },
      });
      if (productSeller) {
        productSeller.stock = productSeller.stock - item.quantity;
        await productSeller.save();
      }
    }

    const userCart = await Cart.findOne({
      where: { user_id: checkout.user_id },
    });
    await CartItem.destroy({
      where: {
        cart_id: userCart.id,
      },
    });

    await Checkout.destroy({ where: { user_id: checkout.user_id } });
    await CheckoutItem.destroy({ where: { checkout_id: checkout.id } });

    return res.status(200).json({ message: "checkout verified" });
  } catch (error) {
    next(error);
  }
};
