const express = require("express");
const passport = require("passport");
const User = require("../models/userSchema");
const { hashedPassword } = require("../utils/helpers");

const router = express.Router();
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(200);
  console.log("Success");
});

router.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  const userDb = await User.findOne({ email });
  if (userDb) {
    res.status(400).json({ msg: "user is already exist" });
  } else {
    const password = await hashedPassword(req.body.password);
    const newUser = await User.create({ username, password, email });
    res.send(201);
  }
});

module.exports = router;
