const express = require("express");
const {
  addMedicines,
  lookAllMedicines,
  restockMedicine,
  dropMedicine,
  dashboardMedicines,
  updateMedicine,
} = require("../modules/medicines/medicine.controller");
const {
  createObatValidator,
  restockValidator,
  dashboardValidation,
  updateMedicineValidation,
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
  "/edit/:id",
  verifyToken(["pengasuhan"]),
  updateMedicineValidation,
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
router.patch(
  "/restock/:id",
  verifyToken(["pengasuhan"]),
  restockValidator,
  validate,
  restockMedicine,
);
router.get(
  "/dashboard",
  verifyToken(["admin", "pengasuhan"]),
  dashboardValidation,
  validate,
  dashboardMedicines,
);
module.exports = router;
