const { SubCategory, Category ,FiltersCategory} = require("../../db");
const {
  createSubCategoryValidator,
  editSubCategoryValidator,
} = require("../../validators/category");

exports.getAll = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.findAll({});

    return res.status(200).json(subCategories);
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;

    if (
      subCategoryId === undefined ||
      subCategoryId === null ||
      subCategoryId === "" ||
      isNaN(subCategoryId)
    ) {
      return res.status(422).json({ message: "subCategoryId is not valid" });
    }

    const subCategory = await SubCategory.findOne({
      where: { id: subCategoryId },
    });
    if (!subCategory) {
      return res.status(404).json({ message: "not found subCategory" });
    }

    return res.status(200).json(subCategory);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, slug, description, parent_id } = req.body;

    await createSubCategoryValidator.validate(req.body);

    const parentCheck = await Category.findOne({ where: { id: parent_id } });
    if (!parentCheck) {
      return res.status(404).json({ message: "parent_id is not valid" });
    }

    await SubCategory.create({
      title,
      slug,
      description,
      parent_id,
    });

    return res
      .status(201)
      .json({ message: "SubCategory created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const { title, slug, description, parent_id } = req.body;

    if (
      subCategoryId === undefined ||
      subCategoryId === null ||
      subCategoryId === "" ||
      isNaN(subCategoryId)
    ) {
      return res.status(422).json({ message: "subCategoryId is not valid" });
    }

    await editSubCategoryValidator.validate(req.body);
    const parentCheck = await Category.findOne({ where: { id: parent_id } });
    if (!parentCheck) {
      return res.status(404).json({ message: "parent_id is not valid" });
    }

    const subCategory = await SubCategory.findOne({
      where: { id: subCategoryId },
    });
    if (!subCategory) {
      return res.status(404).json({ message: "not found subCategory" });
    }

    await SubCategory.update(
      { title, slug, description, parent_id },
      { where: { id: subCategoryId } }
    );

    return res
      .status(200)
      .json({ message: "subCategory updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    if (
      subCategoryId === undefined ||
      subCategoryId === null ||
      subCategoryId === "" ||
      isNaN(subCategoryId)
    ) {
      return res.status(422).json({ message: "subCategoryId is not valid" });
    }

    const subCategory = await SubCategory.findOne({
      where: { id: subCategoryId },
    });
    if (!subCategory) {
      return res.status(404).json({ message: "not found subCategory" });
    }

    await SubCategory.destroy({ where: { id: subCategoryId } });

    return res
      .status(200)
      .json({ message: "subCategory removed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getOneSubCategoryFilters = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;

    if (
      subCategoryId === undefined ||
      subCategoryId === null ||
      subCategoryId === "" ||
      isNaN(subCategoryId)
    ) {
      return res.status(422).json({ message: "subCategoryId is not valid" });
    }

    const subCategory = await SubCategory.findOne({ where: { id:subCategoryId } });
    if (!subCategory) {
      return res.status(404).json({ message: "not found subCategory" });
    }

    const filters = await FiltersCategory.findAll({
      where: { subCategory_id: subCategoryId },
      include: [{ model: SubCategory, as: "subCategory" }],
    });

    //as in include must be same as that is in associate 
    
    if (!filters) {
      return res
        .status(404)
        .json({ message: "not found filters for this subCategory" });
    }

    filters.forEach((filter) => {
      if (filter.options) {
        filter.options = JSON.parse(filter.options);
      }
    });

    return res.status(200).json(filters);
  } catch (error) {
    next(error);
  }
};
