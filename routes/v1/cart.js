const express = require("express");
const auth = require("../../middlewares/auth");
const controllers = require("../../controllers/v1/cart");

const router = express.Router();

router.route("/").get(auth, controllers.getAll);
router.route("/add").post(auth, controllers.add);
router.route("/remove").delete(auth, controllers.remove);

module.exports = router;
