"use client";

import Image from "next/image";
import Link from "next/link";
import Chip from "@mui/material/Chip";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    status: string;
    gifUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    overview?: string;
    techStack?: string[];
  };
}

const MAX_TECH_CHIPS = 7;

export default function ProjectCard({ project }: ProjectCardProps) {
  const techStack = project.techStack ?? [];
  const visibleTech = techStack.slice(0, MAX_TECH_CHIPS);
  const remainingCount = techStack.length - visibleTech.length;

  const statusColor: "primary" | "error" | "warning" =
    project.status === "Live"
      ? "primary"
      : project.status === "Not Started"
      ? "error"
      : "warning";

  return (
    <div
      className="
        group rounded-2xl shadow-lg overflow-hidden
        bg-background border border-borderSecondary
        hover:-translate-y-1 hover:shadow-xl
        transition-all duration-300
        h-full flex flex-col
      "
    >
      {/* Fixed-height image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 via-secondary/20 to-background">
        <Image
          src={project.gifUrl}
          alt={project.name}
          fill
          sizes="(max-width:768px) 100vw, 400px"
          className="object-contain p-4"
          priority={false}
        />
      </div>

      {/* Content: grid layout to keep rows in sync */}
      <div className="p-5 flex-1 grid grid-rows-[auto_auto_auto_1fr_auto] gap-3">
        {/* Row 1: title + status */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-headings)] text-foreground leading-tight">
            {project.name}
          </h2>
          <Chip
            label={project.status}
            size="small"
            color={statusColor}
            variant="filled"
            sx={{ fontWeight: 700, borderRadius: "9999px" }}
          />
        </div>

        {/* Row 2: overview (fixed height, clamped) */}
        <div className="min-h-[72px] max-h-[72px]">
          {project.overview && (
            <p className="text-sm text-foreground/80 line-clamp-3">
              {project.overview}
            </p>
          )}
        </div>

        {/* Row 3: tech stack (fixed height, no scrollbars, with limiter) */}
        <div className="min-h-[88px] max-h-[88px] overflow-hidden">
          {visibleTech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {visibleTech.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              ))}

              {remainingCount > 0 && (
                <Chip
                  label={`+${remainingCount} more`}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </div>
          )}
        </div>

        {/* Row 4: spacer */}
        <div />

        {/* Row 5: CTA buttons */}
        <div className="flex flex-wrap gap-2 pt-1 items-end">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cta)] bg-highlight text-foreground px-3 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              View Live
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cta)] bg-foreground text-background hover:bg-hover transition-colors px-3 py-1.5 rounded-md text-sm font-semibold"
            >
              GitHub
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="bg-primary px-3 py-1.5 rounded-md text-background text-sm font-[family-name:var(--font-cta)] font-semibold hover:opacity-90 transition"
          >
            Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
