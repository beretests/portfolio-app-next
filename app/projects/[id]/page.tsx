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

  const statusStyles: Record<string, string> = {
    Live: "bg-emerald-600/15 text-emerald-300 border border-emerald-500/50",
    WIP: "bg-amber-500/15 text-amber-200 border border-amber-400/50",
    "Not Started": "bg-rose-500/15 text-rose-200 border border-rose-400/50",
  };

  return (
    <div className="container mx-auto px-4 py-10 md:text-lg font-[family-name:var(--font-body)] space-y-8">
      <div className="mb-4 flex justify-between items-center">
        <a
          href="/projects"
          className="inline-flex items-center rounded border border-borderSecondary bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-hover transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ← Back to projects
        </a>
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[project.status] || "bg-borderSecondary text-foreground"}`}
        >
          {project.status}
        </span>
      </div>
      <div className="bg-gradient-to-br from-primary/5 via-background to-background border border-borderSecondary rounded-2xl p-6 shadow-sm space-y-4">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-headings)] text-primary">
          {project.name}
        </h1>
        <p className="text-foreground/80 max-w-4xl">{project.overview}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full border border-borderSecondary bg-background/60"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-background px-3 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-borderSecondary px-3 py-2 text-sm font-semibold text-foreground hover:bg-hover transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-borderSecondary bg-background/60 p-5 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 font-[family-name:var(--font-headings)]">
            Goals
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {project.goals?.map((goal: string, index: number) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-borderSecondary bg-background/60 p-5 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 font-[family-name:var(--font-headings)]">
            Key Design Decisions
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {project.designDecisions?.map((choice: string, index: number) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-borderSecondary bg-background/60 p-5 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Challenges & Solutions
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {project.challenges.map((challenge: { title: string; solution: string }, index: number) => (
            <div key={index} className="rounded-lg border border-borderSecondary bg-background p-4 space-y-2">
              <h3 className="font-semibold font-[family-name:var(--font-highlights)] text-primary">
                {challenge.title}
              </h3>
              <p className="text-sm text-foreground/85">{challenge.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-borderSecondary bg-background/60 p-5 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 font-[family-name:var(--font-headings)]">
          Key Learnings
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {project.learnings.map((learning: string, index: number) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
