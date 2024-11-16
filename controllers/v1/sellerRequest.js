const { SellerRequest, Product, Seller } = require("../../db");
const {
  createSellerRequestValidator,
  updateSellerRequestValidator,
} = require("../../validators/sellerRequest");
const { createPaginationData } = require("../../utils/paginationData");

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

    await SellerRequest.create({
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
    const seller = req.user;
    const { limit = 4, page = 1 } = req.query;

    const existSeller = await Seller.findOne({ where: { id: seller.id } });
    if (!existSeller) {
      return res.status(404).json({ message: "not found seller" });
    }

    const offset = (page - 1) * limit;
    const sellerRequests = await SellerRequest.findAll({
      offset: +offset,
      limit: +limit,
      where: { seller_id: seller.id },
      order: [["created_at", "DESC"]],
    });

    const totalRequests = await SellerRequest.count();

    return res.status(200).json({
      sellerRequests,
      pagination: createPaginationData(
        page,
        limit,
        totalRequests,
        "SellerRequests"
      ),
    });
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
