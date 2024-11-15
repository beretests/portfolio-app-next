// components/VisitorCounter.tsx
"use client";

import { useState, useEffect } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const response = await fetch("/api/track");
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return <div>Unique Visitors: {count}</div>;
}
