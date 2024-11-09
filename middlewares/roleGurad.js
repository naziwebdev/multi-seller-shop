module.exports = (role) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const roles = JSON.parse(user.role);

      if (!roles.includes(role)) {
        return res.status(401).json({ message: "forbidden route" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
