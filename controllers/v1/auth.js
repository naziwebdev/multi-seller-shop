const { User } = require("../../db");
const configs = require("../../configs");
const jwt = require("jsonwebtoken");
const {generateOtp,getOtpDetails,getOtpRedisPattern} = require('../../helpers/otpRedis')

exports.send = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
