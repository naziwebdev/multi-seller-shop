const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/product");
const { multerStorage } = require("../../utils/multerConfigs");

const upload = multerStorage("public/images/products");

const router = express.Router();

router
  .route("/")
  .post(auth, roleGuard("admin"), upload.array("images", 5), controllers.create)
  .get(controllers.getAll);

router
  .route("/:productId")
  .put(auth, roleGuard("admin"), upload.array("images", 5), controllers.edit)
  .delete(auth, roleGuard("admin"), controllers.remove)
  .get(controllers.getOne);

module.exports = router;
