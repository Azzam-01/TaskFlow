const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// Create Task
// Get all tasks
router.put("/:id", protect, updateTask);
router.get("/stats", protect, getTaskStats);
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.delete("/:id", protect, deleteTask);
module.exports = router;