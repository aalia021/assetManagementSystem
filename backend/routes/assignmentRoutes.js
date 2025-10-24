const express = require("express");
const router = express.Router();
const {
  assignAsset,
  returnAsset,
  getAssignments,
  getMyAssignments,
} = require("../controllers/assignmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin: assign, return, view all assignments
router.post("/assign", protect, authorize("admin"), assignAsset);
router.put("/return/:assignmentId", protect, authorize("admin"), returnAsset);
router.get("/", protect, authorize("admin"), getAssignments);

// Employee: view their assigned assets only
router.get("/my-assets", protect, authorize("employee"), getMyAssignments);

module.exports = router;
