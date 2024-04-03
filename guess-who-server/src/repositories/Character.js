const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  hairColor: {
    type: String,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  facialHair: {
    type: String,
    enum: ["yes", "no"],
    default: false,
  },
  glasses: {
    type: String,
    enum: ["yes", "no"],
    default: false,
  },
  hat: {
    type: String,
    enum: ["yes", "no"],
    default: false,
  },
  // accessories: {
  //   type: [String],
  // },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Character", characterSchema);
