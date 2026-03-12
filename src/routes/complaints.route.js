const { Router } = require("express");
const {
  getAllComplaints,
  createComplaint,
  getMyComplaints,
  getComplaintById,
  deleteComplaint,
} = require("../modules/complaints/complaint.controller");
const verifyToken = require("../shared/middlewares/authMiddleware");
const {
  createComplaintValidation,
  idValidation,
} = require("../modules/complaints/complaint.validator");
const validate = require("../shared/middlewares/errors/validate");
const router = Router();
//============= SANTRI =============//
router.post(
  "/create",
  verifyToken(["santri"]),
  createComplaintValidation,
  validate,
  createComplaint,
);
router.get("/mycomplaints", verifyToken(["santri"]), getMyComplaints);
router.delete(
  "/dropcomplaint/:id",
  verifyToken(["santri"]),
  idValidation,
  validate,
  deleteComplaint,
);

// ============PENGASUHAN =============//
router.get("/lookall", verifyToken(["pengasuhan"]), getAllComplaints);
router.get(
  "/search/:id",
  verifyToken(["pengasuhan"]),
  idValidation,
  validate,
  getComplaintById,
);

module.exports = router;
