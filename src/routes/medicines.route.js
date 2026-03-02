const express = require("express");
const {
  addMedicines,
  lookAllMedicines,
  updateMedicine,
  dropMedicine,
} = require("../modules/medicines/medicine.controller");
const {
  createObatValidator,
} = require("../modules/medicines/medicine.validator");
const validate = require("../shared/middlewares/errors/validate");

const router = express.Router();
router.get("/lookup", lookAllMedicines);
router.post("/create", createObatValidator, validate, addMedicines);
router.patch("/update/:id", updateMedicine);
router.delete("/drop/:id", dropMedicine);
module.exports = router;
