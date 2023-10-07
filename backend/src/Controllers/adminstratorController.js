const admin = require("../Models/Adminstrator.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  // check if username already exists in database
  if (!validateUsername(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  // create new admin
  const newAdmin = await admin.create({ username, password });
  res.status(201).json(newAdmin);
};

const getAdmins = async (req, res) => {
  const users = await admin.find();
  res.status(200).send(users);
};

const deleteAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    // check if admin exists in database
    const existingAdmin = await admin.findById(id);
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // delete admin
    await existingAdmin.remove();
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const changeAdminPassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    // check if admin exists in database
    const existingAdmin = await admin.findById(id);
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, existingAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate new password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    // update admin password
    existingAdmin.password = passwordHash;
    await existingAdmin.save();
    res.status(200).json({ message: "Admin password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdmins, changeAdminPassword, deleteAdmin, createAdmin };
