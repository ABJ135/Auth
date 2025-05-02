const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/user.model");
const sendOtp = require("../auth/Email");

const createOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(500).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = createOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await sendOtp(email, otp);
    res.status(201).json({ message: "User registered. OTP sent to email." });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "User registration failed" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    if (user.otp === otp) {
      user.isVerified = true;
      user.otp = null;
      await user.save();
      return res.status(200).json({ message: "Email verified successfully" });
    } else {
      return res.status(400).json({ error: "Wrong OTP" });
    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(500).json({ error: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(500).json({ error: "Email not verified" });
    }

    const token = jwt.sign({ id: user.id }, process.env.Jwt_key, { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Users fetched", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const [updated] = await User.update(updates, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.status(200).json({ message: "User updated", updatedUser });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Update failed" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "User deleted" });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  createUser,
  verifyOTP,
  login,
  getUsers,
  updateUser,
  deleteUser,
};
