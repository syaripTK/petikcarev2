const { body,} = require("express-validator");
const { Medicine } = require("../../db/models/index.js");

const createObatValidator = [
  body("nama_obat")
    .trim()
    .notEmpty()
    .withMessage("Nama obat wajib diisi")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama obat maksimal 50 karakter")
    .bail()
    .custom(async (name) => {
      const found = await Medicine.findOne({ where: { name } });
      if (found) {
        throw new Error("Nama obat sudah tersedia");
      }
      return true;
    }),

  body("deskripsi").trim().notEmpty().withMessage("Deskripsi wajib diisi"),

  body("stok")
    .toInt()
    .notEmpty()
    .withMessage("Stok wajib diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Stok harus berupa angka positif"),
];

const updateStockValidator = [
  body("stok")
    .toInt()
    .notEmpty()
    .withMessage("Stok wajib diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Stok harus berupa angka positif"),
];

module.exports = { createObatValidator, updateStockValidator };
