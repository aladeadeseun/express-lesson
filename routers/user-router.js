const router = require("express").Router();

const { validateUserRegistration } = require("../middleware");

const { registerUser, login } = require("../controller/users.controller");

router.post("/register", validateUserRegistration, registerUser);

router.post("/login", login);

module.exports = router;
