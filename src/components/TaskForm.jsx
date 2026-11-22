import { useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import { STATUSES, PRIORITIES, CATEGORIES } from "../data/constants";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Design",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.title.trim()) errors.title = "Please enter a task title.";
  else if (values.title.trim().length > 100)
    errors.title = "Title must be 100 characters or fewer.";
  if (!STATUSES.includes(values.status)) errors.status = "Please choose a status.";
  if (!PRIORITIES.includes(values.priority)) errors.priority = "Please choose a priority.";
  if (!values.dueDate) errors.dueDate = "Please choose a due date.";
  return errors;
};

/**
 * One form for both creating and editing.
 * If `task` is passed, the form is in edit mode and starts with that task's values.
 */
function TaskForm({ task, onSubmit, onCancel }) {
  const isEditing = Boolean(task);
  const [values, setValues] = useState(() => (task ? { ...EMPTY_FORM, ...task } : EMPTY_FORM));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    // Clear the error of a field as soon as the user fixes it
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      const firstInvalid = Object.keys(foundErrors)[0];
      document.getElementById(`task-${firstInvalid}`)?.focus();
      return;
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    });
  };

  const fieldProps = (name) => ({
    id: `task-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `task-${name}-error` : undefined,
  });

  const renderError = (name) =>
    errors[name] ? (
      <p id={`task-${name}-error`} className="field-error" role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <Modal titleId="task-form-title" onClose={onCancel}>
      <div className="modal-header">
        <div>
          <h2 id="task-form-title">{isEditing ? "Edit task" : "Create new task"}</h2>
          <p className="modal-subtitle">
            {isEditing
              ? "Update the details of this task."
              : "Fill in the details below to add a task to your board."}
          </p>
        </div>
        <button type="button" className="icon-button" onClick={onCancel} aria-label="Close form">
          <X size={20} />
        </button>
      </div>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="task-title">
            Title <span className="required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Complete UI design"
            required
            data-autofocus
            {...fieldProps("title")}
          />
          {renderError("title")}
        </div>

        <div className="field">
          <label htmlFor="task-description">Description</label>
          <textarea rows={4} placeholder="Add more details (optional)" {...fieldProps("description")} />
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="task-category">Category</label>
            <select className="select" {...fieldProps("category")}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-dueDate">
              Due date <span className="required" aria-hidden="true">*</span>
            </label>
            <input type="date" required {...fieldProps("dueDate")} />
            {renderError("dueDate")}
          </div>

          <div className="field">
            <label htmlFor="task-status">
              Status <span className="required" aria-hidden="true">*</span>
            </label>
            <select className="select" required {...fieldProps("status")}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {renderError("status")}
          </div>

          <div className="field">
            <label htmlFor="task-priority">
              Priority <span className="required" aria-hidden="true">*</span>
            </label>
            <select className="select" required {...fieldProps("priority")}>
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {renderError("priority")}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            {isEditing ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskForm;
