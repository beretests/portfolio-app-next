"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let currentSessionId = sessionStorage.getItem("sessionId");
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", currentSessionId);
    }
    setSessionId(currentSessionId);

    const trackPageView = async () => {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageUrl: pathname + searchParams.toString(),
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          sessionId: currentSessionId,
          // Add other client-side collected data here
        }),
      });

      if (!response.ok) {
        console.error("Failed to track page view");
      } else {
        const data = await response.json();
        // You can do something with the returned visitorId and sessionId if needed
      }
    };

    trackPageView();
  }, [pathname, searchParams]);

  return sessionId;
}
