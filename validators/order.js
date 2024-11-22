const yup = require("yup");

const updateOrderValidator = yup.object({
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["processing", "shipped", "delivered"]),
  postTrackingCode: yup.string(),
});

module.exports = {
  updateOrderValidator,
};
