const yup = require("yup");

const createSellerValidator = yup.object({
  name: yup.string().min(3).max(255).required("name is required"),
  contactDetails: yup.object().shape({
    phone: yup
      .string()
      .required("Phone is required")
      .trim()
      .length(11)
      .matches(/^09\d{9}$/),
  }),

  cityId: yup.number().required("City is required").positive().integer(),
});

const updateSellerValidator = yup.object({
  name: yup.string().min(3).max(255),
  contactDetails: yup.object().shape({
    phone: yup
      .string()
      .trim()
      .length(11)
      .matches(/^09\d{9}$/),
  }),

  cityId: yup.number().positive().integer(),
});

module.exports = { createSellerValidator, updateSellerValidator };
