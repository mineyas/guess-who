const User = require("../repositories/User");
const statusCodes = require("../utils/statusCodes");
const messages = require("../utils/messages");
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
};
