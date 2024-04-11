const User = require("../repositories/User");
const Player = require("../repositories/Player");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    console.log(players, "players");

    res.status(statusCodes.statusCodes.OK).json({ players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving players" });
  }
};
exports.createPlayer = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findById(req.body.userId);
    console.log(user, "user player with iddd");

    if (!user) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: messages.messages.NOT_FOUND, user });
    }

    const { username, avatar } = req.body;

    const playerData = req.body;
    console.log(playerData, "playerData");

    const player = new Player({
      userId: user._id,
      username: username,
      avatar: avatar,
      score: playerData.score,
      gamesPlayed: playerData.gamesPlayed,
      active: playerData.active,
      wins: playerData.wins,
      losses: playerData.losses,
      lastActive: playerData.lastActive,
      date: playerData.date,
    });

    console.log(player, "new player");

    await player.save();

    user.playerId = player._id;
    await user.save();
    console.log(user, "user updated");

    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.CREATED, player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: messages.messages.ERROR_CREATION });
  }
};
exports.getOnePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: messages.messages.NOT_FOUND });
    }
    res.status(statusCodes.statusCodes.OK).json({ player });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving player" });
  }
};
exports.getPlayerByUserId = async (req, res) => {
  try {
    const player = await Player.findOne({ userId: req.params.userId });
    console.log(player, "player one by user id");
    if (!player) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: messages.messages.NOT_FOUND, player });
    }
    res.status(statusCodes.statusCodes.OK).json({ player });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving player" });
  }
};
exports.editPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    player.username = req.body.username;
    player.avatar = req.body.avatar;
    await player.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.UPDATE_SUCCESS, player });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.UPDATE_FAIL });
  }
};
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    const user = await User.findOneAndUpdate(
      { playerId: req.params.id },
      { playerId: null },
      { new: true }
    );
    user.save();

    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.DELETE_SUCCESS, player });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.DELETE_FAIL });
  }
};
