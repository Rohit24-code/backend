const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const saltRounds = 10;

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!String(username).trim()) {
    return res.status(400).json({
      message: "username is required!",
    });
  }
  if (!String(email).trim()) {
    return res.status(400).json({
      message: "email is required!",
    });
  }
  if (!String(password)) {
    return res.status(400).json({
      message: "password is required!",
    });
  }

  try {
    let encryptedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(), // Optional: standardizing emails to lowercase is a lifesaver
      password: encryptedPassword,
    });

    return res.status(200).json({
      status: 1,
      //   data,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 0,
      data: null,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({
        status: 0,
        message: "No user found",
      });
    }

    const myPlaintextPassword = password;

    let checkPassword = await bcrypt.compare(
      myPlaintextPassword,
      foundUser.password,
    );

    if (!checkPassword) {
      return res.status(400).json({
        status: 0,
        message: "Email or passord is wrong",
      });
    }
    const private_key = process.env.PRIVATE_KEY;
    console.log(private_key);
    let token = await jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
        username: foundUser.username,
      },
      private_key,
      {
        algorithm: "HS256",
      },
    );

    return res.status(200).json({
      status: 1,
      message: "user logged in  successfully",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 0,
      data: null,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
