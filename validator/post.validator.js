const { empty, min, max } = require(".");

const FIELD_TYPES = {
  title: 1,
  body: 2,
};

function validatorHelper(valToValidate, fieldType) {
  //const errors = {}
  let valResult,
    fieldName = "";

  switch (fieldType) {
    case FIELD_TYPES.title: {
      fieldName = "Post title";
      valResult = empty(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = min(valToValidate, 6, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = max(valToValidate, 60, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if
      return true;
    } //end case

    case FIELD_TYPES.body: {
      fieldName = "Post body";
      valResult = empty(valToValidate, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = min(valToValidate, 10, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if

      valResult = max(valToValidate, 1000, fieldName);
      if (valResult !== true) {
        return valResult;
      } //emd if
      return true;
    }
  }
}

module.exports = function (title, body) {
  let valResult = validatorHelper(title, FIELD_TYPES.title);
  const errors = {};
  if (valResult !== true) {
    errors.title = valResult;
  }

  valResult = validatorHelper(body, FIELD_TYPES.body);
  if (valResult !== true) {
    errors.body = valResult;
  }

  return Object.keys(errors).length > 0 ? errors : false;
};
