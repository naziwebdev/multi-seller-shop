const { User, Ban } = require("../../db");

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(userId);

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
