const Login = require("./controllers/Login");
const Signup = require("./controllers/Signup");
const Character = require("./controllers/Character");
const User = require("./controllers/User");
const Player = require("./controllers/Player");
const Game = require("./controllers/Game");
const image = require("./middleware/multerMiddleware");
const { authMiddleware } = require("./middleware/isLogged");
const { isAdmin } = require("./middleware/isAdmin");
module.exports = (app) => {
  app.post("/login", Login.postLogin);
  app.post("/signup", Signup.postSignup);
  app.get("/logout", Login.getLogout);

  // ADMIN
  app.get("/admin", authMiddleware,
  isAdmin,
  User.getAdminById);
  app.get(
    "/admin/users",

    authMiddleware,
    isAdmin,
    User.getAllUsersPlayers
  );
  app.post(
    "/admin/users/edit/:id",

    authMiddleware,
    isAdmin,
    User.editUser
  );
  app.delete(
    "/admin/users/delete/:id",

    authMiddleware,
    isAdmin,
    User.deleteUser
  );
  app.get(
    "/admin/characters",

    authMiddleware,
    isAdmin,
    Character.getAllCharacters
  );
  app.post(
    "/admin/character",
    image.upload.single("image"),

    authMiddleware,
    isAdmin,
    Character.addCharacter
  );
  app.get(
    "/admin/character/:id",

    authMiddleware,
    isAdmin,
    Character.getOneCharacter
  );
  app.post(
    "/admin/character/edit/:id",
    image.upload.single("image"),

    authMiddleware,
    isAdmin,
    Character.editCharacter
  );
  app.delete(
    "/admin/character/delete/:id",

    authMiddleware,
    isAdmin,
    Character.deleteCharacter
  );

  // USER
  app.get("/users", authMiddleware, User.getAllUsers);
  app.get("/user/:id", authMiddleware, User.getOneUser);
  app.post("/user/edit/:id", authMiddleware, User.editUser);
  app.post("/user/block/:id", authMiddleware, User.blockUser);
  app.delete("/user/delete/:id", authMiddleware, User.deleteUser);

  // PLAYER
  app.get("/players", authMiddleware, Player.getAllPlayers);
  app.post("/player/add", authMiddleware, Player.createPlayer);
  app.get("/player/:id", authMiddleware, Player.getOnePlayer);
  app.get("/player/user/:userId", authMiddleware, Player.getPlayerByUserId);
  app.post("/player/edit/:id", authMiddleware, Player.editPlayer);
  app.delete("/player/delete/:id", authMiddleware, Player.deletePlayer);

  // GAME
  app.get("/games", authMiddleware, Game.getAllGames);
  app.post("/game/start", authMiddleware, Game.createGame);
  app.get("/game/:id", authMiddleware, Game.getOneGame);
  app.post("/game/edit/:id", authMiddleware, Game.editGame);
  app.delete("/game/delete/:id", authMiddleware, Game.deleteGame);

  // ANSWER
  // app.get("/answer", Player.getAllPlayers);
  // app.post("/answer/add", Player.createPlayer);
  // app.get("/answer/:id", Player.getOnePlayer);
  // app.post("/answer/edit/:id", Player.editPlayer);
  // app.delete("/answer/delete/:id", Player.deletePlayer);

  // CHARACTERS
  app.get("/characters", authMiddleware, Character.getAllCharacters);
};
