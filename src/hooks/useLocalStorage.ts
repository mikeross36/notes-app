import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(storedValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
}
