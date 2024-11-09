const jwt = require("jsonwebtoken");
const configs = require("../configs");
const { User } = require("../db");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(403).json({ message: "unAuthorize" });
    }

    const decodedToken = jwt.verify(token, configs.auth.accessTokenSecretKey);

    if (!decodedToken) {
      return res.status(403).json({ message: "unAuthorize" });
    }

    const user = await User.findOne({ where: { id: decodedToken.userId } });

    if (!user) {
      return res.status(403).json({ message: "unAuthorize" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
