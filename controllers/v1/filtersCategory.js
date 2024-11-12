const { ExclusionConstraintError, where } = require("sequelize");
const { FiltersCategory, Category, SubCategory } = require("../../db");
const {
  createFilterCategoryValidator,
  editFilterCategoryValidator,
} = require("../../validators/category");

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      type,
      options,
      min,
      max,
      category_id,
      subCategory_id,
    } = req.body;

    await createFilterCategoryValidator.validate(req.body);

    const filter = await FiltersCategory.findOne({ where: { slug } });
    if (filter) {
      return res
        .status(400)
        .json({ message: "this filter with this slug exit already" });
    }

    let existCategoryParent = null;
    let existSubCategoryParent = null;

    if (category_id) {
      existCategoryParent = await Category.findOne({
        where: { id: category_id },
      });
    }

    if (subCategory_id) {
      existSubCategoryParent = await SubCategory.findOne({
        where: { id: subCategory_id },
      });
    }

    if (!existCategoryParent && !existSubCategoryParent) {
      return res.status(400).json({
        message: "at least one of category_id or subCategory_id is required",
      });
    }

    await FiltersCategory.create({
      name,
      slug,
      description,
      type,
      options,
      min,
      max,
      category_id,
      subCategory_id,
    });

    return res
      .status(201)
      .json({ message: "filters category created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.edit = async (req, res, next) => {
  try {
    const { filterId } = req.params;

    const {
      name,
      slug,
      description,
      type,
      options,
      min,
      max,
      category_id,
      subCategory_id,
    } = req.body;

    if (
      filterId === undefined ||
      filterId === null ||
      filterId === "" ||
      isNaN(filterId)
    ) {
      return res.status(422).json({ message: "filterId is not valid" });
    }

    await editFilterCategoryValidator.validate(req.body);

    const filter = await FiltersCategory.findOne({ where: { id: filterId } });
    if (!filter) {
      return res.status(404).json({ message: "not fount filter" });
    }

    if (category_id) {
      existCategoryParent = await Category.findOne({
        where: { id: category_id },
      });
    }

    if (subCategory_id) {
      existSubCategoryParent = await SubCategory.findOne({
        where: { id: subCategory_id },
      });
    }

    if (!existCategoryParent && !existSubCategoryParent) {
      return res.status(400).json({
        message: "at least one of category_id or subCategory_id is required",
      });
    }

    await FiltersCategory.update(
      {
        name,
        slug,
        description,
        type,
        options,
        min,
        max,
        category_id,
        subCategory_id,
      },
      { where: { id: filterId } }
    );

    return res.status(200).json({ message: "filter updated successfully" });
  } catch (error) {
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const { filterId } = req.params;
    if (
      filterId === undefined ||
      filterId === null ||
      filterId === "" ||
      isNaN(filterId)
    ) {
      return res.status(422).json({ message: "filterId is not valid" });
    }

    const filter = await FiltersCategory.findOne({ where: { id: filterId } });
    if (!filter) {
      return res.status(404).json({ message: "not fount filter" });
    }

    await FiltersCategory.destroy({ where: { id: filterId } });
    return res.status(200).json({ message: "filter removed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getOneCategoryFilters = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
