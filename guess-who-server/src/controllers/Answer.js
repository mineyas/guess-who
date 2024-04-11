const bcrypt = require("bcrypt");
const User = require("../repositories/User");
const Question = require("../repositories/Question");
const statusCodes = require("../utils/statusCodes");
const Player = require("../repositories/Player");

exports.postAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.body.question);
    const player = await Player.findById(req.body.player);

    if (!question) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    }

    if (!player) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: "Player not found" });
    }

    const answerData = req.body
    const answer = new Answer({
      question: question,
      player: player.username,
      response: answerData.response,
    });
    await answer.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "Answer added", answer });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error adding answer" });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(statusCodes.statusCodes.OK).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(statusCodes.statusCodes.OK).json({ message: "User deleted", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
