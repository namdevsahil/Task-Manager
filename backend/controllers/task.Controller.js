const mongoose = require("mongoose");
const Task = require("../models/Task");

// ✅ Create a Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    console.log("🔍 Logged-in User ID (before saving):", req.user.id);

    const task = new Task({
      user: new mongoose.Types.ObjectId(req.user.id), // Ensure ObjectId
      title,
      description,
      dueDate,
    });

    await task.save();
    console.log("✅ Task Created:", task);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("❌ Task Creation Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    console.log("🔍 Fetching tasks for User ID:", req.user.id);

    // Ensure we query using ObjectId
    const tasks = await Task.find({ user: new mongoose.Types.ObjectId(req.user.id) });

    if (tasks.length === 0) {
      console.log("❌ No tasks found for user:", req.user.id);
      return res.status(404).json({ message: "No tasks found" });
    }

    console.log("✅ Tasks found:", tasks); // Log tasks
    res.json(tasks);
  } catch (error) {
    console.error("❌ Error Fetching Tasks:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// ✅ Update a Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete a Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
