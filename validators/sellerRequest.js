const yup = require("yup");

const createSellerRequestValidator = yup.object().shape({
  price: yup.number().required("price is required"),
  stock: yup.number().required("stock is required"),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required("product_id is required"),
});

const updateSellerRequestValidator = yup.object().shape({
  adminComment: yup.string().optional(),
  status: yup
    .string()
    .oneOf(["accepted", "rejected"])
    .required("status is required"),
});

module.exports = { createSellerRequestValidator, updateSellerRequestValidator };
