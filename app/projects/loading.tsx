"use client";

import LoadingGrid from "../components/LoadingGrid";

export default function ProjectsLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-borderSecondary/60 rounded mb-6" />
      <LoadingGrid />
    </main>
  );
}
