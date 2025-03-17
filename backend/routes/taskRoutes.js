module.exports = (io) => {
    const express = require("express");
    const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController")(io);
    const authMiddleware = require("../middleware/authMiddleware");
  
    const router = express.Router();
  
    router.post("/create", authMiddleware, createTask);
    router.get("/", authMiddleware, getTasks);
    router.put("/:id", authMiddleware, updateTask);
    router.delete("/:id", authMiddleware, deleteTask);
  
    return router;
  };
  