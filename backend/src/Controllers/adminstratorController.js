const admin = require("../Models/Adminstrator.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  const { username, password, name, email } = req.body;

  const validation = await validateUsername(username);
  // check if username already exists in database
  if (!validation) {
    return res.status(409).json({ message: "Username already exists" });
  }
  // create new admin
  try {
    const newAdmin = await admin.create({ name, username, password, email });
    newAdmin.password = await bcrypt.hash(password, 10);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ message: "server error" });
    console.log(err);
  }
};

const getAdmins = async (req, res) => {
  let users = await admin.find();
  //add default name if no name
  users = users.map((user) => {
    if (!user.name) {
      user.name = "John Doe";
    }
    return user;
  });
  res.status(200).send(users);
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  // check if admin exists in database
  admin
    .findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser) {
        console.log("User deleted:", deletedUser);
        res.status(200).json({ message: "Admin deleted successfully" });
      } else {
        return res.status(404).json({ message: "Admin not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin using their username
    const user = await admin.findOne({ username });

    // If the admin wasn't found, respond with an error message
    if (!user) {
      return res.status(404).json({ message: "Invalid login credentials" });
    }

    // Check if the password is correct
    const isValidPassword = await user.checkPassword(password);

    // If the password is incorrect, respond with an error message
    if (!isValidPassword) {
      return res.status(409).json({ message: "Invalid login credentials" });
    }

    // If the username and password are correct, create a JWT token
    //const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    req.session.user = user;
    return res.status(200).json({ message: "Login Successful" });
    // Send the token in the response
    //res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

const adminChangePassword = async (req, res) => {
  const user = await admin.findById(req.session.userId);

  if (!user) {
    return res.status(404).json({ error: "Admin not found" });
  }

  const { oldPassword, newPassword } = req.body;

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: "Invalid old password" });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};

module.exports = { getAdmins, deleteAdmin, createAdmin, adminChangePassword };
