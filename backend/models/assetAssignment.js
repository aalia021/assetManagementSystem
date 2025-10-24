const mongoose = require("mongoose");

const assetAssignmentSchema = new mongoose.Schema({
  asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignment_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "returned"],
    default: "active",
  },
});

module.exports = mongoose.model("AssetAssignment", assetAssignmentSchema);
