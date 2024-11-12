const yup = require("yup");

//category
const createCategoryValidator = yup.object({
  title: yup
    .string()
    .min(3, "name must be min 3 char")
    .max(255, "name must be max 255")
    .required("name is required"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 char")
    .max(255, "slug must be max 255")
    .required("slug is required"),
  description: yup.string().optional(),
  parent_id: yup.number().integer().positive().optional(),
});

const editCategoryValidator = yup.object({
  title: yup
    .string()
    .min(3, "name must be min 3 char")
    .max(255, "name must be max 255"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 char")
    .max(255, "slug must be max 255"),
  description: yup.string().optional(),
  parent_id: yup.number().integer().positive().optional(),
});

//subCategory

const createSubCategoryValidator = yup.object({
  title: yup
    .string()
    .min(3, "name must be min 3 char")
    .max(255, "name must be max 255")
    .required("name is required"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 char")
    .max(255, "slug must be max 255")
    .required("slug is required"),
  description: yup.string().optional(),
  parent_id: yup
    .number()
    .integer()
    .positive()
    .required("parent_id is required"),
});

const editSubCategoryValidator = yup.object({
  title: yup
    .string()
    .min(3, "name must be min 3 char")
    .max(255, "name must be max 255"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 char")
    .max(255, "slug must be max 255"),
  description: yup.string().optional(),
  parent_id: yup.number().integer().positive(),
});

// filters category

const types = ["radio", "selectbox"];
const createFilterCategoryValidator = yup
  .object({
    name: yup
      .string()
      .min(3, "name must be min 3 char")
      .max(255, "name must be max 255")
      .required("name is required"),
    slug: yup
      .string()
      .min(3, "slug must be min 3 char")
      .max(255, "slug must be max 255")
      .required("slug is required"),
    description: yup.string().optional(),
    type: yup
      .string()
      .oneOf(types, "type must be radio or selectbox")
      .required("type is required"),
    options: yup.array().when("type", {
      is: (typeName) => ["radio", "selectbox"].includes(typeName),
      then: () =>
        yup
          .array()
          .required("selectbox and radio fields need an options array")
          .min(1, "selectbox and radio fields need at least one option")
          .of(yup.string()),
    }),
    min: yup.number().when("type", {
      is: "number",
      then: () =>
        yup.number().required("Number field requires a minimum value"),
    }),
    max: yup.number().when("type", {
      is: "number",
      then: () =>
        yup.number().required("Number field requires a maximum value"),
    }),
    category_id: yup.number().integer().positive().nullable(),
    subCategory_id: yup.number().integer().positive().nullable(),
  })
  .test(
    "at-least-one",
    "Either category_id or subCategory_id must be provided",
    function (value) {
      return value.category_id !== null || value.subCategory_id !== null;
    }
  );

const editFilterCategoryValidator = yup.object({
  name: yup
    .string()
    .min(3, "name must be min 3 char")
    .max(255, "name must be max 255"),
  slug: yup
    .string()
    .min(3, "slug must be min 3 char")
    .max(255, "slug must be max 255"),
  description: yup.string().optional(),
  type: yup.string().oneOf(types, "type must be radio or selectbox"),
  options: yup.array().when("type", {
    is: (typeName) => ["radio", "selectbox"].includes(typeName),
    then: () =>
      yup
        .array()
        .required("selectbox and radio fields need an options array")
        .min(1, "selectbox and radio fields need at least one option")
        .of(yup.string()),
  }),
  min: yup.number(),
  max: yup.number(),
  category_id: yup.number().integer().positive().nullable(),
  subCategory_id: yup.number().integer().positive().nullable(),
});

module.exports = {
  createCategoryValidator,
  editCategoryValidator,
  createSubCategoryValidator,
  editSubCategoryValidator,
  createFilterCategoryValidator,
  editFilterCategoryValidator,
};
