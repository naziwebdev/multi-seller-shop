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

module.exports = {
  createCategoryValidator,
  editCategoryValidator,
  createSubCategoryValidator,
  editSubCategoryValidator,
};
