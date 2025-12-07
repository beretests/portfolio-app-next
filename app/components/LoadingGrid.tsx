"use client";

import Skeleton from "@mui/material/Skeleton";

type Props = {
  count?: number;
  imageHeight?: number;
  lines?: number;
};

/**
 * Reusable card skeleton grid to keep loading states consistent.
 */
export default function LoadingGrid({ count = 6, imageHeight = 180, lines = 3 }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="rounded-xl border border-borderSecondary bg-background shadow-sm p-4 space-y-3">
          <Skeleton variant="rounded" height={imageHeight} />
          <Skeleton width="30%" />
          {Array.from({ length: lines }).map((__, lineIdx) => (
            <Skeleton key={lineIdx} width={`${80 - lineIdx * 10}%`} />
          ))}
        </div>
      ))}
    </div>
  );
}
