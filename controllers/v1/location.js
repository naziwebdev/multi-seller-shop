const cities = require("../../cities/cities.json");
const provinces = require("../../cities/provinces.json");

exports.getAll = async (req, res, next) => {
  try {
    return res.status(200).json({cities,provinces });
  } catch (error) {
    next(error);
  }
};
