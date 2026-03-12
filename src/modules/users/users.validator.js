const { body, param, query } = require("express-validator");
const { User } = require("../../db/models/index.js");

const createValidator = [
  body("nama")
    .trim()
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),

  body("role")
    .isIn(["admin", "santri", "pengasuhan"])
    .withMessage("Role tidak valid"),

  body("kamar").optional(),
];

const editUserValidator = [
  param("id").isUUID().withMessage("ID harus berupa UUID yang valid"),
  body("nama")
    .trim()
    .optional()
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Format email tidak valid")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),
  body("password")
    .trim()
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("role")
    .optional()
    .isIn(["admin", "santri", "pengasuhan"])
    .withMessage("Role tidak valid"),
  body("kamar").optional(),
];

const idValidation = [
  param("id").isUUID().withMessage("ID harus berupa UUID yang valid"),
];

module.exports = { createValidator, editUserValidator, idValidation };
