const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const categoryControllers = require("../../controllers/v1/category");
const subCategoryControllers = require("../../controllers/v1/subCategory");
const filtersControllers = require("../../controllers/v1/filtersCategory");
const { multerStorage } = require("../../utils/multerConfigs");

const upload = multerStorage(
  "public/icons/category",
  /png|jpg|jpeg|webp|svg|git|svg\+xml/
);

const router = express.Router();

//main category routes
router
  .route("/")
  .post(
    auth,
    roleGuard("admin"),
    upload.single("icon"),
    categoryControllers.create
  );

router
  .route("/:categoryId")
  .put(
    auth,
    roleGuard("admin"),
    upload.single("icon"),
    categoryControllers.edit
  )
  .delete(auth, roleGuard("admin"), categoryControllers.remove);

router
  .route("/:categoryId/filters")
  .get(categoryControllers.getOneCategoryFilters);

//subCategory routes
router
  .route("/sub")
  .post(auth, roleGuard("admin"), subCategoryControllers.create)
  .get(subCategoryControllers.getAll);

router
  .route("/sub/:subCategoryId")
  .put(auth, roleGuard("admin"), subCategoryControllers.edit)
  .delete(auth, roleGuard("admin"), subCategoryControllers.remove)
  .get(subCategoryControllers.getOne);

router
  .route("/sub/:subCategoryId/filters")
  .get(subCategoryControllers.getOneSubCategoryFilters);

  
//filters category routes
router
  .route("/filters")
  .post(auth, roleGuard("admin"), filtersControllers.create);
router
  .route("/filters/:filterId")
  .put(auth, roleGuard("admin"), filtersControllers.edit)
  .delete(auth, roleGuard("admin"), filtersControllers.remove);

module.exports = router;
