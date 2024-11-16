const { v4: uuidv4 } = require("uuid");
const { Product, SellersProduct, SubCategory } = require("../../db");
const {
  createProductValidator,
  editProductValidator,
} = require("../../validators/product");

exports.create = async (req, res, next) => {
  try {
    let {
      name,
      slug,
      description,
      filtersValue,
      customFilters,
      subCategory_id,
    } = req.body;

    // get json from form-data => need to parse
    //if get from json normal format dont nedd to parse
    filtersValue = JSON.parse(filtersValue);
    customFilters = JSON.parse(customFilters);

    await createProductValidator.validate(
      { name, slug, description, filtersValue, customFilters, subCategory_id },
      { abortEarly: false }
    );

    let images = [];

    if (req.files) {
      const imagesFiles = req.files;
      for (let i = 0; i < imagesFiles.length; i++) {
        const file = req.files[i];
        const pathFile = `images/products/${file.filename}`;
        images.push(pathFile);
      }
    }

    const existSubCategory = await SubCategory.findOne({
      where: { id: subCategory_id },
    });
    if (!existSubCategory) {
      return res.status(404).json({ message: "not found sub_category_id" });
    }

    const shortIdentifier = uuidv4()
      .replace(/[^a-z]/g, "")
      .substring(0, 6).toUpperCase()

     

    await Product.create({
      name,
      slug,
      description,
      filtersValue,
      customFilters,
      subCategory_id,
      images,
      shortIdentifier,
    });

    return res.status(201).json({ message: "product created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.edit = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.getOne = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
