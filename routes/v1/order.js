const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/order");

const router = express.Router();

router.route("/").get(auth, controllers.getAll);
router.route("/:id").patch(auth, roleGuard("admin"), controllers.edit);

module.exports = router;
