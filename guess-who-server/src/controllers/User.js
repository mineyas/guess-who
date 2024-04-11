const bcrypt = require("bcrypt");
const User = require("../repositories/User");
const statusCodes = require("../utils/statusCodes");

exports.getAdmin = (req, res) => {

  res
    .status(statusCodes.statusCodes.OK)
    .json({ message: "Admin page accessed successfully" });
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(statusCodes.statusCodes.OK).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};
exports.getAllUsersPlayers = async (req, res) => {
  try {
    const users = await User.find({
      role: "player",
    });
    console.log(users, "usersjkjk");
    res.status(statusCodes.statusCodes.OK).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};
exports.getAdminById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(statusCodes.statusCodes.OK).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
}
exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.password = null;
    res.status(statusCodes.statusCodes.OK).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  console.log(update, "update user");
  try {
    const user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    console.log(user, "updated user");
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "User updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error update user" });
  }
};

exports.updatePlayerId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.playerId = req.body.playerId.toString();
    await user.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "User updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", user });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "User deleted", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", user });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { blocked: req.body.isBlocked },
      { new: true },
    );

    user.save();
    res
      .status(statusCodes.statusCodes.OK)
      .json({ message: "User blocked", user });
  } catch (error) {
    res.status(500).json({ message: "Error blocking user", user });
  }
};
