//mini blog
//users:- email, password, name
//
//threads:- title, body, posterid, entry_date
//comments:- body, userid, entry_date, thread_id

require("dotenv").config();
const express = require("express");
const app = express();
const { createServer } = require("http");
const port = process.env.PORT || 3000;
const userRouter = require("./routers/user-router");

app.use(express.json());

app.use("/users", userRouter);

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
