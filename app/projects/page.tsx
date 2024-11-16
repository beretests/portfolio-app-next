import ProjectCard from "../components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center font-[family-name:var(--font-headings)] text-primary">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-center-2 lg:grid-cols-center-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
