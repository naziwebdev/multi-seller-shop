const { Comment, Reply, Product } = require("../../db");
const {
  createCommentValidator,
  editCommentValidator,
} = require("../../validators/comment");

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
    const { commentId } = req.params;
    const { content, rating } = req.body;

    if (
      commentId === undefined ||
      commentId === null ||
      commentId === "" ||
      isNaN(commentId)
    ) {
      return res.status(422).json({ message: "commentId is not valid" });
    }

    await editCommentValidator.validate(req.body, { abortEarly: false });

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "not found comment" });
    }

    if (comment.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "you dont access to this route" });
    }

    await Comment.update({ content, rating }, { where: { id: commentId } });
    return res.status(200).json({ message: "comment updated successfully" });
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
