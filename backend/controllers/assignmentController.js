const Asset = require("../models/Assets");
const User = require("../models/User");
const AssetAssignment = require("../models/assetAssignment");

// Assign asset to employee (Admin Only)
exports.assignAsset = async (req, res) => {
  try {
    const { asset_id, employee_id } = req.body;

    const asset = await Asset.findById(asset_id);
    const employee = await User.findById(employee_id);

    if (!asset || !employee)
      return res.status(404).json({ message: "Asset or employee not found" });

    // Prevent duplicate assignment
    if (asset.status !== "available")
      return res.status(400).json({ message: "Asset is not available" });

    const existingAssignment = await AssetAssignment.findOne({
      asset_id,
      status: "active",
    });

    if (existingAssignment)
      return res
        .status(400)
        .json({ message: "This asset is already assigned to an employee" });

    // Create assignment
    const assignment = await AssetAssignment.create({
      asset_id,
      employee_id,
      status: "active",
    });

    // Update asset status
    asset.status = "assigned";
    await asset.save();

    res.status(201).json({
      message: "Asset assigned successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return asset (Admin Only)
exports.returnAsset = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await AssetAssignment.findById(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    if (assignment.status === "returned")
      return res.status(400).json({ message: "Asset already returned" });

    // Mark assignment as returned
    assignment.status = "returned";
    assignment.return_date = new Date();
    await assignment.save();

    // Update asset status to available
    const asset = await Asset.findById(assignment.asset_id);
    if (asset) {
      asset.status = "available";
      await asset.save();
    }

    res.json({ message: "Asset returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin - Get All Assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await AssetAssignment.find()
      .populate("asset_id", "asset_name category serial_number status")
      .populate("employee_id", "name email department");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee - View Their Assigned Assets Only
exports.getMyAssignments = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware

    const assignments = await AssetAssignment.find({
      employee_id: userId,
      status: "active",
    })
      .populate("asset_id", "asset_name category serial_number status")
      .populate("employee_id", "name email department");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
