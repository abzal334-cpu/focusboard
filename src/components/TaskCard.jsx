import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { STATUSES, toClassName } from "../data/constants";

// "2026-11-25" -> "25 Nov 2026" (parsed as a local date to avoid timezone shifts)
const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isOverdue = (task) => {
  if (task.status === "Completed") return false;
  const [year, month, day] = task.dueDate.split("-").map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month - 1, day) < today;
};

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusId = `status-${task.id}`;
  const overdue = isOverdue(task);

  return (
    <li className={`task-row ${task.status === "Completed" ? "is-completed" : ""}`}>
      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      <div className="task-meta">
        <span className="chip">{task.category}</span>
        <span className={`priority-badge priority-${toClassName(task.priority)}`}>
          <span className="sr-only">Priority: </span>
          {task.priority}
        </span>
        <span className={`due-date ${overdue ? "is-overdue" : ""}`}>
          <CalendarDays size={16} aria-hidden="true" />
          <span className="sr-only">Due date: </span>
          {formatDate(task.dueDate)}
          {overdue && <span className="overdue-text">Overdue</span>}
        </span>
      </div>

      <div className="task-status">
        <label htmlFor={statusId} className="sr-only">
          Change status of {task.title}
        </label>
        <select
          id={statusId}
          className={`status-select status-${toClassName(task.status)}`}
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          className="icon-button icon-button-danger"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
