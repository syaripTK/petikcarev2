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

const complaintResponseValidation = [
  body("status")
    .isIn(["DITOLAK", "DIPROSES", "SELESAI"])
    .withMessage("Status harus salah satu dari: DITOLAK, DIPROSES, SELESAI"),
  body("catatan")
    .notEmpty()
    .withMessage("Catatan tidak boleh kosong")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Catatan terlalu panjang"),
  body("medicines")
    .optional()
    .isArray()
    .withMessage("Medicines harus berupa array")
    .custom((medicines) => {
      const ids = medicines.map((item) => item.medicine_id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        throw new Error("Terdapat ID obat yang duplikat dalam satu permintaan");
      }
      return true;
    }),
  ,
  body("medicines.*.medicine_id")
    .notEmpty()
    .withMessage("medicine_id tidak boleh kosong")
    .bail()
    .isUUID()
    .withMessage("medicine_id harus berupa UUID yang valid"),
  body("medicines.*.quantity")
    .notEmpty()
    .withMessage("quantity tidak boleh kosong")
    .bail()
    .isInt({ min: 1 })
    .withMessage("quantity harus berupa integer positif"),
];

module.exports = {
  createComplaintValidation,
  idValidation,
  complaintResponseValidation,
};
