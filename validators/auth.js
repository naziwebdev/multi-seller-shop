const yup = require("yup");

const sendOtpValidator = yup.object({
  phone: yup
    .string()
    .required("phone is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    ),
});

const verifyOtpValidator = yup.object({
  phone: yup
    .string()
    .required("phone is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    ),
  otp: yup
    .string()
    .required("otp is required")
    .matches(/^[0-9]{4}$/, "Otp code is not valid"),
  isSeller: yup.boolean().required("seller is required"),
});

module.exports = { sendOtpValidator, verifyOtpValidator };
