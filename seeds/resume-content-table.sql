-- Resume content schema with text primary key
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
