const express = require("express");

const User = require("../models/userSchema");

const router = express.Router();

router.use((req, res, next) => {
  if (req.user) next();
  else res.send(401);
});
router.get("/", async (req, res) => {
  const data = await User.find();
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.updateOne({ _id: id }, { $set: { username: req.body.username } });
    res.send("updated");
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
