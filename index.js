//console.log("Howdy");
const express = require("express");
const app = express();
//const {read} = require("fs")
const { readFile } = require("node:fs/promises");
const { join } = require("node:path");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public", { extensions: ["html"], fallthrough: true }));
//
//app.use(express.static("public/css"));

app.post("/user/register", (req, res) => {
  console.log(req.body);

  return res
    .status(201)
    .json({ success: true, msg: "Registration successful", data: req.body });
});

const upload = (req, res, next) => {
  //res.end("testing controller");
  //res.json()
  //res.send({ success: true });
  //res.send("string");
  req.mid = 1;
  next();
};

app.get("/testing", upload, (req, res) => {
  res.send({ passs: req.mid });
});
//app

//app.get("/", express.static("html"));

app.use((req, res, next5) => {
  //req.not_found = true;
  const error = new Error("Not Found");
  //error.not_found = true;
  //next(error);

  throw new Error(error);
});

app.use(async (error, req, res, next) => {
  let errorPath = "";
  if (error.not_found) {
    errorPath = join(__dirname, "html", "not-found.html");
  } else {
    errorPath = join(__dirname, "html", "server-error.html");
  }
  //console.log(error);
  // error.status = error.status || 500;
  // //res.status(error.status).end(error.message);
  // res.status(error.status).json({
  //   success: false,
  //   msg: "The path you are trying to access does not exists",
  // });
  const content = await readFile(errorPath, {
    encoding: "utf8",
  });
  res.send(content);
  //next(new Error("Not Found111111111"));
});

app.listen(8081, () => console.log("listening at 127.0.0.1:8081"));
