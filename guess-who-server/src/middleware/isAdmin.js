exports.isAdmin = (req, res, next) => {
  console.log(req.user, "req.user");
  if (req.user.role !== "admin") {
    console.log(req.user, "req.user");
    return res.status(403).json({ message: "Forbidden: Not an admin" });
  } else {
    next();
  }
};
