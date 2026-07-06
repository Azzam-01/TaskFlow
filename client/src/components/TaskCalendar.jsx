import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
function EventDot({ event }) {
  let color = "#3b82f6";

  if (event.status === "Pending") color = "#f59e0b";
  if (event.status === "In Progress") color = "#3b82f6";
  if (event.status === "Completed") color = "#10b981";

  return (
    <div
      title={event.title}
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: color,
        margin: "1px auto",
      }}
    />
  );
}
function TaskCalendar({ tasks }) {
  const events = tasks
  .filter((task) => task.dueDate)
  .map((task) => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    status: task.status,
    priority: task.priority,
    description: task.description,
  }));

  return (
    <div
  style={{
    height: "500px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "30px",
    marginBottom: "40px",
  }}
>
      <h2 style={{ marginBottom: "20px" }}>📅 Task Calendar</h2>

      <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  popup
  components={{
  event: EventDot,
}}
  eventPropGetter={(event) => {
    let backgroundColor = "#3b82f6";

    if (event.status === "Pending") {
      backgroundColor = "#f59e0b";
    }

    if (event.status === "In Progress") {
      backgroundColor = "#3b82f6";
    }

    if (event.status === "Completed") {
      backgroundColor = "#10b981";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "6px",
        border: "none",
      },
    };
  }}
/>
    </div>
  );
}

export default TaskCalendar;