const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");
const Game = require("../repositories/Game");
const Player = require("../repositories/Player");
const Character = require("../repositories/Character");
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find({});
    console.log(games, "games");
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.OK, games });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.INTERNAL_SERVER_ERROR });
  }
};
exports.createGame = async (req, res) => {
  try {
    const gameData = req.body;
    console.log(gameData, "gameDataaaaa");

    if (
      !gameData.gameState ||
      !gameData.players ||
      !gameData.characters ||
      !gameData.selectedCharacter
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    const playersExist = await Player.find({
      _id: { $in: gameData.players },
    });

    const selectedCharacterExist = await Character.findById(
      gameData.selectedCharacter
    );
    const allCharacters = await Character.find({}, "_id");
    const charactersIds = allCharacters.map((character) => character._id.toString());

    console.log(playersExist, "playersExist");
    console.log(selectedCharacterExist, "selectedCharacterExist");
    console.log(allCharacters, "allCharacters");
    console.log(charactersIds, "charactersIds");

    if (!playersExist || playersExist.length !== gameData.players.length) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: "One or more players not found" });
    }

    if (!charactersIds || charactersIds.length === 0) {
      return res
        .status(statusCodes.statusCodes.NOT_FOUND)
        .json({ message: "One or more characters not found" });
    }

    if (!selectedCharacterExist) {
      return res.status(404).json({ message: "Selected character not found" });
    }

    console.log(gameData, "gameData");

    const game = new Game({
      gameState: gameData.gameState,
      players: gameData.players,
      characters: charactersIds,
      selectedCharacter: selectedCharacterExist._id,
      currentTurn: gameData.currentTurn,
      questions: gameData.questions,
      answers: gameData.answers,
      score: gameData.score,
      winner: gameData.winner,
      ended: gameData.ended,
    });

    console.log(game, "new game starteddd");

    await game.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.CREATED, game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: messages.messages.ERROR_CREATION });
  }
};
exports.getOneGame = (req, res) => {
  try {
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.OK });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.INTERNAL_SERVER_ERROR });
  }
};

exports.editGame = (req, res) => {
  try {
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.OK });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.INTERNAL_SERVER_ERROR });
  }
};

exports.deleteGame = (req, res) => {
  try {
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: messages.messages.OK });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.messages.INTERNAL_SERVER_ERROR });
  }
};
