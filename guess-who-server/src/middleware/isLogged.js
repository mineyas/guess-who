const jwt = require("jsonwebtoken");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(statusCodes.statusCodes.FORBIDDEN)
          .json({ message: "Failed to authenticate token." });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res
      .status(statusCodes.statusCodes.UNAUTHORIZED)
      .json({ message: messages.messages.UNAUTHORIZED });
  }
};
