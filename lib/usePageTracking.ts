"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { trackPageView } from "./tracking";

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId") || uuidv4();
    localStorage.setItem("visitorId", visitorId);

    const sessionId = sessionStorage.getItem("sessionId") || uuidv4();
    sessionStorage.setItem("sessionId", sessionId);

    const fullPath = pathname + searchParams.toString();

    trackPageView({
      pageUrl: fullPath,
      visitorId,
      sessionId,
      source: document.referrer,
      location: navigator.language,
      device: navigator.platform,
      browser: navigator.userAgent,
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);
}
