const { User, Ban } = require("../../db");
const configs = require("../../configs");
const jwt = require("jsonwebtoken");
const bcypt = require("bcrypt");
const redis = require("../../redis");
const {
  generateOtp,
  getOtpDetails,
  getOtpRedisPattern,
} = require("../../helpers/otpRedis");
const {
  sendOtpValidator,
  verifyOtpValidator,
} = require("../../validators/auth");

const { sendSms } = require("../../services/otp");

exports.send = async (req, res, next) => {
  try {
    const { phone } = req.body;

    await sendOtpValidator.validate({ phone }, { abortEarly: false });

    const isBanned = await Ban.findOne({ where: { phone } });

    if (isBanned) {
      return res.status(403).json({ message: "this phone is banned" });
    }

    const { expired, remainingTime } = await getOtpDetails(phone);
    if (!expired) {
      return res
        .status(200)
        .json({ message: `otp sent already try again after ${remainingTime}` });
    }

    const otp = await generateOtp(phone);

    // await sendSms(phone,otp);

    return res
      .status(200)
      .json({ message: "otp sent to your phone successfully", otp });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { phone, otp, isSeller } = req.body;

    await verifyOtpValidator.validate(
      { phone, otp, isSeller },
      { abortEarly: false }
    );

    const userOtp = await redis.get(getOtpRedisPattern(phone));
    if (!userOtp) {
      return res.status(400).json({ message: "not found otp" });
    }

    const isValidOtp = await bcypt.compare(otp, userOtp);
    if (!isValidOtp) {
      return res.status(400).json({ message: "otp is invalid" });
    }

    const existUser = await User.findOne({ where: { phone } });

    if (existUser) {
      const token = jwt.sign(
        { userId: existUser.id },
        configs.auth.accessTokenSecretKey,
        {
          expiresIn: configs.auth.accessTokenExpireIn,
        }
      );

      res.cookie("access-token", token, {
        maxAge: +configs.auth.accessTokenExpireIn,
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(200).json({ message: "user login successfully" });
    }

    const isFirstUser = (await User.count()) === 0;

    const user = await User.create(
      {
        phone,
        username: phone,
        role: isFirstUser
          ? isSeller
            ? ["admin", "seller"]
            : ["admin"]
          : isSeller
          ? ["user", "seller"]
          : ["user"],
      },
      { raw: true }
    );

    const token = jwt.sign(
      { userId: user.id },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    res.cookie("access-token", token, {
      maxAge: +configs.auth.accessTokenExpireIn,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(201).json({ message: "user register successfully" });
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
