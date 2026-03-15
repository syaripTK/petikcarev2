const { Router } = require("express");
const {
  getAllComplaints,
  createComplaint,
  getMyComplaints,
  getComplaintById,
  deleteComplaint,
  responseToComplaint,
  revertComplaint
} = require("../modules/complaints/complaint.controller");
const verifyToken = require("../shared/middlewares/authMiddleware");
const {
  createComplaintValidation,
  idValidation,
  complaintResponseValidation,
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

//============ PENGASUHAN =============//
router.get("/lookall", verifyToken(["pengasuhan"]), getAllComplaints);
router.get(
  "/search/:id",
  verifyToken(["pengasuhan"]),
  idValidation,
  validate,
  getComplaintById,
);
router.post(
  "/respond/:id",
  verifyToken(["pengasuhan"]),
  idValidation,
  complaintResponseValidation,
  validate,
  responseToComplaint,
);
router.post(
  "/revert/:id",
  verifyToken(["pengasuhan"]),
  idValidation,
  validate,
  revertComplaint,
);

module.exports = router;
