-- Run this once in the Supabase SQL editor before deploying the analytics UI.
-- It stores only one record for each visitor/page pair so repeat visits do not
-- inflate unique visitor counts.

create table if not exists public.page_visitors (
  visitor_id uuid not null,
  page_path text not null check (
    char_length(page_path) between 1 and 2048
    and page_path like '/%'
  ),
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  primary key (visitor_id, page_path)
);

create index if not exists page_visitors_page_path_idx
  on public.page_visitors (page_path);

create index if not exists page_visitors_last_seen_idx
  on public.page_visitors (last_seen desc);

alter table public.page_visitors enable row level security;
revoke all on table public.page_visitors from anon, authenticated;

create or replace function public.get_analytics_summary()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'siteUniqueVisitors', (select count(*) from public.visitors),
    'blogUniqueVisitors', (
      select count(distinct visitor_id)
      from public.page_visitors
      where page_path ~ '^/blog/[^/]+$'
        and page_path not in ('/blog/admin', '/blog/editor')
    ),
    'blogPosts', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'path', post_counts.page_path,
            'uniqueVisitors', post_counts.unique_visitors,
            'lastViewedAt', post_counts.last_viewed_at
          )
          order by post_counts.unique_visitors desc, post_counts.last_viewed_at desc
        )
        from (
          select
            page_path,
            count(*) as unique_visitors,
            max(last_seen) as last_viewed_at
          from public.page_visitors
          where page_path ~ '^/blog/[^/]+$'
            and page_path not in ('/blog/admin', '/blog/editor')
          group by page_path
        ) as post_counts
      ),
      '[]'::jsonb
    )
  );
$$;

revoke all on function public.get_analytics_summary() from public, anon, authenticated;
grant execute on function public.get_analytics_summary() to service_role;
