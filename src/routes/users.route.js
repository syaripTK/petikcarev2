const express = require("express");
const verifyToken = require("../shared/middlewares/authMiddleware");
const {
  createUser,
  editUser,
  lookAllUser,
  dropUser,
} = require("../modules/users/users.controller");
const {
  createValidator,
  editUserValidator,
  idValidation,
} = require("../modules/users/users.validator");
const validate = require("../shared/middlewares/errors/validate");

const router = express.Router();

router.post(
  "/create",
  createValidator,
  validate,
  verifyToken(["admin"]),
  createUser,
);
router.get("/lookup", verifyToken(["admin"]), lookAllUser);
router.patch(
  "/edit/:id",
  editUserValidator,
  validate,
  verifyToken(["admin"]),
  editUser,
);
router.delete(
  "/drop/:id",
  verifyToken(["admin"]),
  idValidation,
  validate,
  dropUser,
);
module.exports = router;
