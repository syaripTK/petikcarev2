const express = require("express");
const { loginValidator } = require("../modules/auth/auth.validator");
const validate = require("../shared/middlewares/errors/validate");
const { login } = require("../modules/auth/auth.controller");

const router = express.Router();

router.post("/login", loginValidator, validate, login);

module.exports = router;
