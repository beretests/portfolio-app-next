import { projects } from "@/data/projects";
import { supabase } from "@/lib/supabase";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  // Try Supabase first for the latest description/background, fall back to static data
  const { data: dbProject } = await supabase
    .from("projects")
    .select(
      "id,name,status,gifUrl,liveUrl,githubUrl,overview,goals,designDecisions,techStack,challenges,learnings"
    )
    .eq("id", id)
    .single();

  const localProject = projects.find((p) => p.id === id);
  const project = dbProject
    ? {
        ...localProject,
        ...dbProject,
      }
    : localProject;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:text-lg font-[family-name:var(--font-body)]">
      <div className="mb-4">
        <a
          href="/projects"
          className="inline-flex items-center rounded border border-borderSecondary bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-hover transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ← Back to projects
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-6 font-[family-name:var(--font-headings)] text-primary">
        {project.name} - Case Study
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Overview
        </h2>
        <p>{project.overview}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Goals
        </h2>
        <ul className="list-disc pl-6">
          {project.goals?.map((goal: string, index: number) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Key Design Decisions
        </h2>
        <ul className="list-disc pl-6">
          {project.designDecisions?.map((choice: string, index: number) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Tech Stack
        </h2>
        <ul className="list-disc pl-6">
          {project.techStack?.map((tech: string, index: number) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Challenges and Solutions
        </h2>
        <ul className="space-y-4">
          {project.challenges.map(
            (challenge: { title: string; solution: string }, index: number) => (
              <li key={index}>
                <h3 className="font-semibold font-[family-name:var(--font-highlights)]">
                  {challenge.title}
                </h3>
                <p>{challenge.solution}</p>
              </li>
            )
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Key Learnings
        </h2>
        <ul className="list-disc pl-6">
          {project.learnings.map((learning: string, index: number) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
