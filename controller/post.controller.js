const { posts } = require("../db/db");

module.exports = {
  async createPost(req, res) {
    const { body, title } = req.body;
    //const post = ;
    return res.status(201).json({
      success: true,
      msg: "Post created.",
      data: await posts.create({ body, title, posterId: req.userId }),
    });
  },
  async readPost(req, res) {
    return res.status(201).json({
      success: true,
      msg: "Post created.",
      data: await posts.read(),
    });
  },
};
