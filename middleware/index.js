const userRegistrationValidator = require("../validator/user-reg");
module.exports = {
  isAuthenticated(req, res, next) {},
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
};
