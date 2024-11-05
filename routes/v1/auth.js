const express = require("express");
const controller = require("../../controllers/v1/auth");

const router = express.Router();

router.route("/send").post(controller.send);
router.route("/verify").post(controller.verify);
router.route("/me").get(controller.getMe);

module.exports = router;
 