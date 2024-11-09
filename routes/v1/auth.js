const express = require("express");
const controller = require("../../controllers/v1/auth");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/send").post(controller.send);
router.route("/verify").post(controller.verify);
router.route("/me").get(auth, controller.getMe);

module.exports = router;
