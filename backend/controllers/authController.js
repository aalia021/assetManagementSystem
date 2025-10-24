const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

// Register (optional)
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user);
  res
    .status(201)
    .json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

module.exports = { loginUser, registerUser };
