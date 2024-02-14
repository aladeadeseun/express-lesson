require("dotenv").config();
const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000;
const validator = require("./validator");

function validateFirstname(firstname) {
  let fieldName = "Firstname";

  let valResult = validator.empty(firstname, fieldName);
  if (valResult !== true) {
    return valResult;
  }

  valResult = validator.min(firstname, 3, fieldName);
  if (valResult !== true) {
    return valResult;
  }

  valResult = validator.max(firstname, 50, fieldName);
  if (valResult !== true) {
    return valResult;
  }
  return true;
}

app.use(express.json());

app.post(
  "/users",
  function (req, res, next) {
    const { firstname, lastname, middlename, email, username, age } = req.body;
    const errors = {};

    let valResult = validateFirstname(firstname);

    if (valResult !== true) {
      errors.firstname = valResult;
    }

    //start validating age
    fieldName = "Age";
    valResult = validator.empty(age, fieldName);
    if (valResult !== true) {
      errors.age = valResult;
    }

    if (!errors.age) {
      valResult = validator.min(age, 1, fieldName);
      if (valResult !== true) {
        errors.age = valResult;
      }
    }

    if (!errors.age) {
      valResult = validator.max(age, 3, fieldName);
      if (valResult !== true) {
        errors.age = valResult;
      }
    }

    if (!errors.age) {
      valResult = validator.numeric(age, fieldName);
      if (valResult !== true) {
        errors.age = valResult;
      }
    }

    if (!errors.age) {
      valResult = validator.range(age, 18, 65, fieldName);
      if (valResult !== true) {
        errors.age = valResult;
      }
    }

    valResult = validator.isEmail(email, "Email");

    if (valResult !== true) {
      errors.email = valResult;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        data: null,
        errors,
        msg: "Error in input, make changes and try again.",
      });
    }

    next();
  },
  function (req, res, next) {
    console.log("Data saved.");
    res.status(201).json({ success: true, msg: "Data saved successfully." });
  }
);

app.use((_req, _res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  //error.status =
  res.status(error.status || 500).json({ success: false, msg: error.message });
});

createServer(app).listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});
