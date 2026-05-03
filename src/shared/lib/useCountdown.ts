import { useEffect, useState } from 'react';

import { pad2 } from '@/shared/lib/format';

export interface CountdownParts {
  hours: string;
  minutes: string;
  seconds: string;
}

const getMsUntilMidnight = () => {
  const now = new Date();
  const target = new Date(now);
  target.setHours(24, 0, 0, 0);
  return Math.max(target.getTime() - now.getTime(), 0);
};

const getParts = (): CountdownParts => {
  const diff = getMsUntilMidnight();
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return {
    hours: pad2(hours),
    minutes: pad2(minutes),
    seconds: pad2(seconds),
  };
};

export function useCountdown(): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => getParts());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setParts(getParts());
    }, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  return parts;
}
