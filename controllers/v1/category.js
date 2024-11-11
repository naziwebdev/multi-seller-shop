const { Category, SubCategory, FiltersCategory } = require("../../db");
const { createCategoryValidator } = require("../../validators/category");

exports.create = async (req, res, next) => {
  try {
    const { title, slug, description, parent_id } = req.body;

    await createCategoryValidator.validate(req.body);

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
