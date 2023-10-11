const mongoose = require("mongoose");
const { MedicinalUseArray } = require("./MedicinalUse");

const medicineSchema = new mongoose.Schema({
  picture: {
    type: String,
  }, // Store the image source as a string
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  activeIngredients: {
    type: [String], // Assuming an array of strings for active ingredients
    required: true,
  },
  medicinalUse: {
    type: String,
    enum: MedicinalUseArray,
    required: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
