const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Check if title is provided
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    // Create task
    const task = await Task.create({
  title,
  description,
  status,
  priority,
  dueDate,
  user: req.user._id,
});

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get all tasks of logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update a task
const updateTask = async (req, res) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete a task
const deleteTask = async (req, res) => {
  try {
    // Find the task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get dashboard statistics
const getTaskStats = async (req, res) => {
  try {
    const total = await Task.countDocuments({
      user: req.user._id,
    });

    const pending = await Task.countDocuments({
      user: req.user._id,
      status: "Pending",
    });

    const inProgress = await Task.countDocuments({
      user: req.user._id,
      status: "In Progress",
    });

    const completed = await Task.countDocuments({
      user: req.user._id,
      status: "Completed",
    });

    const highPriority = await Task.countDocuments({
      user: req.user._id,
      priority: "High",
    });

    res.status(200).json({
      total,
      pending,
      inProgress,
      completed,
      highPriority,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
};