const express = require("express");
const {
  addMedicines,
  lookAllMedicines,
  updateMedicine,
  dropMedicine,
} = require("../modules/medicines/medicine.controller");
const {
  createObatValidator,
  updateStockValidator,
} = require("../modules/medicines/medicine.validator");
const validate = require("../shared/middlewares/errors/validate");
const verifyToken = require("../shared/middlewares/authMiddleware");
const { idValidation } = require("../modules/complaints/complaint.validator");

const router = express.Router();
router.get("/lookup", verifyToken(["pengasuhan", "santri"]), lookAllMedicines);
router.post(
  "/create",
  verifyToken(["pengasuhan"]),
  createObatValidator,
  validate,
  addMedicines,
);
router.patch(
  "/update/:id",
  verifyToken(["pengasuhan"]),
  updateStockValidator,
  validate,
  updateMedicine,
);
router.delete(
  "/drop/:id",
  verifyToken(["pengasuhan"]),
  idValidation,
  validate,
  dropMedicine,
);
module.exports = router;
