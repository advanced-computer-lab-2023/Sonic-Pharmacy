const Medicine = require("../Models/Medicine");
const fs = require("fs");


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});



const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicine = async (req, res) => {
  const id = req.query._id;

  try {
    const medicine = await Medicine.findById(id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ message: "Medicine not found" });
  }
};

const searchMedicine = async (req, res) => {
  const name = req.query.name;

  try {
    const medicine = await Medicine.findOne({
      name: { $regex: new RegExp(name, "i") },
    });
    if (medicine) {
      res.status(200).json(medicine);
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicineSale = async (req, res) => {
  try {
    const medicines = await Medicine.find({}, "name quantity sales");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterMedicine = async (req, res) => {
  const medicinalUses = req.body.medicinalUses;

  if (
    !medicinalUses ||
    !Array.isArray(medicinalUses) ||
    medicinalUses.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Medicinal uses not specified or not in array format" });
  }

  try {
    const medicines = await Medicine.find({
      medicinalUse: { $in: medicinalUses },
    });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMedicine = async (req, res) => {
  if (!req.body.picture) {
    let picture = {};
    const path = require("path");
    const filePath = path.join(__dirname, "../res/default-medicine-pic.jpg");
    const imageBuffer = fs.readFileSync(filePath);
    const base64ImageData = imageBuffer.toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
    req.body.picture = imageSrc;
  }

  try {
    const medicine = await Medicine.create(req.body);
    // const newMedicine = await medicine.save();
    res.status(200).json(medicine);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (E11000)
      res.status(409).json({
        message: "Duplicate key error. Medicine with this name already exists.",
      });
    } else {
      // Other errors
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

const updateMedicine = async (req, res) => {
  const id = req.query._id;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.query, {
      new: true,
    });
    if (!updatedMedicine)
      return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  const id = req.query._id;

  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (deletedMedicine) {
      res.status(200).json({ message: "Medicine deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMedicines,
  getMedicine,
  getMedicineSale,
  searchMedicine,
  filterMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
