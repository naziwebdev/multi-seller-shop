const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/category");
const { multerStorage } = require("../../utils/multerConfigs");

const upload = multerStorage(
  "public/icons/category",
  /png|jpg|jpeg|webp|svg|git|svg\+xml/
);

const router = express.Router();


//main category routes 
router
  .route("/")
  .post(auth, roleGuard("admin"), upload.single("icon"), controllers.create);

router
  .route("/:categoryId")
  .put(auth, roleGuard("admin"), upload.single("icon"), controllers.edit)
  .delete(auth, roleGuard("admin"), controllers.remove);

module.exports = router;
