import { RotateCcw } from "lucide-react";
import { STATUSES, PRIORITIES } from "../data/constants";

function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts,
  canReset,
  onReset,
}) {
  const tabs = ["All", ...STATUSES];

  return (
    <div className="filters">
      <div className="status-tabs" role="group" aria-label="Filter tasks by status">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab ${statusFilter === tab ? "is-active" : ""}`}
            aria-pressed={statusFilter === tab}
            onClick={() => onStatusChange(tab)}
          >
            {tab}
            <span className="tab-count">{counts[tab] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="filter-actions">
        <label htmlFor="priority-filter" className="sr-only">
          Filter tasks by priority
        </label>
        <select
          id="priority-filter"
          className="select"
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="All">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority} priority
            </option>
          ))}
        </select>

        {canReset && (
          <button type="button" className="button button-ghost" onClick={onReset}>
            <RotateCcw size={16} aria-hidden="true" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterTabs;
