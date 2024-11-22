const express = require("express");
const auth = require("../../middlewares/auth");
const controllers = require("../../controllers/v1/checkout");

const router = express.Router();

router.route("/").post(auth, controllers.createCheckout);
router.route("/verify").get(controllers.verifyCheckout);

module.exports = router;
