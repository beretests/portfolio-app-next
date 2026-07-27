"use client";

import { useEffect, useState } from "react";

type PageAnalyticsEvent = CustomEvent<{
  pagePath: string;
  count: number | null;
}>;

export default function BlogViewCount({ slug }: { slug: string }) {
  const pagePath = `/blog/${slug}`;
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const handleTrackedView = (event: Event) => {
      const { pagePath: trackedPath, count: trackedCount } = (
        event as PageAnalyticsEvent
      ).detail;

      if (trackedPath === pagePath && typeof trackedCount === "number") {
        setCount(trackedCount);
      }
    };

    window.addEventListener("page-analytics", handleTrackedView);

    fetch(`/api/track?page=${encodeURIComponent(pagePath)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return;
        const data = await response.json();
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch((error) => {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to load blog view count");
        }
      });

    return () => {
      controller.abort();
      window.removeEventListener("page-analytics", handleTrackedView);
    };
  }, [pagePath]);

  if (count === null) return null;

  return (
    <>
      <span aria-hidden>·</span>
      <span>
        {count.toLocaleString()} unique {count === 1 ? "view" : "views"}
      </span>
    </>
  );
}
