const { isEmail, empty, min, confirmPassword, max } = require(".");
const db = require("../db/db");

const FIELD_TYPES = {
  email: 1,
  name: 2,
  password: 3,
  //cfm_psd: 4
};

async function validatorHelper(valToValidate, fieldType) {
  //const errors = {}
  let valResult,
    fieldName = "";

  switch (fieldType) {
    case FIELD_TYPES.email: {
      fieldName = "Email";
      valResult = empty(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = min(valToValidate, 6, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = max(valToValidate, 40, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = isEmail(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if
      const user = await db.users.findBy("email", valToValidate);
      console.log(user);
      if (user) {
        return `${user.email} is already taken, Please use another email.`;
      }
      return true;
    } //end case

    case FIELD_TYPES.name: {
      fieldName = "Name";
      valResult = empty(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = min(valToValidate, 6, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = max(valToValidate, 100, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if
      return true;
    }

    case FIELD_TYPES.password: {
      fieldName = "Password";
      valResult = empty(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = min(valToValidate, 6, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = max(valToValidate, 30, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if
      return true;
    }
  }
}

module.exports = async function (email, name, password, cfm_psd) {
  let valResult = await validatorHelper(email, FIELD_TYPES.email);
  const errors = {};
  if (valResult !== true) {
    errors.email = valResult;
  }

  valResult = await validatorHelper(name, FIELD_TYPES.name);
  if (valResult !== true) {
    errors.name = valResult;
  }

  valResult = await validatorHelper(password, FIELD_TYPES.password);
  if (valResult !== true) {
    errors.password = valResult;
  } else {
    valResult = confirmPassword(password, cfm_psd, "Password");
    if (valResult !== true) {
      errors.password = valResult;
    }
  }
  console.log(errors);
  return Object.keys(errors).length > 0 ? errors : false;
};
