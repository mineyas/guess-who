const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cookies = require("cookies");
const User = require("../repositories/User");
const statusCodes = require("../utils/statusCodes");
const generateToken = (user) => {
  return jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
exports.getLogout = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("jwt", null, { httpOnly: true });

  res.status(statusCodes.statusCodes.OK).json({ message: "user logged out" });
};

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, "user login");
    if (user.blocked) {
      return res.status(401).json({ message: "User blocked" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    user.password = null;
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "User logged in", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
