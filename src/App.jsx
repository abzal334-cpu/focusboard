import { useMemo, useState } from "react";
import { ListTodo, Clock, CircleCheck, Percent, Plus } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/Statcard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";

import sampleTasks from "./data/sampleTasks";
import { STATUSES, STORAGE_KEY } from "./data/constants";
import useLocalStorage from "./hooks/useLocalStorage";

// Only accept saved data that looks like a list of tasks.
const isValidTaskList = (data) =>
  Array.isArray(data) &&
  data.every(
    (task) =>
      task &&
      task.id !== undefined &&
      typeof task.title === "string" &&
      STATUSES.includes(task.status)
  );

const createId = () => `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function App() {
  // Single source of truth: the full task list (persisted in localStorage).
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks, isValidTaskList);

  // UI state
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [form, setForm] = useState({ isOpen: false, task: null }); // task = null -> create mode
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ---------- Derived values (never stored, always calculated) ----------
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((task) => task.status === "In progress").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const toDo = tasks.filter((task) => task.status === "To do").length;
    const completion = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, toDo, completion };
  }, [tasks]);

  // Search and priority are applied first, so the tab counts match what the user is looking at.
  const searchedTasks = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(query);
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchText, priorityFilter]);

  const visibleTasks = useMemo(
    () =>
      statusFilter === "All"
        ? searchedTasks
        : searchedTasks.filter((task) => task.status === statusFilter),
    [searchedTasks, statusFilter]
  );

  const tabCounts = useMemo(() => {
    const counts = { All: searchedTasks.length };
    STATUSES.forEach((status) => {
      counts[status] = searchedTasks.filter((task) => task.status === status).length;
    });
    return counts;
  }, [searchedTasks]);

  const filtersActive = searchText !== "" || statusFilter !== "All" || priorityFilter !== "All";

  // ---------- Task operations (all immutable updates) ----------
  const openCreateForm = () => setForm({ isOpen: true, task: null });
  const openEditForm = (task) => setForm({ isOpen: true, task });
  const closeForm = () => setForm({ isOpen: false, task: null });

  const handleSaveTask = (values) => {
    if (form.task) {
      // Edit: replace only the selected task and keep its original id
      setTasks((previous) =>
        previous.map((task) => (task.id === form.task.id ? { ...task, ...values, id: task.id } : task))
      );
    } else {
      // Create: add the new task at the top of the list
      setTasks((previous) => [{ ...values, id: createId() }, ...previous]);
    }
    closeForm();
  };

  const handleStatusChange = (taskId, status) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const handleConfirmDelete = () => {
    setTasks((previous) => previous.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="app-main">
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
          onAddTask={openCreateForm}
          isMenuOpen={isMenuOpen}
        />

        <main id="main-content" className="content">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="section-title">
              Overview
            </h2>
            <div className="stats-grid">
              <StatCard
                title="Total tasks"
                value={stats.total}
                icon={ListTodo}
                tone="purple"
                helper={`${stats.toDo} still to do`}
              />
              <StatCard
                title="In progress"
                value={stats.inProgress}
                icon={Clock}
                tone="orange"
                helper="Tasks being worked on"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={CircleCheck}
                tone="green"
                helper="Tasks finished"
              />
              <StatCard
                title="Completion"
                value={`${stats.completion}%`}
                icon={Percent}
                tone="blue"
                progress={stats.completion}
              />
            </div>
          </section>

          <FocusNotes />

          <section className="tasks-panel" aria-labelledby="tasks-heading">
            <div className="tasks-panel-header">
              <div>
                <h2 id="tasks-heading" className="section-title">
                  My Tasks
                </h2>
                <p className="section-subtitle" aria-live="polite">
                  Showing {visibleTasks.length} of {tasks.length} tasks
                </p>
              </div>
              <div className="tasks-panel-tools">
                <SearchBar value={searchText} onChange={setSearchText} />
                <button type="button" className="button button-primary" onClick={openCreateForm}>
                  <Plus size={18} aria-hidden="true" />
                  Add Task
                </button>
              </div>
            </div>

            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              counts={tabCounts}
              canReset={filtersActive}
              onReset={resetFilters}
            />

            <TaskList
              tasks={visibleTasks}
              hasAnyTasks={tasks.length > 0}
              onEdit={openEditForm}
              onDelete={setTaskToDelete}
              onStatusChange={handleStatusChange}
              onAddTask={openCreateForm}
            />
          </section>
        </main>
      </div>

      {form.isOpen && (
        <TaskForm
          key={form.task ? form.task.id : "new"}
          task={form.task}
          onSubmit={handleSaveTask}
          onCancel={closeForm}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          taskTitle={taskToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;
