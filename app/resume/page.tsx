import SkillsIcons, {
  iconNames,
  type IconName,
  type SkillsIconItem,
} from "../components/SkillsIcon";
import { supabaseAdmin } from "@/lib/supabase-server";

type WorkItem = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};
type EducationItem = {
  school: string;
  degree: string;
  dates: string;
  details?: string;
};
type CertificationItem = {
  name: string;
  issuer?: string;
  date?: string;
  status?: "Earned" | "Planned";
};
type LangFramework = { name: string; icon?: string | null };

const fallback = {
  headline:
    "Power Platform Engineer | Azure Solutions Architect | Full-Stack Software Engineer",
  summary:
    "Microsoft solutions consultant and software engineer building secure, reliable business platforms across Power Platform, Microsoft Azure, Microsoft 365, and modern full-stack technologies. I combine solution architecture, identity and security, automation, testing, and customer-focused delivery to turn complex requirements into maintainable systems.",
  work: [
    {
      role: "Microsoft Solutions Consultant",
      company: "City of Regina",
      dates: "Aug 2025 – Present",
      bullets: [
        "Lead full-stack initiatives using React, TypeScript, and Azure-hosted services, improving feature delivery velocity by 30%",
        "Partner with UX, product, and program stakeholders to translate complex requirements into intuitive browser-based experiences",
        "Architect extensible platform components that support internal and third-party workload onboarding",
        "Identify technical gaps and drive improvements in architecture, code quality, performance, and reliability",
        "Mentor engineers and contribute to solution design and code reviews while incorporating customer feedback into delivery",
      ],
    },
    {
      role: "Senior QA Engineer",
      company: "Portage CyberTech",
      dates: "May 2021 – Aug 2025",
      bullets: [
        "Led Microsoft 365 governance, compliance, identity, and conditional-access initiatives supporting 2,000+ users",
        "Delivered a SharePoint Online migration for 2,000+ users with no critical downtime and deployed document management across five departments",
        "Developed Playwright automation that increased test coverage by 50% and reduced execution time by 30%",
        "Integrated automated tests into GitLab CI/CD and introduced k6 load testing, reducing performance incidents by 50%",
        "Supported cybersecurity initiatives through MFA, data loss prevention, security updates, and hybrid Microsoft environment monitoring",
      ],
    },
    {
      role: "Software Engineer",
      company: "Portage CyberTech",
      dates: "Jun 2020 – Apr 2021",
      bullets: [
        "Developed and maintained .NET, Java, SQL, React, and Redux applications and enterprise integrations",
        "Automated account provisioning with PowerShell, saving more than 10 hours each month",
        "Administered Microsoft 365 and Azure identity services while supporting 99.9% service uptime",
        "Used Azure Monitor and Log Analytics for environment assessment, performance monitoring, and operational documentation",
        "Modernized legacy JavaScript and remediated front-end security vulnerabilities including XSS and CSRF",
      ],
    },
    {
      role: "IT Support Specialist",
      company: "Digital Solutions",
      dates: "Jul 2012 – Aug 2018",
      bullets: [
        "Resolved 95% of support tickets within SLA, improving IT efficiency by 20%",
        "Trained 50+ staff on IT assets and software, reducing related support requests by 30%",
        "Reduced Wi-Fi and Internet downtime by 25% through proactive network troubleshooting",
        "Built a centralized information system that improved access to critical IT resources by 40%",
      ],
    },
  ],
  education: [
    {
      school: "Boot.dev",
      degree: "Computer Software Engineering",
      dates: "May 2024 – May 2025",
    },
    {
      school: "BrainStation",
      degree: "Diploma, Computer Software Engineering",
      dates: "Jun 2024 – Aug 2024",
    },
    {
      school: "University of Nigeria, Nsukka",
      degree: "Bachelor of Engineering, Electrical Engineering",
      dates: "2003 – 2008",
    },
  ],
  skills: [
    "Microsoft Power Platform",
    "Power Apps & Power Automate",
    "Dataverse & Power Fx",
    "Power Platform ALM",
    "Azure Solution Architecture",
    "Azure Functions & Key Vault",
    "Microsoft Entra ID & IAM",
    "Microsoft 365 Administration",
    "SharePoint Online",
    "React, Next.js & TypeScript",
    ".NET, C# & Node.js",
    "REST APIs & System Integration",
    "SQL & PostgreSQL",
    "PowerShell Automation",
    "CI/CD & Azure DevOps",
    "Playwright & k6",
    "Docker & Infrastructure Automation",
    "Security, Governance & Compliance",
  ],
  certifications: [
    {
      name: "Microsoft 365 Certified: Administrator Expert",
      issuer: "Microsoft",
      status: "Earned",
    },
    {
      name: "Microsoft Certified: Identity and Access Administrator Associate",
      issuer: "Microsoft",
      status: "Earned",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      status: "Earned",
    },
    {
      name: "ITIL Foundation Level",
      issuer: "PeopleCert",
      status: "Earned",
    },
    {
      name: "AZ-300: Microsoft Azure Architect Technologies",
      issuer: "Microsoft",
      status: "Earned",
    },
    {
      name: "AI-901: Microsoft Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "Target: 2026",
      status: "Planned",
    },
    {
      name: "AI-103: Azure AI Apps and Agents Developer Associate",
      issuer: "Microsoft",
      date: "Target: 2026",
      status: "Planned",
    },
    {
      name: "AB-100: Agentic AI Business Solutions Architect",
      issuer: "Microsoft",
      date: "Target: 2026",
      status: "Planned",
    },
    {
      name: "PL-400: Power Platform Developer Associate",
      issuer: "Microsoft",
      date: "Target: 2026",
      status: "Planned",
    },
  ],
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
    .select(
      "headline,summary,work,education,skills,certifications,languages_frameworks"
    )
    .eq("id", "primary")
    .single();

  const storedCertifications = content?.certifications as
    | CertificationItem[]
    | undefined;
  const isLegacyContent =
    content?.headline === "Software Engineer" &&
    !storedCertifications?.some((cert) => cert.status);
  const currentContent = isLegacyContent ? null : content;

  const headline = currentContent?.headline || fallback.headline;
  const summary = currentContent?.summary || fallback.summary;
  const work = ((currentContent?.work as WorkItem[]) || fallback.work) as WorkItem[];
  const education = ((currentContent?.education as EducationItem[]) ||
    fallback.education) as EducationItem[];
  const skills = (currentContent?.skills as string[]) || fallback.skills;
  const certifications = ((currentContent?.certifications as CertificationItem[]) ||
    fallback.certifications) as CertificationItem[];
  const allowedIcons = new Set<IconName>(iconNames);
  const languages: SkillsIconItem[] = (
    (currentContent?.languages_frameworks as LangFramework[]) ||
    fallback.languages_frameworks
  ).map((l) => ({
    name: l.name,
    icon:
      typeof l.icon === "string" && allowedIcons.has(l.icon as IconName)
        ? (l.icon as IconName)
        : null,
  }));

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
          <p className="text-foreground/80 font-[family-name:var(--font-body)]">
            {summary}
          </p>
        )}
      </header>

      {!hasContent && (
        <p className="text-foreground/70 font-[family-name:var(--font-body)]">
          Resume content is being updated.
        </p>
      )}

      {skills.length > 0 && (
        <section className="rounded-xl border border-borderSecondary bg-background/60 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold">
                Skills
              </h2>
            </div>
          </div>
          <div className="h-px bg-borderSecondary/60" />
          <div className="grid md:grid-cols-center-3 font-[family-name:var(--font-body)] gap-2 md:text-lg">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="rounded-md p-2 text-center bg-borderSecondary/50 text-foreground"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="rounded-xl border border-borderSecondary bg-background/60 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold">
              Certifications & Learning Plan
            </h2>
            <span className="inline-flex items-center rounded-full border border-borderSecondary bg-secondary/20 px-3 py-1 text-xs font-semibold text-foreground">
              {certifications.filter((cert) => cert.status !== "Planned").length} earned ·{" "}
              {certifications.filter((cert) => cert.status === "Planned").length} planned
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-borderSecondary bg-background p-3 space-y-1"
              >
                <p className="text-sm uppercase text-foreground/70 font-semibold">
                  {cert.status === "Planned" ? "Planned credential" : "Certification"}
                </p>
                <p className="text-lg font-[family-name:var(--font-headings)] text-primary">
                  {cert.name}
                </p>
                {cert.issuer && (
                  <p className="text-sm text-foreground/80">
                    Issued by {cert.issuer}
                  </p>
                )}
                {cert.date && (
                  <p className="text-xs text-foreground/70">
                    {cert.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
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

      {languages.length > 0 && (
        <section className="rounded-xl border border-borderSecondary bg-background/60 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl font-[family-name:var(--font-headings)] font-semibold">
              Languages & Frameworks
            </h2>
            <span className="inline-flex items-center rounded-full border border-borderSecondary bg-secondary/20 px-3 py-1 text-xs font-semibold text-foreground">
              {languages.length} stack items
            </span>
          </div>
          <div className="h-px bg-borderSecondary/60" />
          <SkillsIcons items={languages} />
        </section>
      )}
    </div>
  );
}
