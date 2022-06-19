require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");

var cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(courseRouter);

app.listen(port, () => {
  console.log("Welcome Courses App Server, It is up on port " + port);
});
