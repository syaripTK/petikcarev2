const { Router } = require("express");
const {
  getMyNotifications,
  markNotificationRead,
} = require("../modules/notyf/notyf.controller");
const verifyToken = require("../shared/middlewares/authMiddleware");
const { idValidation } = require("../modules/notyf/notyf.validator");
const validate = require("../shared/middlewares/errors/validate");

const router = Router();

router.get("/", verifyToken(["santri"]), getMyNotifications);
router.patch(
  "/:id/read",
  verifyToken(["santri"]),
  idValidation,
  validate,
  markNotificationRead,
);

module.exports = router;
