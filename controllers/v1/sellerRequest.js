const { SellerRequest, Product, Seller, SellersProduct } = require("../../db");
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
    const { reqId } = req.params;
    const { status, adminComment } = req.body;
    await updateSellerRequestValidator.validate(req.body, {
      abortEarly: false,
    });

    if (reqId === undefined || reqId === null || reqId === "" || isNaN(reqId)) {
      return res.status(422).json({ message: "reqId is not valid" });
    }

    const requestSeller = await SellerRequest.findOne({
      where: { id: reqId, status: "pendding" },
    });
    if (!requestSeller) {
      return res.status(404).json({ message: "not found request" });
    }

    await SellerRequest.update(
      { status, adminComment },
      { where: { id: reqId } }
    );

    if (status === "accepted") {
      const product = await Product.findOne({
        where: { id: requestSeller.product_id },
      });
      if (!product) {
        return res.status(404).json({ message: "not found product" });
      }

      const existProductSeller = await SellersProduct.findOne({
        where: {
          seller_id: requestSeller.seller_id,
          product_id: requestSeller.product_id,
        },
      });
      if (existProductSeller) {
        return res
          .status(400)
          .json({ message: "seller exist already for this product" });
      }

      await SellersProduct.create({
        price: requestSeller.price,
        stock: requestSeller.stock,
        seller_id: requestSeller.seller_id,
        product_id: requestSeller.product_id,
      });

      return res
        .status(201)
        .json({ message: "seller req accepted successfully" });
    } else if (status === "rejected") {
      return res.status(200).json({ message: "seller req rejected" });
    }
  } catch (error) {
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const { reqId } = req.params;

    const seller = req.user;

    const existSeller = await Seller.findOne({ where: { id: seller.id } });
    if (!existSeller) {
      return res.status(404).json({ message: "not found seller" });
    }

    if (reqId === undefined || reqId === null || reqId === "" || isNaN(reqId)) {
      return res.status(422).json({ message: "reqId is not valid" });
    }

    const existRequest = await SellerRequest.findOne({
      where: { id: reqId, status: "pendding" },
    });
    if (!existRequest) {
      return res.status(404).json({ message: "not found request" });
    }

    if (existRequest.seller_id.toString() !== seller.id.toString()) {
      return res.status(401).json({ message: "forbidden route" });
    }

    await SellerRequest.destroy({ where: { id: reqId } });
    return res.status(200).json({ message: "request deleted successfully" });
  } catch (error) {
    next(error);
  }
};
