const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameState: {
    type: String,
    enum: ["paused", "playing", "ended"],
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
  ],
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },
  ],
  selectedCharacter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  currentTurn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  ended: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Game", gameSchema);
