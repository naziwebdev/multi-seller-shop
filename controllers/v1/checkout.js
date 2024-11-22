const {
  Checkout,
  Order,
  Cart,
  CartItem,
  SellersProduct,
  CheckoutItem,
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
  } catch (error) {
    next(error);
  }
};
