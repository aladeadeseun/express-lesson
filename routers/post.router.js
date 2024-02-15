const router = require("express").Router();

const { isAuthenticated, validatePost } = require("../middleware");
const { createPost, readPost } = require("../controller/post.controller");

router.post("/", isAuthenticated, validatePost, createPost);

router.get("/", isAuthenticated, readPost);

module.exports = router;
