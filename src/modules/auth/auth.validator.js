const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi!")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid"),
  body("password").trim().notEmpty().withMessage("Password wajib diisi!"),
];

const refreshValidator = [
  body("refreshToken")
    .trim()
    .notEmpty()
    .withMessage("Refresh token tidak boleh kosong"),
];

module.exports = { loginValidator, refreshValidator };
