const session = require("../session/session");
const userRegistrationValidator = require("../validator/user.validator");
const postValidator = require("../validator/post.validator");

module.exports = {
  isAuthenticated(req, res, next) {
    const token = req.query.token;
    if (!token) {
      return res.status(403).json({
        success: false,
        msg: "You need to login to access this route.",
      });
    }
    const userId = session.getUserId(token);
    if (!userId) {
      return res.status(403).json({
        success: false,
        msg: "You need to login to access this route.",
      });
    }
    req.userId = userId;
    next();
  },
  async validateUserRegistration(req, res, next) {
    const { email, name, password, cfm_psd } = req.body;
    const valResult = await userRegistrationValidator(
      email,
      name,
      password,
      cfm_psd
    );

    if (valResult !== false) {
      return res.status(422).json({
        success: false,
        msg: "You have error in your input",
        errors: valResult,
      });
    }
    next();
  },

  validatePost(req, res, next) {
    const { title, body } = req.body;
    const valResult = postValidator(title, body);

    //console.log(valResult);

    if (valResult !== false) {
      return res.status(422).json({
        success: false,
        msg: "You have error in your input",
        errors: valResult,
      });
    }
    next();
  },
};
