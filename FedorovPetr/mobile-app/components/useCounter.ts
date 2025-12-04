import { useState, useCallback } from 'react';

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount((v) => v + 1), []);
  const decrement = useCallback(() => setCount((v) => Math.max(0, v - 1)), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

