"use client";

import { useEffect, useState } from "react";
import { TEST_DURATION_SECS } from "@/lib/constants";

interface TestTimerProps {
  startedAt: string;
  onExpire: () => void;
}

export function TestTimer({ startedAt, onExpire }: TestTimerProps) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const calc = () => {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      return Math.max(0, TEST_DURATION_SECS - elapsed);
    };

    setRemaining(calc());
    const interval = setInterval(() => {
      const r = calc();
      setRemaining(r);
      if (r === 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, onExpire]);

  const hours = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  const urgent = remaining < 600; // last 10 min

  return (
    <div className={`font-mono text-lg font-bold ${urgent ? "text-red-600 animate-pulse" : "text-gray-700"}`}>
      {String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
