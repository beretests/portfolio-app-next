import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.overview,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-md border border-borderSecondary bg-background px-3 py-2 text-sm font-bold text-foreground transition hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          ← Back to projects
        </Link>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-borderSecondary bg-secondary/50 px-3 py-1 text-sm font-semibold text-primary">
            {project.category}
          </span>
          <span className="rounded-full border border-borderSecondary px-3 py-1 text-sm font-semibold text-foreground/75">
            {project.status}
          </span>
        </div>
      </div>

      <header className="rounded-3xl border border-borderSecondary bg-gradient-to-br from-primary/10 via-background to-secondary/60 p-6 shadow-sm sm:p-9">
        <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.18em] text-primary">
          {project.projectType}
        </p>
        <h1 className="mt-3 text-balance font-[family-name:var(--font-headings)] text-4xl font-bold text-foreground sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 text-lg font-semibold text-primary">{project.role}</p>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-foreground/80">
          {project.overview}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-borderSecondary bg-background/70 px-3 py-1 text-sm font-semibold text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.githubUrl || project.articleUrl) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-4 py-2.5 font-[family-name:var(--font-cta)] text-sm font-bold text-background transition hover:opacity-90"
              >
                {project.liveLabel ?? "View demo"}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-borderSecondary bg-background/70 px-4 py-2.5 font-[family-name:var(--font-cta)] text-sm font-bold text-foreground transition hover:bg-hover"
              >
                View GitHub repository
              </a>
            )}
            {project.articleUrl && (
              <Link
                href={project.articleUrl}
                className="rounded-md border border-borderSecondary bg-background/70 px-4 py-2.5 font-[family-name:var(--font-cta)] text-sm font-bold text-foreground transition hover:bg-hover"
              >
                Read architecture field note
              </Link>
            )}
          </div>
        )}
      </header>

      {project.confidentialityNote && (
        <aside className="mt-6 rounded-xl border border-borderPrimary bg-secondary/40 p-4 text-sm leading-6 text-foreground/75">
          <strong className="text-foreground">Confidentiality:</strong>{" "}
          {project.confidentialityNote}
        </aside>
      )}

      <section aria-labelledby="outcomes" className="mt-10">
        <h2
          id="outcomes"
          className="font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground"
        >
          What the work delivered
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {project.outcomes.map((outcome, index) => (
            <article
              key={outcome}
              className="rounded-xl border border-borderSecondary bg-background p-5 shadow-sm"
            >
              <span className="font-[family-name:var(--font-cta)] text-sm font-bold text-primary">
                0{index + 1}
              </span>
              <p className="mt-2 leading-7 text-foreground/80">{outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-borderSecondary bg-background p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground">
            Goals
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/80 marker:text-primary">
            {project.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-borderSecondary bg-background p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground">
            Key design decisions
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/80 marker:text-primary">
            {project.designDecisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>
      </div>

      {project.challenges.length > 0 && (
        <section className="mt-10 rounded-2xl border border-borderSecondary bg-secondary/25 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground">
            Challenges and solutions
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {project.challenges.map((challenge) => (
              <article
                key={challenge.title}
                className="rounded-xl border border-borderSecondary bg-background p-5"
              >
                <h3 className="font-[family-name:var(--font-headings)] text-xl font-bold text-primary">
                  {challenge.title}
                </h3>
                <p className="mt-3 leading-7 text-foreground/80">
                  {challenge.solution}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {project.learnings.length > 0 && (
        <section className="mt-10 rounded-xl border border-borderSecondary bg-background p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground">
            Key learnings
          </h2>
          <ul className="mt-4 grid gap-3 pl-0 text-foreground/80 md:grid-cols-2">
            {project.learnings.map((learning) => (
              <li
                key={learning}
                className="rounded-lg border border-borderSecondary bg-secondary/25 px-4 py-3"
              >
                {learning}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
