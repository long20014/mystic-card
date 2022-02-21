import { useRef, useEffect } from 'react';

export function usePrevious(value, initialValue) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
