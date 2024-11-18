const { Product } = require("../../db");

exports.redirectToProduct = async (req, res, next) => {
  try {
    const { shortIdentifier } = req.params;

    const product = await Product.findOne({ where: { shortIdentifier } });
    if (!product) {
      return res.status(404).json({ message: "not found product" });
    }

    return res.redirect(`/api/v1/products/${product.id}`);
  } catch (error) {
    next(error);
  }
};
