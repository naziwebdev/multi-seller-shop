const yup = require("yup");

const addToCartValidator = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required("product_id is required"),
  seller_id: yup
    .number()
    .integer()
    .positive()
    .required("seller_id is required"),
  quantity: yup.number().positive().integer().required("quantity is required"),
});

const removeFromCartValidator = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required("product_id is required"),
  seller_id: yup
    .number()
    .integer()
    .positive()
    .required("seller_id is required"),
});

module.exports = { addToCartValidator, removeFromCartValidator };
