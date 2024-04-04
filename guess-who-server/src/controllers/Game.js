const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");
exports.getGame = (req, res) => {
  try {
    res.status(statusCodes.OK).json({ message: messages.OK });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};
exports.createGame = (req, res) => {
  try {
    res.status(statusCodes.CREATED).json({ message: messages.CREATED });
  } catch (error) {
    console.error(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};
