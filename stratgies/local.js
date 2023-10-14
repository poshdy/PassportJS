const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../models/userSchema");
const { compare } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("serializing user....");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialzing");
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});
passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      if (!email || !password) {
        throw new Error("Bad request please enter your email and password");
      }
      try {
        const userDb = await User.findOne({ email });
        if (!userDb) {
          throw new Error("you dont have accout please sign up");
        }
        const isVaild = compare(password, userDb.password);
        if (isVaild) {
          console.log("Logged in");
          done(null, userDb);
        } else {
          console.log("failed to authenticate");
          done(new Error("failed to authenticate"), null);
        }
      } catch (error) {
        done(err, null);
      }
    }
  )
);
