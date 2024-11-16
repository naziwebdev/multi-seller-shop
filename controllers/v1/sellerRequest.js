const { SellerRequest, Product, Seller } = require("../../db");
const {
  createSellerRequestValidator,
  updateSellerRequestValidator,
} = require("../../validators/sellerRequest");

exports.create = async (req, res, next) => {
  try {
    const seller = req.user;
    const { price, stock, product_id } = req.body;

    await createSellerRequestValidator.validate(req.body, {
      abortEarly: false,
    });

    const product = await Product.findOne({ where: { id: product_id } });
    if (!product) {
      return res.status(404).json({ message: "not found product" });
    }

    const existSeller = await Seller.findOne({ where: { id: seller.id } });
    if (!existSeller) {
      return res.status(404).json({ message: "not found seller" });
    }

    const existRequest = await SellerRequest.findOne({
      where: { product_id, seller_id: seller.id },
    });

    if (existRequest) {
      return res.status(400).json({ message: "your request already exist" });
    }

    const result = await SellerRequest.create({
      price,
      stock,
      product_id,
      seller_id: seller.id,
      status: "pendding",
    });

    return res.status(201).json({ message: "request created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.getAllSellerRequests = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.edit = async (req, res, next) => {
  try {
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
