const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");
const Capitalize = require("../tools/Capitalize");

router.get("/all-todos", async (req, res) => {
  try {
    const todos = await Todo.find().populate("project").sort({ priority: -1 });
    res.send(todos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-todo", async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, dueDate, priority, project } = req.body;
    const todo = new Todo({
      title: Capitalize(title),
      description,
      dueDate,
      priority: parseInt(priority),
      project,
    });
    await todo.save();
    res.send({ message: "Created successfully" });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/todo-complete", async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findOne({ _id: id });
    await Todo.updateOne({ _id: id }, { $set: { complete: !todo.complete } });
    console.log(todo);
    res.send({ message: "Completed successfully" });
  } catch (error) {
    res.send({ error: "Unsuccessful" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("project");
    res.send(todo);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/delete-todo/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.send({ message: "Deleted successfully" });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/edit-todo/:id", async (req, res) => {
  try {
    const { title, description, dueDate, priority, project } = req.body;
    await Todo.updateOne(
      { _id: req.params.id },
      { $set: { title, description, dueDate, priority, project } }
    );
    res.send({ message: "Updated successfully" });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
