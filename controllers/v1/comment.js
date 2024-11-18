const { Comment, Reply, Product, User } = require("../../db");
const {
  createCommentValidator,
  editCommentValidator,
  createReplyValidator,
  editReplyValidator,
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
    const { productId } = req.query;

    const comments = await Comment.findAll({
      include: [
        {
          model: Reply,
          as: "Replies",
        },
        {
          model: User,
          as: "user",
        },
      ],

      where: { product_id: productId },
    });

    const processReplies = (replies) => {
      const replyMap = new Map(
        replies.map((reply) => [reply.id, reply.dataValues])
      );
      const topLevelReplies = [];
      replies.forEach((reply) => {
        const replyData = reply.dataValues;
        if (replyData.parentReply_id === null) {
          topLevelReplies.push(replyData);
        } else {
          const parentReply = replyMap.get(replyData.parentReply_id);
          if (parentReply) {
            if (!parentReply.replies) {
              parentReply.replies = [];
            }
            parentReply.replies.push(replyData);
          }
        }
      });
      return topLevelReplies;
    };
    const processedComments = comments.map((comment) => {
      const commentData = comment.toJSON();
      commentData.Replies = processReplies(comment.Replies);
      return commentData;
    });
    return res.status(200).json(processedComments);
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
    const { commentId } = req.params;

    if (
      commentId === undefined ||
      commentId === null ||
      commentId === "" ||
      isNaN(commentId)
    ) {
      return res.status(422).json({ message: "commentId is not valid" });
    }

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "not found comment" });
    }

    await Comment.destroy({ where: { id: commentId } });

    return res.status(200).json({ message: "comment removed successfully" });
  } catch (error) {
    next(error);
  }
};
exports.addReply = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content, parentReply_id } = req.body;

    if (
      commentId === undefined ||
      commentId === null ||
      commentId === "" ||
      isNaN(commentId)
    ) {
      return res.status(422).json({ message: "commentId is not valid" });
    }

    await createReplyValidator.validate(req.body, { abortEarly: false });

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "not found comment" });
    }
    if (parentReply_id) {
      const reply = await Reply.findOne({ where: { id: parentReply_id } });
      if (!reply) {
        return res.status(404).json({ message: "not found reply" });
      }
    }

    await Reply.create({
      content,
      comment_id: commentId,
      user_id: req.user.id,
      parentReply_id,
    });

    return res
      .status(201)
      .json({ message: "reply comment created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.editReply = async (req, res, next) => {
  try {
    const { commentId, replyId } = req.params;
    const { content } = req.body;

    if (
      commentId === undefined ||
      commentId === null ||
      commentId === "" ||
      isNaN(commentId)
    ) {
      return res.status(422).json({ message: "commentId is not valid" });
    }
    if (
      replyId === undefined ||
      replyId === null ||
      replyId === "" ||
      isNaN(replyId)
    ) {
      return res.status(422).json({ message: "replyId is not valid" });
    }

    await editReplyValidator.validate(req.body, { abortEarly: false });

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "not found comment" });
    }

    const reply = await Reply.findOne({ where: { id: replyId } });
    if (!reply) {
      return res.status(404).json({ message: "not found reply" });
    }

    await Reply.update({ content }, { where: { id: replyId } });

    return res.status(200).json({ message: "reply updated successfully" });
  } catch (error) {
    next(error);
  }
};
exports.removeReply = async (req, res, next) => {
  try {
    const { commentId, replyId } = req.params;

    if (
      commentId === undefined ||
      commentId === null ||
      commentId === "" ||
      isNaN(commentId)
    ) {
      return res.status(422).json({ message: "commentId is not valid" });
    }
    if (
      replyId === undefined ||
      replyId === null ||
      replyId === "" ||
      isNaN(replyId)
    ) {
      return res.status(422).json({ message: "replyId is not valid" });
    }

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "not found comment" });
    }

    const reply = await Reply.findOne({ where: { id: replyId } });
    if (!reply) {
      return res.status(404).json({ message: "not found reply" });
    }

    await Reply.destroy({ where: { id: replyId } });
    return res.status(200).json({ message: "reply removed successfullly" });
  } catch (error) {
    next(error);
  }
};
