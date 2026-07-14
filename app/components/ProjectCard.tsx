"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const MAX_TECH_CHIPS = 6;

const categoryAccent: Record<Project["category"], string> = {
  "Power Platform": "from-fuchsia-700/90 via-purple-700/80 to-indigo-800/90",
  "Azure & Microsoft 365": "from-blue-700/90 via-cyan-700/80 to-slate-800/90",
  "Full-Stack Engineering": "from-emerald-700/90 via-teal-700/80 to-slate-800/90",
};

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const visibleTech = project.techStack.slice(0, MAX_TECH_CHIPS);
  const remainingCount = project.techStack.length - visibleTech.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-borderSecondary bg-background shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative overflow-hidden ${compact ? "h-36" : "h-48"} bg-gradient-to-br ${categoryAccent[project.category]}`}
      >
        {project.imageUrl ? (
          <>
            <Image
              src={project.imageUrl}
              alt={`${project.name} interface`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-95"
              style={{ objectPosition: project.imagePosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
            <span className="font-[family-name:var(--font-headings)] text-2xl font-bold text-white drop-shadow-sm">
              {project.shortName}
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-slate-950/55 px-3 py-1 font-[family-name:var(--font-cta)] text-xs font-bold text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-headings)] text-xl font-bold leading-tight text-foreground">
            {project.name}
          </h3>
          <span className="max-w-[10rem] rounded-full border border-borderSecondary bg-secondary/60 px-2.5 py-1 text-center font-[family-name:var(--font-cta)] text-[0.7rem] font-bold leading-4 text-primary">
            {project.status}
          </span>
        </div>

        <p className="mt-2 text-sm font-semibold text-primary">{project.role}</p>
        <p className={`mt-3 text-sm leading-6 text-foreground/75 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>
          {project.overview}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-borderSecondary bg-secondary/40 px-2.5 py-1 text-xs font-semibold text-foreground/80"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-full border border-borderSecondary px-2.5 py-1 text-xs font-semibold text-foreground/65">
              +{remainingCount} more
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Link
            href={`/projects/${project.id}`}
            className="rounded-md bg-primary px-3 py-2 font-[family-name:var(--font-cta)] text-sm font-bold text-background transition hover:opacity-90"
          >
            Read case study
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-borderSecondary px-3 py-2 font-[family-name:var(--font-cta)] text-sm font-bold text-foreground transition hover:bg-hover"
            >
              {project.liveLabel ?? "View demo"}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-borderSecondary px-3 py-2 font-[family-name:var(--font-cta)] text-sm font-bold text-foreground transition hover:bg-hover"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
