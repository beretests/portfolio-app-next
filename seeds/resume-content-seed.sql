-- Resume content schema and seed
-- Run in Supabase SQL editor or psql

create table if not exists public.resume_content (
  id text primary key,
  headline text,
  summary text,
  work jsonb,
  education jsonb,
  skills text[],
  certifications jsonb,
  languages_frameworks jsonb,
  updated_at timestamptz default now()
);

create or replace function public.resume_content_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_resume_content_updated_at on public.resume_content;
create trigger trg_resume_content_updated_at
before update on public.resume_content
for each row
execute function public.resume_content_set_updated_at();

insert into public.resume_content (id, headline, summary, work, education, skills, certifications, languages_frameworks)
values
(
  'primary', 'Power Platform Engineer | Azure Solutions Architect | Full-Stack Software Engineer',
  'Microsoft solutions consultant and software engineer building secure, reliable business platforms across Power Platform, Microsoft Azure, Microsoft 365, and modern full-stack technologies. I combine solution architecture, identity and security, automation, testing, and customer-focused delivery to turn complex requirements into maintainable systems.',
  '[{"role":"Microsoft Solutions Consultant","company":"City of Regina","dates":"Aug 2025 – Present","bullets":["Lead full-stack initiatives using React, TypeScript, and Azure-hosted services, improving feature delivery velocity by 30%","Partner with UX, product, and program stakeholders to translate complex requirements into intuitive browser-based experiences","Architect extensible platform components that support internal and third-party workload onboarding","Identify technical gaps and drive improvements in architecture, code quality, performance, and reliability","Mentor engineers and contribute to solution design and code reviews while incorporating customer feedback into delivery"]},{"role":"Senior QA Engineer","company":"Portage CyberTech","dates":"May 2021 – Aug 2025","bullets":["Led Microsoft 365 governance, compliance, identity, and conditional-access initiatives supporting 2,000+ users","Delivered a SharePoint Online migration for 2,000+ users with no critical downtime and deployed document management across five departments","Developed Playwright automation that increased test coverage by 50% and reduced execution time by 30%","Integrated automated tests into GitLab CI/CD and introduced k6 load testing, reducing performance incidents by 50%","Supported cybersecurity initiatives through MFA, data loss prevention, security updates, and hybrid Microsoft environment monitoring"]},{"role":"Software Engineer","company":"Portage CyberTech","dates":"Jun 2020 – Apr 2021","bullets":["Developed and maintained .NET, Java, SQL, React, and Redux applications and enterprise integrations","Automated account provisioning with PowerShell, saving more than 10 hours each month","Administered Microsoft 365 and Azure identity services while supporting 99.9% service uptime","Used Azure Monitor and Log Analytics for environment assessment, performance monitoring, and operational documentation","Modernized legacy JavaScript and remediated front-end security vulnerabilities including XSS and CSRF"]},{"role":"IT Support Specialist","company":"Digital Solutions","dates":"Jul 2012 – Aug 2018","bullets":["Resolved 95% of support tickets within SLA, improving IT efficiency by 20%","Trained 50+ staff on IT assets and software, reducing related support requests by 30%","Reduced Wi-Fi and Internet downtime by 25% through proactive network troubleshooting","Built a centralized information system that improved access to critical IT resources by 40%"]}]'::jsonb,
  '[{"school":"Boot.dev","degree":"Computer Software Engineering","dates":"May 2024 – May 2025"},{"school":"BrainStation","degree":"Diploma, Computer Software Engineering","dates":"Jun 2024 – Aug 2024"},{"school":"University of Nigeria, Nsukka","degree":"Bachelor of Engineering, Electrical Engineering","dates":"2003 – 2008"}]'::jsonb,
  array['Microsoft Power Platform','Power Apps & Power Automate','Dataverse & Power Fx','Power Platform ALM','Azure Solution Architecture','Azure Functions & Key Vault','Microsoft Entra ID & IAM','Microsoft 365 Administration','SharePoint Online','React, Next.js & TypeScript','.NET, C# & Node.js','REST APIs & System Integration','SQL & PostgreSQL','PowerShell Automation','CI/CD & Azure DevOps','Playwright & k6','Docker & Infrastructure Automation','Security, Governance & Compliance'],
  '[{"name":"Microsoft 365 Certified: Administrator Expert","issuer":"Microsoft","status":"Earned"},{"name":"Microsoft Certified: Identity and Access Administrator Associate","issuer":"Microsoft","status":"Earned"},{"name":"Microsoft Certified: Azure Fundamentals","issuer":"Microsoft","status":"Earned"},{"name":"ITIL Foundation Level","issuer":"PeopleCert","status":"Earned"},{"name":"AZ-300: Microsoft Azure Architect Technologies","issuer":"Microsoft","status":"Earned"},{"name":"AI-901: Microsoft Azure AI Fundamentals","issuer":"Microsoft","date":"Target: 2026","status":"Planned"},{"name":"AI-103: Azure AI Apps and Agents Developer Associate","issuer":"Microsoft","date":"Target: 2026","status":"Planned"},{"name":"AB-100: Agentic AI Business Solutions Architect","issuer":"Microsoft","date":"Target: 2026","status":"Planned"},{"name":"PL-400: Power Platform Developer Associate","issuer":"Microsoft","date":"Target: 2026","status":"Planned"}]'::jsonb,
  '[{"name":"React","icon":"React"},{"name":"Javascript","icon":"Javascript"},{"name":"Nextjs","icon":"Nextjs"},{"name":"Python","icon":"Python"},{"name":"Html5","icon":"Html5"},{"name":"CSS3","icon":"CSS3"},{"name":"Supabase","icon":"Supabase"},{"name":"Docker","icon":"Docker"},{"name":"Kubernetes","icon":"Kubernetes"},{"name":"Cloudflare","icon":"Cloudflare"},{"name":"Nginx","icon":"Nginx"},{"name":"Tailwind","icon":"Tailwind"},{"name":"Typescript","icon":"Typescript"},{"name":"ReactNative","icon":"ReactNative"},{"name":"Postgresql","icon":"Postgresql"},{"name":"Mysql","icon":"Mysql"},{"name":"NodeJs","icon":"NodeJs"},{"name":"K6","icon":"K6"},{"name":"Azure","icon":"Azure"},{"name":"AWS","icon":"AWS"},{"name":"Selenium","icon":"Selenium"},{"name":"Playwright","icon":"Playwright"},{"name":"Terraform","icon":"Terraform"},{"name":"Ansible","icon":"Ansible"},{"name":"Git","icon":"Git"},{"name":"Postman","icon":"Postman"}]'::jsonb
)
on conflict (id) do update
set headline = excluded.headline,
    summary = excluded.summary,
    work = excluded.work,
    education = excluded.education,
    skills = excluded.skills,
    certifications = excluded.certifications,
    languages_frameworks = excluded.languages_frameworks;
