const { Cart, CartItem, Product, Seller, SellersProduct } = require("../../db");
const {
  addToCartValidator,
  removeFromCartValidator,
} = require("../../validators/cart");

exports.getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: Seller,
              as: "seller",
            },
          ],
        },
      ],

      where: { user_id: user.id },
    });

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    const { product_id, seller_id, quantity } = req.body;
    await addToCartValidator.validate(req.body, { abortEarly: false });

    const product = await Product.findOne({
      where: { id: product_id },
      raw: true,
    });
    if (!product) {
      return res.status(404).json({ message: "not found product" });
    }

    const seller = await Seller.findOne({ where: { id: seller_id } });
    if (!seller) {
      return res.status(404).json({ message: "not found seller" });
    }

    const sellerForProduct = await SellersProduct.findOne({
      where: { seller_id, product_id },
      raw: true,
    });

    if (!sellerForProduct) {
      return res
        .status(404)
        .json({ message: "this seller doesnot for this product" });
    }

    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    const priceAtTimeOfAdding = sellerForProduct.price;

    if (!cart) {
      const newCart = await Cart.create({ user_id: req.user.id });

      await CartItem.create({
        quantity,
        priceAtTimeOfAdding,
        product_id,
        seller_id,
        cart_id: newCart.id,
      });

      return res
        .status(201)
        .json({ message: "items added to cart successfully" });
    }

    const existingItem = await CartItem.findOne({
      where: { seller_id, product_id },
    });

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
      existingItem.priceAtTimeOfAdding = priceAtTimeOfAdding;
      await existingItem.save();
    } else {
      await CartItem.create({
        quantity,
        priceAtTimeOfAdding,
        product_id,
        seller_id,
        cart_id: cart.id,
      });
    }

    return res
      .status(201)
      .json({ message: "items added to cart successfully" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { product_id, seller_id } = req.body;

    await removeFromCartValidator.validate(req.body, { abortEarly: false });

    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: "not found cart" });
    }

    const productCart = await CartItem.findOne({
      where: { product_id, seller_id },
    });
    if (!productCart) {
      return res.status(404).json({ message: "not found product" });
    }

    if (productCart && productCart.quantity > 1) {
      productCart.quantity = productCart.quantity - 1;
      await productCart.save();
    } else if (productCart.quantity === 1) {
      await CartItem.destroy({ where: { product_id, seller_id } });
    }

    return res.status(200).json({ message: "item minus/remove successfully" });
  } catch (error) {
    next(error);
  }
};
