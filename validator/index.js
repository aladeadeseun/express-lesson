//ade@uk.ng
//
module.exports = {
  min(char = "", minCharLen, fieldName) {
    if (char.length < minCharLen)
      return `${fieldName} min character length is ${minCharLen}`;
    return true;
  },
  empty(char, fieldName) {
    if (!char) return `${fieldName} is required`;
    return true;
  },
  max(char, maxCharLen, fieldName) {
    if (char.length > maxCharLen)
      return `${fieldName} mac character length is ${maxCharLen}`;
    return true;
  },
  range(age, min, max, fieldName) {
    age = parseInt(age);
    if (age < min || age > max) {
      return `${fieldName} should be in the range of ${min} and ${max}`;
    }
    return true;
  },
  numeric(char = "ab123", fieldName) {
    //"1234567890"
    //
    // const parsedChar = parseInt(char);
    // if (
    //   Number.isInteger(parsedChar) &&
    //   parsedChar.toString().length == char.length
    // ) {
    //   return true;
    // }
    // return `${fieldName} must be a number`;
    // const charList = "1234567890";
    // for (let c of char) {
    //   if (charList.indexOf(c) < 0) {
    //     return `${fieldName} must be a number`;
    //   }
    // }
    // return true;

    if (/^\d{1,}$/.test(char)) {
      return true;
    }
    return `${fieldName} must be a number`;
  },
  isEmail(email = "", fieldName) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //emailRegex.test()
    //email.match()
    return emailRegex.test(email) ? true : `Invalid ${fieldName}.`;
  },

  confirmPassword(password, cfm_psd, fieldName) {
    if (password !== cfm_psd) return `${fieldName} does not match.`;
    return true;
  },
};
