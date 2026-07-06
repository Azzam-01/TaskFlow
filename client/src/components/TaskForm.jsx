import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function TaskForm({
  fetchTasks,
  fetchStats,
  editingTask,
  setEditingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Other");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title);
    setDescription(editingTask.description);
    setStatus(editingTask.status);
    setPriority(editingTask.priority);
    setDueDate(editingTask.dueDate?.split("T")[0]);
    setCategory(editingTask.category || "Other");
  }
}, [editingTask]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingTask) {

      // UPDATE TASK
      await API.put(`/tasks/${editingTask._id}`, {
        title,
        description,
        status,
        priority,
        category,
        dueDate,
      });

      toast.success("Task Updated Successfully!");

      setEditingTask(null);

    } else {

      // CREATE TASK
      await API.post("/tasks", {
        title,
        description,
        status,
        priority,
        category,
        dueDate,
      });

      toast.success("Task Added Successfully!");
    }

    // Clear form
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");

    fetchTasks();
    fetchStats();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
  {editingTask ? "Update Task" : "Add Task"}
</button>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option>Study</option>
  <option>Work</option>
  <option>Personal</option>
  <option>Shopping</option>
  <option>Other</option>
</select>

    </form>
  );
}

export default TaskForm;