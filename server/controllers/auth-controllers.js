const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *-------------------
// Home Logic
// *-------------------

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to online mobile store using router");
  } catch (error) {
    console.log(error);
  }
};

// *-------------------
// Register Logic
// *-------------------

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email is already exist" });
    }

    // * --------------------------------------------------------------------
    //bcrypt password

    //?this is one way to bcrypt password another way is in usr-model.js file
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    // * --------------------------------------------------------------------

    const userCreated = await User.create({
      username,
      email,
      password,
      phone,
    });

    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(400).json({ msg: " Page not found" });
    next(error);
  }
};

// *-------------------
// User Login Logic
// *-------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json({ msg: " internal server error" });
    next(error);
  }
};

module.exports = { home, register, login };
