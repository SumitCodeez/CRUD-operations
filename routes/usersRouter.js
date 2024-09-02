const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Create a new user
router.post("/create", async (req, res) => {
  try {
    const { username, name, email } = req.body;
    const user = await User.create({ username, name, email });
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating user", details: err.message });
  }
});

// Read all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: err.message });
  }
});

// Read a single user by ID
router.get("/users/:userid", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: err.message });
  }
});

// Update a user
router.post("/edit/:userid", async (req, res) => {
  try {
    const { username, name, email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userid },
      { username, name, email },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating user", details: err.message });
  }
});

// Delete a user
router.get("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: err.message });
  }
});

module.exports = router;
