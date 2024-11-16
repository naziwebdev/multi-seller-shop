const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/sellerRequest");

const router = express.Router();

router
  .route("/")
  .post(auth, roleGuard("seller"), controllers.create)
  .get(auth, roleGuard("seller"), controllers.getAllSellerRequests);

router
  .route("/:reqId")
  .put(auth,roleGuard("admin"), controllers.edit)
  .delete(auth, roleGuard("seller"), controllers.remove);

module.exports = router;
