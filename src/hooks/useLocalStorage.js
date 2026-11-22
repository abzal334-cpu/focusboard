import { useEffect, useState } from "react";

/**
 * Works like useState, but keeps the value in localStorage.
 * - On first load it reads the saved value; if there is none (or it is invalid)
 *   it falls back to initialValue, so sample data never overwrites saved data.
 * - Every time the value changes it is written back to localStorage.
 */
function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved === null) return initialValue;

      const parsed = JSON.parse(saved);
      return isValid(parsed) ? parsed : initialValue;
    } catch {
      // Corrupted JSON or storage unavailable (e.g. private mode)
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the app keeps working in memory.
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
