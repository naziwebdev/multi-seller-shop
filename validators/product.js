const yup = require("yup");

const createProductValidator = yup.object().shape({
  name: yup
    .string()
    .min(3, "name must be min 3 chars")
    .max(255, "name must be max 255 char")
    .required("name is required"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 chars")
    .max(255, "slug must be max 255 char")
    .required("slug is required"),
  description: yup
    .string()
    .min(3, "description must be min 3 chars")
    .max(255, "description must be max 255 char")
    .required("description is required"),
  filtersValue: yup.object().required("filtersValue is required"),
  customFilters: yup.object().required("customFilters is required"),
  subCategory_id: yup
    .number()
    .integer()
    .positive()
    .required("subCategory is required"),
});

const editProductValidator = yup.object().shape({
  name: yup
    .string()
    .min(3, "name must be min 3 chars")
    .max(255, "name must be max 255 char"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 chars")
    .max(255, "slug must be max 255 char"),
  description: yup
    .string()
    .min(3, "description must be min 3 chars")
    .max(255, "description must be max 255 char"),
  filtersValue: yup
    .object()
    .test(
      "filterValuesCheck",
      "filterValues must be an object with key-value pairs",
      (value) => value === undefined || typeof value === "object"
    ),
  customFilters: yup
    .object()
    .test(
      "customFieldsCheck",
      "customFields must be an object with key-value pairs",
      (value) => value === undefined || typeof value === "object"
    ),
  subCategory_id: yup.number().integer().positive(),
});

module.exports = { createProductValidator, editProductValidator };
