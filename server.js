require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./stratgies/local");
require("./db");
const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());
const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: memoryStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use((req, res, next) => {
  console.log(memoryStore);
  next();
});
app.get("/", (req, res) => {
  res.send(200);
});

app.listen(3000, () => {
  console.log("server is running");
});
