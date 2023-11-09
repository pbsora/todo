const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, default: Date.now },
  priority: { type: Number, required: true },
  complete: { type: Boolean, default: false },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = new mongoose.model("Todo", Todo);
