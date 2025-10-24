const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public route
router.post("/login", loginUser);

// Admin-only route
router.post("/register", protect, authorize("admin"), registerUser);

// Protected routes
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: `Hello Admin ${req.user.name}` });
});

router.get("/employee", protect, authorize("employee"), (req, res) => {
  res.json({ message: `Hello Employee ${req.user.name}` });
});

router.get("/profile", protect, authorize("admin", "employee"), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
