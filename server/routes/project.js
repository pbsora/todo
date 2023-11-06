const express = require("express");
const router = express.Router();

const Capitalize = require("../tools/Capitalize");

const Project = require("../models/project");

router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.post("/new-project", async (req, res) => {
  try {
    const { name } = req.body;
    const newProject = new Project({ name: Capitalize(name) });
    await newProject.save();
    res.send({ message: "Created successfully" });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
