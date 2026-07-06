import Swal from "sweetalert2";
import TaskModal from "../components/TaskModal";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import StatsCards from "../components/StatsCards";
import API from "../services/api";
import { toast } from "react-toastify";
import TaskChart from "../components/TaskChart";
import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";
import TaskCalendar from "../components/TaskCalendar";
import DueAlerts from "../components/DueAlerts";
import KanbanBoard from "../components/KanbanBoard";
import ProgressBar from "../components/ProgressBar";
import Footer from "../components/Footer";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    highPriority: 0,
  });
  const [filter, setFilter] = useState("All");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const filteredTasks = tasks
  .filter((task) => {
    const statusMatch =
      filter === "All" || task.status === filter;

    const searchMatch = (
      task.title + " " + task.description
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    return statusMatch && searchMatch;
  })
  .sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);

    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);

    if (sortBy === "priority") {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (sortBy === "dueDate")
      return new Date(a.dueDate) - new Date(b.dueDate);

    return 0;
  }); 
  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  // Edit Task
  const editTask = (task) => {
    setEditingTask(task);
  };

  // Delete Task
  const deleteTask = async (id) => {
  const result = await Swal.fire({
    title: "Delete Task?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(`/tasks/${id}`);

    Swal.fire({
      title: "Deleted!",
      text: "Task deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchTasks();
    fetchStats();

  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to delete task.",
      icon: "error",
    });
  }
};

  return (
    <>
      <Navbar />
      <div className="dashboard-header">
  <h1>Hello, {user?.name || "User"} 👋</h1>
 
  <p className="welcome-text">
    Welcome back! Here's your productivity overview.
  </p>
</div>

      <div className="dashboard">

        <StatsCards stats={stats} />
        <ProgressBar stats={stats} />
        <TaskChart stats={stats} />
        <DueAlerts tasks={tasks} />
        <KanbanBoard tasks={tasks} />
        <div className="calendar-section">

  <button
    className="calendar-toggle"
    onClick={() => setShowCalendar(!showCalendar)}
  >
    {showCalendar ? "📅 Hide Calendar ▲" : "📅 Show Calendar ▼"}
  </button>

  {showCalendar && (
    <TaskCalendar tasks={tasks} />
    
  )}

</div>
        
        <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>
<div className="sort-container">
  <label>Sort By: </label>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="priority">Priority</option>
    <option value="dueDate">Due Date</option>
  </select>
</div>
        <div className="filter-buttons">

  <button onClick={() => setFilter("All")}>All</button>

  <button onClick={() => setFilter("Pending")}>Pending</button>

  <button onClick={() => setFilter("In Progress")}>In Progress</button>

  <button onClick={() => setFilter("Completed")}>Completed</button>

</div>
        <TaskForm
          fetchTasks={fetchTasks}
          fetchStats={fetchStats}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <div className="dashboard-header">
  <h1>My Tasks</h1>

  <button
    className="export-btn"
    onClick={() => exportPDF(tasks)}
  >
    📄 Export PDF
  </button>
  <button
  className="excel-btn"
  onClick={() => exportExcel(tasks)}
>
  📊 Export Excel
</button>
</div>

       {filteredTasks.length === 0 ? (
         <div className="empty-state">
  <h2>📋</h2>
  <h3>No Tasks Found</h3>
  <p>Create your first task or change the filters.</p>
</div>
        ) : (
          filteredTasks.map((task) => (
            <div
  key={task._id}
  className={`task-card priority-${task.priority.toLowerCase()}`}
  onClick={() => setSelectedTask(task)}
>
<h3>{task.title}</h3>

<p className="task-description">{task.description}</p>

<div className="task-details">

  <div className="task-row">
    <span className="label">Category :</span>

    <span className={`category ${task.category?.toLowerCase() || "other"}`}>
      {task.category || "Other"}
    </span>
  </div>

  <div className="task-row">
    <span className="label">Status :</span>

    <span
      className={`status ${task.status
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {task.status}
    </span>
  </div>

  <div className="task-row">
    <span className="label">Due Date :</span>

    <span className="due-date">
      {task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "No Due Date"}
    </span>
  </div>

  <div className="task-row">
    <span className="label">Priority :</span>

    <span className={`priority ${task.priority.toLowerCase()}`}>
      {task.priority}
    </span>
  </div>

</div>

              <div className="task-actions">

                <button
  className="edit-btn"
  onClick={(e) => {
    e.stopPropagation();
    editTask(task);
  }}
>
  Edit
</button>

                <button
  className="delete-btn"
  onClick={(e) => {
    e.stopPropagation();
    deleteTask(task._id);
  }}
>
  Delete
</button>

              </div>

            </div>
          ))
        )}

      </div>
      <TaskModal
  task={selectedTask}
  onClose={() => setSelectedTask(null)}
/>
<Footer />
    </>
    
  );
  
}

export default Dashboard;