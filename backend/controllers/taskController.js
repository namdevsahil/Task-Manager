module.exports = (io) => {
  const Task = require("../models/Task");

  // ✅ Create Task - Logged-in User Only
  exports.createTask = async (req, res) => {
    try {
      const { title, description, dueDate } = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      const task = new Task({
        user: req.user.id,
        title,
        description,
        dueDate,
        status: "pending", // Default status
      });

      await task.save();

      io.emit("taskCreated", task); // 🔹 Notify all clients in real-time

      res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  // ✅ Get Tasks - Show Only User’s Tasks (with Optional Status Filtering)
  exports.getTasks = async (req, res) => {
    try {
      const filter = { user: req.user.id };

      if (req.query.status) {
        filter.status = req.query.status;
      }

      const tasks = await Task.find(filter);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  // ✅ Update Task - Only if it Belongs to the User
  exports.updateTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task || task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this task" });
      }

      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.dueDate = req.body.dueDate || task.dueDate;
      
      // Only update status if provided
      if (req.body.status) {
        task.status = req.body.status;
      }

      await task.save();

      io.emit("taskUpdated", task); // 🔹 Notify all clients in real-time

      res.json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  // ✅ Delete Task - Only if it Belongs to the User
  exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task || task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this task" });
      }

      await task.deleteOne();

      io.emit("taskDeleted", task._id); // 🔹 Notify all clients in real-time

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  return exports;
};
