import { Bell, Menu, Plus } from "lucide-react";

function Header({ onMenuClick, onAddTask, isMenuOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="icon-button menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="sidebar"
          aria-expanded={isMenuOpen}
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="breadcrumb">Home / Dashboard</p>
          <h1 className="page-title">My Tasks Overview</h1>
        </div>
      </div>

      <div className="topbar-right">
        <button type="button" className="button button-primary add-task-top" onClick={onAddTask}>
          <Plus size={18} aria-hidden="true" />
          <span>Add Task</span>
        </button>

        <button type="button" className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="avatar" role="img" aria-label="User profile">
          FB
        </div>
      </div>
    </header>
  );
}

export default Header;
