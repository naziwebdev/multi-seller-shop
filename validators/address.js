const yup = require("yup");

const createAddressValidator = yup.object({
  name: yup.string().min(3).max(255).required("address is required"),
  postalCode: yup
    .string()
    .length(10, "postalCode must be 10 char")
    .required("postalCode is required"),
  address: yup.string().required("address is required").min(10).max(1000),
  location: yup.object().shape({
    lat: yup.number().min(-90).max(90).required("lat is required"),
    lng: yup.number().min(-180).max(180).required("lng is required"),
  }),
  cityId: yup.number().required("cityId is required").positive().integer(),
});

const updateAddressValidator = yup.object({
  name: yup.string().min(3).max(255),
  postalCode: yup.string().length(10, "postalCode must be 10 char"),
  address: yup.string().min(10).max(1000),
  location: yup.object().shape({
    lat: yup.number().min(-90).max(90),
    lng: yup.number().min(-180).max(180),
  }),
  cityId: yup.number().positive().integer(),
});

module.exports = { createAddressValidator, updateAddressValidator };
