import SkillsIcons from "../components/SkillsIcon";
import { supabaseAdmin } from "@/lib/supabase-server";

type WorkItem = { role: string; company: string; dates: string; bullets: string[] };
type EducationItem = { school: string; degree: string; dates: string; details?: string };
type CertificationItem = { name: string; issuer?: string; date?: string };
type LangFramework = { name: string; icon?: string | null };

const fallback = {
  headline: "Software Engineer",
  summary:
    "I'm a software engineer with experience spanning QA, support, infrastructure, and full-stack work. Adaptable across teams, focused on reliable delivery and clear communication.",
  work: [
    {
      role: "Software Engineer",
      company: "Portage CyberTech",
      dates: "Apr 2021 – Present",
      bullets: [
        "Developed and maintained automated tests (Playwright) improving coverage by 50% and reducing execution time by 30%",
        "Integrated automated tests into CI/CD (GitLab) to keep releases fast and stable",
        "Implemented k6 load testing to cut performance incidents by ~50% and catch regressions earlier",
        "Collaborated across teams to define automation strategies and ensure feature coverage",
      ],
    },
    {
      role: "Customer Support Specialist",
      company: "Portage CyberTech",
      dates: "Jun 2020 – Apr 2021",
      bullets: [
        "Maintained 98% CSAT and reduced resolution time by 25% through better triage and troubleshooting",
        "Created FAQ/process docs to cut repeat inquiries, reducing backlog by ~30%",
      ],
    },
    {
      role: "IT Support Specialist",
      company: "Digital Solutions Limited",
      dates: "Jul 2012 – Aug 2018",
      bullets: [
        "Resolved 95% of tickets within SLA for on-site and remote support",
        "Trained 50+ staff on new hardware/software, reducing related support requests by 30%",
        "Resolved 100+ network issues (LAN/Wi-Fi/Internet), cutting downtime by 25%",
        "Documented policies/procedures, reducing troubleshooting time by 15%",
      ],
    },
  ],
  education: [
    { school: "University of Nigeria, Nsukka", degree: "Bachelors in Electrical Engineering", dates: "" },
    { school: "BrainStation", degree: "Diploma in Software Engineering", dates: "" },
  ],
  skills: ["Playwright", "TypeScript", "Next.js", "React", "Supabase", "Docker", "Nginx", "GitLab CI", "k6", "AWS"],
  certifications: [{ name: "Azure Fundamentals", issuer: "Microsoft", date: "Dec 2023" }],
  languages_frameworks: [
    { name: "React", icon: "React" },
    { name: "Javascript", icon: "Javascript" },
    { name: "Nextjs", icon: "Nextjs" },
    { name: "Python", icon: "Python" },
    { name: "Html5", icon: "Html5" },
    { name: "CSS3", icon: "CSS3" },
    { name: "Supabase", icon: "Supabase" },
    { name: "Docker", icon: "Docker" },
    { name: "Kubernetes", icon: "Kubernetes" },
    { name: "Cloudflare", icon: "Cloudflare" },
    { name: "Nginx", icon: "Nginx" },
    { name: "Tailwind", icon: "Tailwind" },
    { name: "Typescript", icon: "Typescript" },
    { name: "ReactNative", icon: "ReactNative" },
    { name: "Postgresql", icon: "Postgresql" },
    { name: "Mysql", icon: "Mysql" },
    { name: "NodeJs", icon: "NodeJs" },
    { name: "K6", icon: "K6" },
    { name: "Azure", icon: "Azure" },
    { name: "AWS", icon: "AWS" },
    { name: "Selenium", icon: "Selenium" },
    { name: "Playwright", icon: "Playwright" },
    { name: "Terraform", icon: "Terraform" },
    { name: "Ansible", icon: "Ansible" },
    { name: "Git", icon: "Git" },
    { name: "Postman", icon: "Postman" },
  ],
};

export default async function ResumePage() {
  const { data: content } = await supabaseAdmin
    .from("resume_content")
    .select("headline,summary,work,education,skills,certifications,languages_frameworks")
    .eq("id", "primary")
    .single();

  const headline = content?.headline || fallback.headline;
  const summary = content?.summary || fallback.summary;
  const work = ((content?.work as WorkItem[]) || fallback.work) as WorkItem[];
  const education = ((content?.education as EducationItem[]) || fallback.education) as EducationItem[];
  const skills = (content?.skills as string[]) || fallback.skills;
  const certifications = ((content?.certifications as CertificationItem[]) || fallback.certifications) as CertificationItem[];
  const languages = ((content?.languages_frameworks as LangFramework[]) || fallback.languages_frameworks).map(
    (l) => ({ ...l, icon: l.icon ?? null })
  );

  const hasContent =
    Boolean(summary) ||
    work.length > 0 ||
    education.length > 0 ||
    skills.length > 0 ||
    certifications.length > 0 ||
    languages.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl text-primary font-bold font-[family-name:var(--font-headings)]">
          Eberechi Omeje
        </h1>
        <p className="text-xl font-[family-name:var(--font-highlights)] font-bold text-resume">
          {headline}
        </p>
        {summary && (
          <p className="text-foreground/80 font-[family-name:var(--font-body)]">{summary}</p>
        )}
      </header>

      {!hasContent && (
        <p className="text-foreground/70 font-[family-name:var(--font-body)]">
          Resume content is being updated.
        </p>
      )}

      {work.length > 0 && (
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold mb-4">
            Work Experience
          </h2>
          <div className="space-y-4">
            {work.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-xl font-medium font-[family-name:var(--font-headings)]">
                  {item.role}
                </h3>
                <p className="font-semibold grid md:grid-cols-2 text-resume font-[family-name:var(--font-highlights)]">
                  {item.company}
                  <span className="md:justify-self-end">{item.dates}</span>
                </p>
                <ul className="text-sm md:text-lg list-disc list-outside mt-2 px-4 gap-2 font-[family-name:var(--font-body)]">
                  {(item.bullets || []).map((b, i) => (
                    <li key={i} className="mb-1">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold mb-4">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-xl font-medium font-[family-name:var(--font-headings)]">
                  {item.school}
                </h3>
                <p className="font-semibold text-resume font-[family-name:var(--font-highlights)]">
                  {item.degree} {item.dates ? `| ${item.dates}` : ""}
                </p>
                {item.details && (
                  <p className="text-sm md:text-lg font-[family-name:var(--font-body)]">
                    {item.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold mb-4">
            Skills
          </h2>
          <div className="grid md:grid-cols-center-3 font-[family-name:var(--font-body)] gap-2 md:text-lg">
            {skills.map((skill, index) => (
              <div key={index} className="rounded-md p-2 text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold mb-4">
            Languages & Frameworks
          </h2>
          <SkillsIcons items={languages} />
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold mb-4">
            Certifications
          </h2>
          <ul className="list-disc pl-6 font-[family-name:var(--font-body)]">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                {cert.name}
                {cert.issuer ? `, ${cert.issuer}` : ""}
                {cert.date ? ` (${cert.date})` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
