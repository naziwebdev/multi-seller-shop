const redis = require("../redis");
const bcrypt = require("bcrypt");

const getOtpRedisPattern = (phone) => {
  return `otp:${phone}`;
};

const getOtpDetails = async (phone) => {
  try {
    const otp = await redis.get(getOtpRedisPattern(phone));
    if (!otp) {
      return {
        expired: true,
        remainingTime: 0,
      };
    }

    const remainingTime = await redis.ttl(getOtpRedisPattern(phone));
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    return {
      expired: false,
      remainingTime: formattedTime,
    };
  } catch (error) {
    throw error;
  }
};

const generateOtp = async (phone, length = 4, expireTime = 1) => {
  const digits = "0123456789";

  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.random() * digits.length];
  }

  const hashedOpt = await bcrypt.hash(otp, 12);

  await redis.set(getOtpRedisPattern(phone), hashedOpt, "EX", expireTime * 60);

  return otp;
};

module.exports = { getOtpRedisPattern, getOtpDetails, generateOtp };
