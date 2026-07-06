function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{task.title}</h2>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{task.description || "No description"}</p>

        <hr />

        <p>
          <strong>Status:</strong> {task.status}
        </p>

        <p>
          <strong>Priority:</strong> {task.priority}
        </p>

        <p>
          <strong>Due Date:</strong>{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-GB")
            : "No Due Date"}
        </p>

        <button
          className="close-modal-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TaskModal;