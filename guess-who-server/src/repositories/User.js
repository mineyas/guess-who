const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 8 characters long"],
    maxlength: [100, "Password must be less than 128 characters long"],
  },
  date: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["admin", "player"],
    default: "player",
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    default: null,
  },
  blocked: { type: Boolean, default: false },
});
module.exports = mongoose.model("User", userSchema);
