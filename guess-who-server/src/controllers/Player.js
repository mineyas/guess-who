const User = require("../repositories/User");
const Player = require("../repositories/Player");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    console.log(players, "players");

    res.status(200).json({ players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving players" });
  }
};
exports.createPlayer = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    console.log(user, "user player with iddd");

    if (!user) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: messages.messages.NOT_FOUND });
    }

    const { username, avatar } = req.body;
    // console.log(userId, "ididid playerrr");

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
    res.status(statusCodes.statusCodes.OK).json({ message: messages.messages.UPDATE_SUCCESS, player });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.messages.UPDATE_FAIL });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    res.status(statusCodes.statusCodes.OK).json({ message: messages.messages.DELETE_SUCCESS, player });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.messages.DELETE_FAIL });
  }
};
