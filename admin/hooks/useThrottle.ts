import { useEffect, useRef, useState } from "react";

export function useThrottle(value: any, limit: number) {
  const lastRan = useRef(Date.now());
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const handler = () => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    };

    const interval = setInterval(handler, limit);

    return () => {
      clearInterval(interval);
    };
  }, [value, limit]);

  return throttledValue;
}
