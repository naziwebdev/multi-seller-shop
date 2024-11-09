const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controller = require("../../controllers/v1/user");

const router = express.Router();

router.route("/").get(auth, roleGuard("admin"), controller.getAll);
router.route("/ban/:userId").post(auth, roleGuard("admin"), controller.banUser);
router.route("/me/addresses").post(auth, controller.createAddress);
router
  .route("/me/addresses/:addressId")
  .patch(auth, controller.updateAddress)
  .delete(auth, controller.removeAddress);

module.exports = router;
