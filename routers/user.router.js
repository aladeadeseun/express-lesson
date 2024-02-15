const router = require("express").Router();

const { validateUserRegistration, isAuthenticated } = require("../middleware");

const {
  registerUser,
  login,
  self,
  getOneUser,
} = require("../controller/users.controller");
const { route } = require("express/lib/application");

router.post("/register", validateUserRegistration, registerUser);

router.post("/login", login);

router.get("/self", isAuthenticated, self);

router.get("/:userId", isAuthenticated, getOneUser);

module.exports = router;
