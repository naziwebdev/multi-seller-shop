const { Cart, CartItem, Product, Seller, SellersProduct } = require("../../db");
const {
  addToCartValidator,
  removeFromCartValidator,
} = require("../../validators/cart");

exports.getAll = async (req, res, next) => {
  try {
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
      await existingItem.save()
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
  } catch (error) {
    next(error);
  }
};
