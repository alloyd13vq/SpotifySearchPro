const express = require("express");//Express Dependency
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");//Mongoose Dependency
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");


const User = require("./models/User");
const Track = require("./models/Track");

//Controllers
const homeController = require("./controllers/home");
const userController = require("./controllers/user");
const tracksController = require("./controllers/tracks");

const app = express();
app.set("view engine", "ejs");
const { PORT, MONGODB_URI } = process.env;
//DB Connect
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});



//Middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(240000000) } }))

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})


app.get("/", homeController.list);
app.get("/", tracksController.list);



app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/home", async(req, res) => {
})

app.post("/tracks", tracksController.list);


app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});

app.post("/join", userController.create);




app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
