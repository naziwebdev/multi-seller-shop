const express = require("express");
const auth = require("../../middlewares/auth");
const roleGuard = require("../../middlewares/roleGurad");
const controllers = require("../../controllers/v1/comment");

const router = express.Router();

router
  .route("/")
  .post(auth, controllers.createComment)
  .get(controllers.getComments);

router
  .route("/:commentId")
  .patch(auth, controllers.editComment)
  .delete(auth, roleGuard("admin"), controllers.removeComment);

router.route("/:commentId/reply").post(auth, controllers.addReply);

router
  .route("/:commentId/reply/:replyId")
  .patch(auth, controllers.editReply)
  .delete(auth, roleGuard("admin"), controllers.removeReply);

module.exports = router;
