const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const router = require("./src/routes");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("src"));

mongoose.connect(process.env.MONGODB).then(() => console.log("Connected!!"));

// app.use("/uploads", express.static(path.join(__dirname, "src")));
app.use("/uploads", express.static("src/uploads"));
// app.use("/uploads", express.static("uploads"));
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(process.env.PORT, () => {
  console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});

router(app);
