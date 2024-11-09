const { Seller } = require("../../db");
const {
  createSellerValidator,
  updateSellerValidator,
} = require("../../validators/seller");
const cities = require("../../cities/cities.json");

exports.create = async (req, res, next) => {
  try {
    console.log('ok')
    const user = req.user;
    const { name, contactDetails, cityId } = req.body;

    await createSellerValidator.validate({ name, contactDetails, cityId });

    const isValidCityId = cities.find((city) => +city.id === +cityId);
    if (!isValidCityId) {
      return res.status(409).json({ message: "cityId is not valid" });
    }

    const existSeller = await Seller.findOne({ where: { user_id: user.id } });
    if (existSeller) {
      return res.status(400).json({ message: "seller exist already" });
    }

    await Seller.create({ name, contactDetails, cityId, user_id: user.id });

    return res.status(201).json({ message: "seller created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
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
exports.get = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
