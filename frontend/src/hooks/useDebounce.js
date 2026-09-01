import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value changes (e.g. search input query)
 * Prevents triggering excessive API requests on every keystroke
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
