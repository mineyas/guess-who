exports.getHome = (req, res) => {
  // req.flash("success", "New useer added to the family");
  // req.flash("error", "Error adding user");
  // req.flash("info", "info user");
  res.redirect("home");
};

