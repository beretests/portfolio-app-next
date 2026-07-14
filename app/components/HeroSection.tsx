import Link from "next/link";

const disciplines = [
  "Power Platform Engineering",
  "Microsoft Azure Solutions Architecture",
  "Full-Stack Software Engineering",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-borderSecondary bg-gradient-to-br from-primary/10 via-background to-secondary/70">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-highlight/10 blur-3xl" />

      <div className="container relative mx-auto grid min-h-[70vh] items-center gap-12 px-6 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Power Platform · Azure · Full-Stack
          </p>
          <h1 className="text-balance font-[family-name:var(--font-headings)] text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            I build governed platforms and dependable software.
          </h1>
          <p className="mt-7 max-w-3xl text-balance font-[family-name:var(--font-body)] text-lg leading-8 text-foreground/80 sm:text-xl">
            I&apos;m Eberechi Omeje, a Power Platform engineer, Microsoft Azure
            solutions architect and full-stack software engineer. I turn
            business requirements into secure, maintainable systems—from
            Dataverse ALM and Microsoft 365 governance to Azure integrations and
            user-focused applications.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-md bg-primary px-5 py-3 font-[family-name:var(--font-cta)] font-bold text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View selected work
            </Link>
            <Link
              href="/resume"
              className="rounded-md border border-borderSecondary bg-background/70 px-5 py-3 font-[family-name:var(--font-cta)] font-bold text-foreground transition hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View resume
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-borderSecondary bg-background/80 p-6 shadow-xl backdrop-blur-sm lg:p-8">
          <p className="font-[family-name:var(--font-cta)] text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Engineering focus
          </p>
          <ul className="mt-5 space-y-4">
            {disciplines.map((discipline, index) => (
              <li
                key={discipline}
                className="flex items-start gap-4 border-b border-divider pb-4 last:border-0 last:pb-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-[family-name:var(--font-cta)] text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <span className="pt-1 font-[family-name:var(--font-headings)] font-semibold text-foreground">
                  {discipline}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
