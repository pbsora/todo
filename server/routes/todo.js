const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");
const Capitalize = require("../tools/Capitalize");

router.get("/all-todos", async (req, res) => {
  try {
    const todos = await Todo.find().populate("project");
    res.send(todos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-todo", async (req, res) => {
  try {
    const { title, description, dueDate, priority, complete, project } =
      req.body;
    const todo = new Todo({
      title: Capitalize(title),
      description,
      dueDate,
      priority,
      complete,
      project,
    });
    await todo.save();
    res.send({ message: "Created successfully" });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
