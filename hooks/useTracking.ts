"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useTracking() {
  const pathname = usePathname();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const isAdminPage =
      pathname === "/admin" ||
      pathname.startsWith("/blog/admin") ||
      pathname.startsWith("/blog/editor");

    if (isAdminPage) return;

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
          pageUrl: pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          sessionId: currentSessionId,
          // Add other client-side collected data here
        }),
      });

      if (!response.ok) {
        console.error("Failed to track page view");
      } else {
        await response.json();
      }
    };

    trackPageView();
  }, [pathname]);

  return sessionId;
}
