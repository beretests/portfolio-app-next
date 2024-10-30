// ClientLayout.tsx (Client Component)
"use client";

// import { usePageTracking } from "../lib/usePageTracking";
import { useTracking } from "@/hooks/useTracking";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTracking();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
