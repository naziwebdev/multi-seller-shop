const { Seller } = require("../../db");
const {
  createSellerValidator,
  updateSellerValidator,
} = require("../../validators/seller");
const cities = require("../../cities/cities.json");

exports.create = async (req, res, next) => {
  try {
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
    const user = req.user;
    const { name, contactDetails, cityId } = req.body;

    await updateSellerValidator.validate({ name, contactDetails, cityId });

    const isValidCityId = cities.find((city) => +city.id === +cityId);
    if (!isValidCityId) {
      return res.status(409).json({ message: "cityId is not valid" });
    }

    const existSeller = await Seller.findOne({
      where: { user_id: user.id },
    });
    if (!existSeller) {
      return res.status(400).json({ message: "seller not found" });
    }

    await Seller.update(
      { name, contactDetails, cityId },
      { where: { id: existSeller.id } }
    );

    return res.status(200).json({ message: "seller updated successfully" });
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
    const user = req.user;
    const seller = await Seller.findOne({ where: { user_id: user.id } });
    if (!seller) {
      return res.status(404).json({ message: "not found seller" });
    }
    seller.contactDetails = JSON.parse(seller.contactDetails);
    return res.status(200).json(seller);
  } catch (error) {
    next(error);
  }
};
