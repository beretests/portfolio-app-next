"use client";

import Skeleton from "@mui/material/Skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="h-4 w-28 bg-borderSecondary/60 rounded" />
      <Skeleton variant="text" width="60%" height={42} />
      <Skeleton variant="rounded" height={180} />
      <div className="space-y-3">
        <Skeleton width="30%" />
        <Skeleton width="85%" />
        <Skeleton width="80%" />
      </div>
      <div className="space-y-2">
        <Skeleton width="35%" />
        <Skeleton width="90%" />
        <Skeleton width="88%" />
      </div>
    </div>
  );
}
