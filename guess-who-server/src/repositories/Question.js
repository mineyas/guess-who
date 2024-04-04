const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
