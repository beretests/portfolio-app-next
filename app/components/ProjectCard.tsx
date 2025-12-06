// components/ProjectCard.tsx

import Image from "next/image";
import Link from "next/link";
import Badge from "@mui/material/Badge";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    status: string;
    gifUrl: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-resume mb-8 font-[family-name:var(--font-body)]">
      <Image
        src={project.gifUrl}
        alt={project.name}
        width={400}
        height={225}
        className="w-full h-48 object-contain"
      />
      <div className="grid items-center justify-items-center gap-4 p-4 px-6">
        <Badge
          badgeContent={project.status}
          color={
            project.status === "Live"
              ? "primary"
              : project.status === "Not Started"
              ? "error"
              : "warning"
          }
          overlap="rectangular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className="relative"
        >
          <h2 className="text-xl text-wrap h-9 font-semibold text-center pt-2 mb-6 font-[family-name:var(--font-headings)] text-background">
            {project.name}
          </h2>
        </Badge>
        <div className="flex space-x-2 justify-center self-end">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cta)] bg-highlight dark:text-secondary px-3 py-1 rounded-md text-sm font-semibold"
            >
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-cta)] bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-semibold"
            >
              GitHub
            </a>
          )}
          <Link
            href={`/projects/${project.id}`}
            className="bg-highlight px-3 py-1 rounded-md dark:text-secondary text-sm font-[family-name:var(--font-cta)] font-semibold"
          >
            Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
