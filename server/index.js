const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const projectRouter = require("./routes/project");
const todoRouter = require("./routes/todo");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.DB_URL).catch((err) => console.log(err));

app.use("/project", projectRouter);
app.use("/todo", todoRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
