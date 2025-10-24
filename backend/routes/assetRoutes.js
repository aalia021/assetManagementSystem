const express = require("express");
const router = express.Router();
const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public for logged-in users
router.get("/", protect, authorize("admin", "employee"), getAssets);
router.get("/:id", protect, authorize("admin", "employee"), getAssetById);

// Admin only routes
router.post("/", protect, authorize("admin"), createAsset);
router.put("/:id", protect, authorize("admin"), updateAsset);
router.delete("/:id", protect, authorize("admin"), deleteAsset);

module.exports = router;
