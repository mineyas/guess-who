const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Player", playerSchema);
