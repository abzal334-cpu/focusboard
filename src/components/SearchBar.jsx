import { Search, X } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search" className="sr-only">
        Search tasks by title
      </label>
      <Search size={18} className="search-icon" aria-hidden="true" />
      <input
        id="task-search"
        type="search"
        placeholder="Search tasks..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
