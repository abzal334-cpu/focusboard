import { Inbox } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, hasAnyTasks, onEdit, onDelete, onStatusChange, onAddTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <Inbox size={40} aria-hidden="true" />
        <h3>{hasAnyTasks ? "No matching tasks" : "No tasks yet"}</h3>
        <p>
          {hasAnyTasks
            ? "Try a different search term or reset the filters."
            : "Create your first task to get started."}
        </p>
        {!hasAnyTasks && (
          <button type="button" className="button button-primary" onClick={onAddTask}>
            Add Task
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="task-list-head" aria-hidden="true">
        <span>Task</span>
        <span>Details</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
