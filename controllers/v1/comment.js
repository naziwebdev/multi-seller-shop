const { Comment, Reply, Product } = require("../../db");
const { createCommentValidator } = require("../../validators/comment");

exports.createComment = async (req, res, next) => {
  try {
    const { content, rating, product_id } = req.body;
    const user = req.user;
    await createCommentValidator.validate(req.body, { abortEarly: false });

    const product = await Product.findOne({ where: { id: product_id } });
    if (!product) {
      return res.status(404).json({ message: "not found product" });
    }

    await Comment.create({ content, rating, product_id, user_id: user.id });
    return res.status(201).json({ message: "comment created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.getComments = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.editComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.removeComment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.addReply = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.editReply = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.removeReply = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
