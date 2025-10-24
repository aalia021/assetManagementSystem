const Asset = require("../models/Assets");

// Create Asset (Admin only)
const createAsset = async (req, res) => {
  const { asset_name, category, purchase_date, serial_number } = req.body;
  try {
    const asset = await Asset.create({
      asset_name,
      category,
      purchase_date,
      serial_number,
    });
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Asset by ID
const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Asset (Admin only)
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Asset (Admin only)
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json({ message: "Asset deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
};
