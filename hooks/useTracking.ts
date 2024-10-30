// hooks/useTracking.ts
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackPageView = async () => {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageUrl: pathname + searchParams.toString(),
          referrer: document.referrer,
          //   userAgent: navigator.userAgent,
          // IP address should be collected server-side for accuracy
        }),
      });

      if (!response.ok) {
        console.error("Failed to track page view");
      }
    };

    trackPageView();
  }, [pathname, searchParams]);
}
