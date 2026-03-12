const express = require("express");
const {
  loginValidator,
  refreshValidator,
} = require("../modules/auth/auth.validator");
const validate = require("../shared/middlewares/errors/validate");
const {
  login,
  logout,
  refreshToken,
} = require("../modules/auth/auth.controller");
const verifyToken = require("../shared/middlewares/authMiddleware");
const loginLimiter = require("../shared/middlewares/limit");

const router = express.Router();

router.post("/login", loginLimiter, loginValidator, validate, login);
router.post("/logout", verifyToken(["admin", "santri", "pengasuhan"]), logout);
router.post("/refresh", refreshValidator, validate, refreshToken);
module.exports = router;
