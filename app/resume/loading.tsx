"use client";

import Skeleton from "@mui/material/Skeleton";
import SkillsIcons from "../components/SkillsIcon";

export default function ResumeLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <header className="space-y-2">
        <Skeleton variant="text" width="50%" height={36} />
        <Skeleton variant="text" width="40%" height={28} />
        <Skeleton variant="text" width="80%" />
      </header>

      <section>
        <Skeleton variant="text" width="40%" height={28} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="65%" />
      </section>

      <section>
        <Skeleton variant="text" width="40%" height={28} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="75%" />
      </section>

      <section>
        <Skeleton variant="text" width="40%" height={28} />
        <SkillsIcons />
      </section>
    </div>
  );
}
