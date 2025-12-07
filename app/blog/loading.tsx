"use client";

import LoadingGrid from "../components/LoadingGrid";

export default function BlogLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/70 to-background border border-borderPrimary shadow-md p-8 mb-10">
        <div className="h-6 w-16 bg-borderSecondary/60 rounded mb-3" />
        <div className="h-10 w-3/4 bg-borderSecondary/60 rounded mb-2" />
        <div className="h-4 w-2/3 bg-borderSecondary/50 rounded" />
      </div>
      <LoadingGrid />
    </div>
  );
}
