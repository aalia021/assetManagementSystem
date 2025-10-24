const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    asset_name: { type: String, required: true },
    category: { type: String, required: true },
    purchase_date: { type: Date },
    serial_number: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["available", "assigned", "inrepair", "retired"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
