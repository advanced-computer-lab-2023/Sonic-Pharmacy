const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    messages: {
      type: [[String, String, String,String]],
      required: false,
    },
    patientID: {
      type: String,
      required: false,
    },
    doctorID: {
      type: String,
      required: false,
    },
    pharmacistID: {
      type: String,
      required: false,
    },
    flag: {
      type: Boolean,
      //default: false, // Set the default value to false
      required: false,
    },
  },
  { timestamps: true }
);

chatSchema.virtual("patient", {
    ref: "Patient",
    localField: "patientID",
    foreignField: "_id",
    justOne: true,
});

chatSchema.virtual("doctor", {
    ref: "Doctor",
    localField: "doctorID",
    foreignField: "_id",
    justOne: true,
});
const Chat = mongoose.model(
    "Chat",
  chatSchema
  );
module.exports = Chat;
