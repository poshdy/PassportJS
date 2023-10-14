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

// router.patch("/:id", async(req, res) => {
//     const {id} = req.params
//     const user = await User.findById(id)
//     const upadated = await user.updateOne()

// });
// router.get("/:id", passport.authenticate("local"), (req, res) => {
//   res.send(200);
//   console.log("Success");
// });

module.exports = router;
