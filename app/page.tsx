import Link from "next/link";
import HeroSection from "./components/HeroSection";

const expertise = [
  {
    title: "Governed Microsoft platforms",
    description:
      "Environment strategy, Dataverse architecture, managed solutions, pipelines, security and sustainable governance controls.",
  },
  {
    title: "Secure Azure integrations",
    description:
      "Managed identities, Key Vault, Azure Functions, Microsoft Graph and cloud services designed around least privilege.",
  },
  {
    title: "Reliable full-stack products",
    description:
      "Accessible interfaces, well-modelled APIs and databases, automated testing, CI/CD and production-minded operations.",
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="container mx-auto px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.18em] text-primary">
            One engineering practice, three connected strengths
          </p>
          <h2 className="mt-3 text-balance font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground sm:text-4xl">
            From architecture and governance to code and delivery
          </h2>
          <p className="mt-5 font-[family-name:var(--font-body)] text-lg leading-8 text-foreground/75">
            My background across software engineering, QA, DevOps and technical
            support helps me design solutions that work for users, administrators
            and the teams responsible for operating them.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {expertise.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-borderSecondary bg-background p-6 shadow-sm"
            >
              <h3 className="font-[family-name:var(--font-headings)] text-xl font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-foreground/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="font-[family-name:var(--font-cta)] font-bold text-link underline decoration-2 underline-offset-4 transition hover:text-primary"
          >
            Explore the case studies →
          </Link>
        </div>
      </section>
    </main>
  );
}
