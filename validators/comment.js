const yup = require("yup");

const createCommentValidator = yup.object().shape({
  content: yup
    .string()
    .min(3, "content must be min 3 char")
    .required("content is required"),
  rating: yup
    .number()
    .positive()
    .required("rate is required")
    .min(1, "min rate is 1")
    .max(5, "max rate is 5"),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required("product_id is required"),
});

const editCommentValidator = yup.object().shape({
  content: yup.string().min(3, "content must be min 3 char"),
  rating: yup
    .number()
    .positive()
    .min(1, "min rate is 1")
    .max(5, "max rate is 5"),
});

const createReplyValidator = yup.object().shape({
  content: yup
    .string()
    .min(3, "content must be min 3 char")
    .required("content is required"),
  parentReply_id: yup.number().integer().positive(),
});

const editReplyValidator = yup.object().shape({
  content: yup.string().min(3, "content must be min 3 char"),
  parentReply_id: yup.number().integer().positive(),
});

module.exports = {
  createCommentValidator,
  editCommentValidator,
  createReplyValidator,
  editReplyValidator,
};
