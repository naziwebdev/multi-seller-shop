const { User, Ban, Address } = require("../../db");
const {
  createAddressValidator,
  updateAddressValidator,
} = require("../../validators/address");

const citis = require("../../cities/cities.json");

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (
      userId === undefined ||
      userId === null ||
      userId === "" ||
      isNaN(userId)
    ) {
      return res.status(422).json({ message: "userId is not valid" });
    }

    const user = await User.findOne({ where: { id: userId }, raw: true });
    const userRole = JSON.parse(user.role);
    if (!user) {
      return res.status(404).json({ message: "not found user" });
    }

    if (userRole.includes("admin")) {
      return res.status(403).json({ message: "you can not ban a admin" });
    }

    await Ban.create({ phone: user.phone });

    return res.status(200).json({ message: "user baned successfully" });
  } catch (error) {
    next(error);
  }
};

exports.createAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, postalCode, address, location, cityId } = req.body;

    await createAddressValidator.validate({
      name,
      postalCode,
      address,
      location,
      cityId,
    });

    const isValidCityId = citis.find((city) => +city.id === +cityId);
    if (!isValidCityId) {
      return res.status(409).json({ message: "cityId is not valid" });
    }

    await Address.create({
      name,
      postalCode,
      address,
      location,
      cityId,
      user_id: user.id,
    });

    return res.status(201).json({ message: "address created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, postalCode, address, location, cityId } = req.body;
    const { addressId } = req.params;

    if (
      addressId === undefined ||
      addressId === null ||
      addressId === "" ||
      isNaN(addressId)
    ) {
      return res.status(422).json({ message: "addressId is not valid" });
    }

    await updateAddressValidator.validate({
      name,
      postalCode,
      address,
      location,
      cityId,
    });

    const isValidCityId = citis.find((city) => +city.id === +cityId);
    if (!isValidCityId) {
      return res.status(409).json({ message: "cityId is not valid" });
    }

    const addressRaw = await Address.findOne({
      where: { id: +addressId },
      raw: false,
    });

    if (!addressRaw) {
      return res.status(404).json({ message: "not  fount address" });
    }

    addressRaw.name = name || addressRaw.name;
    addressRaw.postalCode = postalCode || addressRaw.postalCode;
    addressRaw.address = address || addressRaw.address;
    addressRaw.location = location || addressRaw.location;
    addressRaw.cityId = cityId || addressRaw.cityId;

    await addressRaw.save();

    return res.status(200).json({ message: "address updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.removeAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    if (
      addressId === undefined ||
      addressId === null ||
      addressId === "" ||
      isNaN(addressId)
    ) {
      return res.status(422).json({ message: "addressId is not valid" });
    }

    const address = await Address.findOne({ where: { id: +addressId } });
    if (!address) {
      return res.status(404).json({ message: "not found address" });
    }

    await Address.destroy({ where: { id: +addressId } });

    return res.status(200).json({ message: "address remove successfully" });
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
