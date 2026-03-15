const express = require("express");
const router = express.Router();
const {
  summary,
  topMedicines,
  commonComplaints,
} = require("../modules/statistic/statistic.controller.js");
const verifyToken = require("../shared/middlewares/authMiddleware.js");
const {
  limitValidations,
} = require("../modules/statistic/statistic.validator.js");
const validate = require("../shared/middlewares/errors/validate.js");

router.get(
  "/summary",
  verifyToken(["admin", "pengasuhan"]),
  summary,
);
router.get(
  "/top-medicines",
  verifyToken(["admin", "pengasuhan"]),
  limitValidations,
  validate,
  topMedicines,
);
router.get(
  "/common-complaints",
  verifyToken(["admin", "pengasuhan"]),
  limitValidations,
  validate,
  commonComplaints,
);

module.exports = router;
