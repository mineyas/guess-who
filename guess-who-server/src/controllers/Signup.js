const bcrypt = require("bcrypt");
const User = require("../repositories/User");

exports.getSignup = (req, res) => {
  res.redirect("/signup");
};
exports.postSignup = async (req, res) => {
  try {
    const user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;


    console.log(user, "user new "+hash);
    await user.save();
     user.password = null;
    res.status(200).json({ message : "user added", user });
    // res.redirect("/");
  } catch (error) {
    console.error(error, "error");
    // res.redirect("/signup");
    res.status(500).json({ message : "error adding user" });
  }
};
