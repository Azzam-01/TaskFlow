function DueAlerts({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueToday = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") return false;

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due.getTime() === today.getTime();
  });

  const overdue = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") return false;

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  });

  if (dueToday.length === 0 && overdue.length === 0) {
    return null;
  }

  return (
    <div className="alerts-container">

      {overdue.length > 0 && (
        <div className="alert overdue">
          ❌ {overdue.length} Overdue Task{overdue.length > 1 ? "s" : ""}
        </div>
      )}

      {dueToday.length > 0 && (
        <div className="alert today">
          ⚠️ {dueToday.length} Task{dueToday.length > 1 ? "s" : ""} Due Today
        </div>
      )}

    </div>
  );
}

export default DueAlerts;