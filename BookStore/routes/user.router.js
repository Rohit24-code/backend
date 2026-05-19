const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controllers");

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
