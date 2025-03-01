const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task.Controller");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Ensure authMiddleware is applied

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
