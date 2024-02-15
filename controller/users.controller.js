const { users } = require("../db/db");
const util = require("../db/util");
const session = require("../session/session");

module.exports = {
  async registerUser(req, res) {
    //const data = Object.create(req.body);
    //const { email, name } = req.body
    //data.id = 1;
    return res.status(201).json({
      success: true,
      msg: "User registration successful",
      data: await users.create(req.body),
      //{ ...req.body, id: 1 },
    });
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ success: false, msg: "Invalid login detail." });
    }

    const user = await users.findBy("email", email);
    if (!user) {
      return res
        .status(422)
        .json({ success: false, msg: "Invalid login detail." });
    }

    if (user.password !== password) {
      return res
        .status(422)
        .json({ success: false, msg: "Invalid login detail." });
    }

    const token = util.generateRandomId();

    session.putUserId(token, user.id);

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        auth_token: {
          token,
          expires_after: Date.now() + 60 * 60 * 1000,
        },
      },
    });
  },

  async self(req, res) {
    const user = await users.findBy("id", req.userId);
    delete user.password;
    return res.status(200).json({ success: true, data: user });
  },

  async getOneUser(req, res) {
    const user = await users.findBy("id", req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "Not found." });
    }
    delete user.password;
    return res.status(200).json({ success: true, data: user });
  },
};
