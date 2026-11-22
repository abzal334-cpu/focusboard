export const STATUSES = ["To do", "In progress", "Completed"];

export const PRIORITIES = ["Low", "Medium", "High"];

export const CATEGORIES = ["Design", "Development", "Testing", "Research", "Documentation"];

export const STORAGE_KEY = "focusboard_tasks";

// Turns "In progress" into "in-progress" so it can be used as a CSS class.
export const toClassName = (value) => value.toLowerCase().replace(/\s+/g, "-");
