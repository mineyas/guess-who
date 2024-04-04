const Home = require("./controllers/Home");
const Login = require("./controllers/Login");
const Signup = require("./controllers/Signup");
const Character = require("./controllers/Character");
const Profile = require("./controllers/Profile");
const User = require("./controllers/User");
const Player = require("./controllers/Player");
const check = require("./middleware/isAdmin");
const image = require("./middleware/multerMiddleware");
module.exports = (app) => {
  app.get("/", Home.getHome);

  app.post("/login", Login.postLogin);

  app.post("/signup", Signup.postSignup);
  app.get("/logout", Login.getLogout);

  app.get("/profile", Profile.getProfile);
  // ADMIN
  app.get("/admin", check.isAdmin, User.getAdmin);
  app.get(
    "/admin/users",
    // check.isAdmin,
    User.getAllUsers
  );
  app.post("/admin/users/edit/:id", check.isAdmin, User.editUser);
  app.delete("/admin/users/delete/:id", check.isAdmin, User.deleteUser);
  app.get("/admin/character", Character.getAllCharacters);
  app.post(
    "/admin/character",
    // check.isAdmin,
    image.upload.single("image"),
    Character.addCharacter
  );
  app.get("/admin/character/:id", check.isAdmin, Character.getOneCharacter);
  app.post("/admin/character/edit/:id", check.isAdmin, Character.editCharacter);
  app.delete(
    "/admin/character/delete/:id",
    // check.isAdmin,
    Character.deleteCharacter
  );

  // PLAYER

  app.get("/players", Player.getAllPlayers);
  app.post("/player/add", Player.createPlayer);
  app.get("/players/:id", Player.getOnePlayer);
  app.post("/players/edit/:id", Player.editPlayer);
  app.delete("/players/delete/:id", Player.deletePlayer);
};
