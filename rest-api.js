require("dotenv").config();
const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000;

const personController = require("./controller/person.controller");

app.use(express.json());

const authenticateUser = (req, res, next) => {
  req.login = true;
  next();
};

const authenticatedUser = (req, res, next) => {
  if (req.login) {
    next();
  } else {
    res
      .status(403)
      .send({ success: false, msg: "You need to login to access this path." });
  }
};

//console.log(process.env.PORT);

app.use("/testing", function (req, res, next) {
  req.msg = "Global middleware for get method";
  next();
});

app.get("/auth", authenticateUser, authenticatedUser, (req, res) => {
  res
    .status(200)
    .json({ success: true, data: [{ name: "Ola" }, { name: "Olu" }] });
});

app.get("/testing", (req, res) => {
  res.end(req.msg);
});

//person routes start here
app.get("/persons", personController.getPerson);
app.post("/persons", personController.postPerson);
//pagination
//difference patch and put
//implement deletion of resource
//app.hghghg("/persons/:first/:limit");
//patch or put
app.patch(
  "/persons/:person_id/comment/:comment_id",
  personController.patchPerson
);

//app.patch("update/:person_id/comments/:comment_id")
//person routes end here

app.get("/", function (req, res) {
  //req.msg = "Global middleware for get method";
  res.status(200).json({ success: true, msg: req.msg });
});

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

// app.listen(port, function () {
//   console.log(`listening on http://localhost:${port}`);
// });
