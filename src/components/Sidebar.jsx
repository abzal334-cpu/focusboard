import { useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  ChartColumn,
  Settings,
  X,
  Target,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Tasks", icon: ListTodo },
  { label: "Calendar", icon: CalendarDays },
  { label: "Reports", icon: ChartColumn },
  { label: "Settings", icon: Settings },
];

function Sidebar({ isOpen, onClose }) {
  // Only "Dashboard" is a real page; the other items are visual placeholders.
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="sidebar"
        className={`sidebar ${isOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <span className="brand-logo" aria-hidden="true">
            <Target size={20} />
          </span>
          <span className="brand-name">FocusBoard</span>

          <button
            type="button"
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul className="nav-list">
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  className={`nav-item ${activeItem === label ? "is-active" : ""}`}
                  aria-current={activeItem === label ? "page" : undefined}
                  onClick={() => {
                    setActiveItem(label);
                    onClose();
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-tip-title">Stay focused</p>
          <p className="sidebar-tip-text">Finish one high-priority task before lunch.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
