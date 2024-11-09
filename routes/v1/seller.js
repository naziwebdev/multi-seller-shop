const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/seller");

const router = express.Router();

router
  .route("/")
  .get(auth, roleGuard("seller"), controllers.get)
  .post(auth, roleGuard("seller"), controllers.create)
  .patch(auth, roleGuard("seller"), controllers.update)
  .delete(auth, roleGuard("seller"), controllers.remove);

module.exports = router;
