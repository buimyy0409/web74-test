const { createUser, logIn } = require("../controllers/user.controller");

const authRoutes = require("express").Router();

authRoutes.post("/signup", createUser);
authRoutes.post("/login", logIn);

module.exports = { authRoutes };