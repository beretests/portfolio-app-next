import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:text-lg font-[family-name:var(--font-body)]">
      <h1 className="text-3xl font-bold mb-6 font-[family-name:var(--font-headings)] text-primary">
        {project.name} - Case Study
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Project Background
        </h2>
        <p>{project.background}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Project Objectives
        </h2>
        <ul className="list-disc pl-6">
          {project.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        {/* <p>{project.objectives}</p> */}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Initial Assumptions
        </h2>
        <ul className="list-disc pl-6">
          {project.assumptions.map((assumption, index) => (
            <li key={index}>{assumption}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Design Choices
        </h2>
        <ul className="list-disc pl-6">
          {project.designChoices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Tech Stack (and Rationale)
        </h2>
        <ul className="list-disc pl-6">
          {project.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        {/* <p className="mt-4">{project.techStackReasoning}</p> */}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Challenges and Solutions
        </h2>
        <ul className="space-y-4">
          {project.challenges.map((challenge, index) => (
            <li key={index}>
              <h3 className="font-semibold font-[family-name:var(--font-highlights)]">
                {challenge.title}
              </h3>
              <p>{challenge.solution}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-headings)]">
          Key Learnings
        </h2>
        <ul className="list-disc pl-6">
          {project.learnings.map((learning, index) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
