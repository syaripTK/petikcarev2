const { param } = require("express-validator");

const idValidation = [
  param("id").isUUID().withMessage("ID harus berupa UUID yang valid"),
];

module.exports = { idValidation };
