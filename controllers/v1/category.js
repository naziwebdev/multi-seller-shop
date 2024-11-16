const { Category, FiltersCategory, SubCategory } = require("../../db");
const {
  createCategoryValidator,
  editCategoryValidator,
} = require("../../validators/category");

exports.create = async (req, res, next) => {
  try {
    const { title, slug, description, parent_id } = req.body;

    await createCategoryValidator.validate(req.body, { abortEarly: false });

    let icon = null;
    if (!req.file.filename) {
      return res.status(400).json({ message: "icon is required" });
    }

    icon = {
      filename: req.file.filename,
      pathname: `icons/category/${req.file.filename}`,
    };

    await Category.create({
      title,
      slug,
      description,
      icon,
      parent_id,
    });

    return res.status(201).json({ message: "category created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title, slug, description, parent_id } = req.body;

    if (
      categoryId === undefined ||
      categoryId === null ||
      categoryId === "" ||
      isNaN(categoryId)
    ) {
      return res.status(422).json({ message: "categoryId is not valid" });
    }

    await editCategoryValidator.validate(req.body, { abortEarly: false });

    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ message: "not found category" });
    }

    let icon = null;

    icon = {
      filename: req.file.filename,
      pathname: `icons/category/${req.file.filename}`,
    };

    await Category.update(
      { title, slug, description, icon, parent_id },
      { where: { id: categoryId } }
    );

    return res.status(200).json({ message: "category updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (
      categoryId === undefined ||
      categoryId === null ||
      categoryId === "" ||
      isNaN(categoryId)
    ) {
      return res.status(422).json({ message: "categoryId is not valid" });
    }

    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ message: "not found category" });
    }

    await Category.destroy({ where: { id: categoryId } });

    return res.status(200).json({ message: "category removed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getOneCategoryFilters = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (
      categoryId === undefined ||
      categoryId === null ||
      categoryId === "" ||
      isNaN(categoryId)
    ) {
      return res.status(422).json({ message: "categoryId is not valid" });
    }

    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ message: "not found category" });
    }

    const filters = await FiltersCategory.findAll({
      where: { category_id: categoryId },
      include: [{ model: Category, as: "category" }],
    });
    if (!filters) {
      return res
        .status(404)
        .json({ message: "not found filters for this category" });
    }

    filters.forEach((filter) => {
      if (filter.options) {
        filter.options = JSON.parse(filter.options);
      }

      filter.category.icon = JSON.parse(filter.category.icon);
    });

    return res.status(200).json(filters);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    //point : as is the model name in tableName
    const fetchSubcategoriesRecursively = async (parentId = null) => {

      const subCategories = await SubCategory.findAll({
        include: [
          {
            model: FiltersCategory,
            as: "FiltersCategories",
            
          },
        ],
        where: { parent_id: parentId },
      });

      const parentSubCategories = await Category.findAll({
        include: [
          {
            model: FiltersCategory,
            as: "FiltersCategories",
            
          },
        ],
        where: { parent_id: parentId },
      });

  

      let fetchedParentSubCategories = [];

      for (const category of parentSubCategories) {
         let categoryJSON = category.toJSON()
        categoryJSON.subCategories = await fetchSubcategoriesRecursively(category.id)
        fetchedParentSubCategories.push(categoryJSON);
        
      }

    const subCategoriesJSON = subCategories.map(subCategory => subCategory.toJSON())
      return [...fetchedParentSubCategories,...subCategoriesJSON];
    } 

      
    const categories = await fetchSubcategoriesRecursively(null);

    return res.status(200).json(categories);

     
    }catch (error) {
    next(error);
  }
};

