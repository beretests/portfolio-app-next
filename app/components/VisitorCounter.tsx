// components/VisitorCounter.tsx
"use client";

import { useState, useEffect } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCount = async () => {
      try {
        const response = await fetch("/api/track", {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to load visitor count");
        }
      }
    };

    fetchCount();
    return () => controller.abort();
  }, []);

  if (count === null) return null;

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-borderSecondary bg-background/70 px-3 py-1.5 font-[family-name:var(--font-cta)] text-sm font-semibold text-foreground/70 shadow-sm backdrop-blur-sm">
      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
      {count.toLocaleString()} unique site {count === 1 ? "visitor" : "visitors"}
    </p>
  );
}
