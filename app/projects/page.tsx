import type { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Power Platform, Microsoft Azure, Microsoft 365 and full-stack engineering work by Eberechi Omeje.",
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const additionalProjects = projects.filter((project) => !project.featured);

  return (
    <main className="container mx-auto px-4 py-12 lg:px-10">
      <header className="mx-auto max-w-4xl text-center">
        <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Selected work
        </p>
        <h1 className="mt-3 text-balance font-[family-name:var(--font-headings)] text-4xl font-bold text-foreground sm:text-5xl">
          Platforms, integrations and products built for real use
        </h1>
        <p className="mt-5 text-lg leading-8 text-foreground/75">
          These case studies connect my work across Power Platform engineering,
          Microsoft Azure solutions architecture and full-stack software
          development. Professional projects are anonymized to protect
          organization and tenant information.
        </p>
      </header>

      <section aria-labelledby="featured-projects" className="mt-14">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="featured-projects"
              className="font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground"
            >
              Featured case studies
            </h2>
            <p className="mt-2 text-foreground/70">
              Enterprise Microsoft-platform work and production-minded full-stack
              applications.
            </p>
          </div>
          <span className="font-[family-name:var(--font-cta)] text-sm font-semibold text-primary">
            {featuredProjects.length} projects
          </span>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="additional-projects" className="mt-20">
        <div className="mb-7">
          <h2
            id="additional-projects"
            className="font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground"
          >
            Additional projects
          </h2>
          <p className="mt-2 text-foreground/70">
            Smaller builds that demonstrate community problem-solving, automation
            and continued technical learning.
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2">
          {additionalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
