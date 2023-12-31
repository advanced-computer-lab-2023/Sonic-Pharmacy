const { default: mongoose } = require("mongoose");
const administratorModel = require("../Models/Adminstrator.js");
const pharmacistModel = require("../Models/Pharmacist.js");
const patientModel = require("../Models/Patient.js");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 6 * 60;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const Pharmacist = require("../Models/Pharmacist.js");
const Patient = require("../Models/Patient.js");
const session = require("express-session");

const emailService = "youstina2307@outlook.com"; // e.g., 'gmail'
const emailUser = "youstina2307@outlook.com";
const emailPassword = "23july2002";

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

const createToken = (id) => {
  return jwt.sign({ id }, "secret-unkown", {
    expiresIn: maxAge,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const doctor1 = await pharmacistModel.findOne({ username });
    const patient1 = await patientModel.findOne({ username });
    const admin1 = await administratorModel.findOne({ username });

    if (doctor1) {
      const auth = await bcrypt.compare(password, doctor1.password);
      if (auth) {
        const token = createToken(doctor1._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        req.session.userId = doctor1._id;
        return res.status(200).json({ message: "Pharmacist", user: doctor1 });
      }
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (patient1) {
      const auth = await bcrypt.compare(password, patient1.password);
      if (auth) {
        const token = createToken(patient1._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        req.session.userId = patient1._id;
        console.log("logged in user: " + req.session.userId);
        return res.status(200).json({ message: "Patient", user: patient1 });
      }
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin1) {
      const auth = await bcrypt.compare(password, admin1.password);
      if (auth) {
        const token = createToken(admin1._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

        req.session.userId = admin1._id;
        console.log("logged in user: " + req.session.userId);
        return res.status(200).json({ message: "Admin", user: admin1 });
      }
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("token: " + token);
  console.log("session: " + req.session.userId);
  if (req.session.userId) {
    jwt.verify(token, "secret-unkown", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        // Store the user information in the request object
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  req.session.destroy(function (err) {
    // cannot access session here
  });
  res.status(200).send("logout");
};

const updateUserInfoInCookie = (req, res, user) => {
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
};

let otpNum;

const otp = async (req, res) => {
  const { email } = req.body;
  req.session.email = email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  otpNum = randomstring.generate({
    length: 6, // Adjust the OTP length as needed
    charset: "numeric",
  });

  const mailOptions = {
    from: emailUser,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otpNum}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send OTP" });
    } else {
      console.log("OTP sent: " + info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
};

// POST API endpoint to verify the OTP
const verifyOtp = async (req, res) => {
  console.log(otpNum);
  const { inputNumber } = req.body;

  if (!inputNumber) {
    return res.status(400).json({ error: "Input number is required" });
  }

  if (otpNum === inputNumber) {
    res.status(200).json({ message: "OTP is valid." });
  } else {
    res.status(400).json({ error: "OTP is invalid." });
  }
};

const resetPassword = async (req, res) => {
  let user = await Patient.findOne({ email: req.session.email });

  if (!user) {
    user = await Pharmacist.findOne({ email: req.session.email });
    if (!user) return res.status(404).json({ error: "User not found" });
  }

  console.log("change password" + req.session.email);
  console.log(user);

  const { newPassword } = req.body;

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  console.log(user.password);
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
  login,
  requireAuth,
  logout,
  updateUserInfoInCookie,
  otp,
  verifyOtp,
  resetPassword,
};
