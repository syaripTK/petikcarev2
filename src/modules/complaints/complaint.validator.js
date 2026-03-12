const { body, param } = require("express-validator");

const createComplaintValidation = [
  body("keluhan")
    .isString()
    .isLength({ max: 50 })
    .withMessage("Title harus berupa string dengan maksimal 50 karakter"),
  body("keterangan").isString().withMessage("Description harus berupa string"),
];

const idValidation = [
  param("id").isUUID().withMessage("ID harus berupa UUID yang valid"),
];

module.exports = {
  createComplaintValidation,
  idValidation,
};
