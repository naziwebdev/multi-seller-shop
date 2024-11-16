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
    }else{
      return res.status(400).json({message:'images is required'})
    }

    const existSubCategory = await SubCategory.findOne({
      where: { id: subCategory_id },
    });
    if (!existSubCategory) {
      return res.status(404).json({ message: "not found sub_category_id" });
    }

    const shortIdentifier = uuidv4()
      .replace(/[^a-z]/g, "")
      .substring(0, 6)
      .toUpperCase();

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
    const { productId } = req.params;
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
    if (filtersValue) filtersValue = JSON.parse(filtersValue);
    if (customFilters) customFilters = JSON.parse(customFilters);

    await editProductValidator.validate(
      { name, slug, description, filtersValue, customFilters, subCategory_id },
      { abortEarly: false }
    );

    if (
      productId === undefined ||
      productId === null ||
      productId === "" ||
      isNaN(productId)
    ) {
      return res.status.status(422).json({ message: "productId is not valid" });
    }

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status.status(404).json({ message: "product not found" });
    }

    let images = [];

    if (req.files) {
      const imagesFiles = req.files;
      for (let i = 0; i < imagesFiles.length; i++) {
        const file = req.files[i];
        const pathFile = `images/products/${file.filename}`;
        images.push(pathFile);
      }
    }else{
      return res.status(400).json({message:'images is required'})
    }


    if (subCategory_id) {
      const existSubCategory = await SubCategory.findOne({
        where: { id: subCategory_id },
      });
      if (!existSubCategory) {
        return res.status(404).json({ message: "not found sub_category_id" });
      }
    }

    await Product.update(
      {
        name,
        slug,
        description,
        filtersValue,
        customFilters,
        subCategory_id,
        images
      },
      { where: { id: productId } }
    );

    return res.status(200).json({ messge: "product updated successfully" });
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
