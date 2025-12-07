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
  'primary', 'Software Engineer',
  'Blend of QA, platform, and full-stack experience; focused on reliable delivery and clear communication across teams.',
  '[{"role":"Software Engineer","company":"Portage CyberTech","dates":"Apr 2021 – Present","bullets":["Developed and maintained automated tests (Playwright) improving coverage by 50% and reducing execution time by 30%","Integrated automated tests into CI/CD (GitLab) to keep releases fast and stable","Collaborated with engineers/product to define automation strategies and ensure feature coverage","Implemented k6 load testing to cut performance incidents by ~50% and catch regressions earlier","Conducted code reviews to improve test maintainability and reduce cycle time by 10%"]},{"role":"Customer Support Specialist","company":"Portage CyberTech","dates":"Jun 2020 – Apr 2021","bullets":["Maintained 98% CSAT and reduced resolution time by 25% through better triage and troubleshooting","Created FAQ/process docs to cut repeat inquiries, reducing backlog by ~30%"]},{"role":"IT Support Specialist","company":"Digital Solutions Limited","dates":"Jul 2012 – Aug 2018","bullets":["Delivered on-site and remote IT support, resolving 95% of tickets within SLA","Trained 50+ staff on new hardware/software, reducing related support requests by 30%","Resolved 100+ network issues (LAN/Wi-Fi/Internet), cutting connectivity downtime by 25%","Documented software policies and asset procedures, improving access to resources and reducing troubleshooting time by 15%"]}]'::jsonb,
  '[{"school":"University of Nigeria, Nsukka","degree":"Bachelors in Electrical Engineering","dates":""},{"school":"BrainStation","degree":"Diploma in Software Engineering","dates":""}]'::jsonb,
  array['User Authentication','Database Management','Performance Testing','Security Testing','Application Monitoring','CI/CD','Identity and Access Management'],
  '[{"name":"Azure Fundamentals","issuer":"Microsoft","date":"Dec 2023"}]'::jsonb,
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
