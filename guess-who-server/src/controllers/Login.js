const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cookies = require("cookies");
const User = require("../repositories/User");
const generateToken = (user) => {
  return jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
console.log(generateToken, "gen token");

exports.getLogout = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("jwt", null, { httpOnly: true });

  // req.session.user = null;
  // req.flash("info", "Vous êtes déconnecté !");
  // res.redirect("/");
  res.status(200).json({ message: "user logged out" });
};

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, 'user login')
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const token = generateToken(user);
    // req.session.user = user;
    user.password = null;
    res.status(200).json({ message: "User logged in", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
