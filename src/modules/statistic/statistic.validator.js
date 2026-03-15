const { query } = require("express-validator");

const limitValidations = [
  query("limit")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Limit harus berupa angka positif"),
];

module.exports = { limitValidations };