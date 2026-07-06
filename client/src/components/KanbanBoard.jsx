import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import API from "../services/api";
function KanbanBoard({ tasks, fetchTasks, fetchStats }) {
  const pending = tasks.filter((task) => task.status === "Pending");
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  );
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );
const onDragEnd = async (result) => {
  if (!result.destination) return;

  const newStatus = result.destination.droppableId;
  const taskId = result.draggableId;

  try {
    await API.put(`/tasks/${taskId}`, {
      status: newStatus,
    });

    fetchTasks();
    fetchStats();
  } catch (error) {
    console.error(error);
  }
};
  const renderColumn = (title, tasks) => (
    <div className="kanban-column">
      <h3>{title}</h3>

      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="kanban-card">
            <h4>{task.title}</h4>

            <p>{task.priority}</p>

            {task.dueDate && (
              <small>
                📅{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="kanban-board">
      {renderColumn("Pending", pending)}
      {renderColumn("In Progress", inProgress)}
      {renderColumn("Completed", completed)}
    </div>
  );
}

export default KanbanBoard;