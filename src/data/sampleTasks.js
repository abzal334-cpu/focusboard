// Initial data shown to a first-time user (when nothing is saved in localStorage yet).
const sampleTasks = [
  {
    id: 101,
    title: "Complete dashboard UI design",
    description: "Finish the desktop and mobile layouts for the FocusBoard dashboard.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-25",
  },
  {
    id: 102,
    title: "Build React task components",
    description: "Create reusable TaskCard, TaskList and TaskForm components.",
    category: "Development",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-22",
  },
  {
    id: 103,
    title: "Fix API integration bug",
    description: "Investigate the failing request on the reports page and patch it.",
    category: "Development",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-27",
  },
  {
    id: 104,
    title: "Test login functionality",
    description: "Write test cases for valid, invalid and empty login inputs.",
    category: "Testing",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-28",
  },
  {
    id: 105,
    title: "Research competitor task apps",
    description: "Compare three productivity apps and list their best features.",
    category: "Research",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-20",
  },
  {
    id: 106,
    title: "Prepare UI documentation",
    description: "Document colours, typography and component usage for the team.",
    category: "Documentation",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-30",
  },
];

export default sampleTasks;
