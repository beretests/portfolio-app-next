-- Projects schema and seed data
-- Run in Supabase SQL editor or psql

create table if not exists public.projects (
  id uuid primary key,
  name text not null,
  status text not null default 'WIP',
  gifUrl text,
  liveUrl text,
  githubUrl text,
  overview text not null,
  goals text[] default '{}',
  designDecisions text[] default '{}',
  techStack text[] default '{}',
  challenges jsonb default '[]'::jsonb,
  learnings text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep updated_at fresh on writes
create or replace function public.projects_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.projects_set_updated_at();

insert into public.projects (
  id, name, status, gifUrl, liveUrl, githubUrl,
  overview, goals, designDecisions, techStack, challenges, learnings
)
values
(
  'd128fb21-4477-4126-b47b-cfebacad9e94',
  'Church Choir Repertoire Management App',
  'Live',
  'https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png',
  'https://ctk-songs.beretesting.com/',
  'https://github.com/beretests/choir-repertoire',
  'Built a repertoire manager for a church choir so members can access songs, recordings, and notes on any device. Used it to practice Next.js App Router, TypeScript, and Supabase for real-time data.',
  array[
    'Centralize songs/recordings with easy access for choir members',
    'Streamline upload/distribution of recordings',
    'Practice modern Next.js (App Router) with TypeScript + Supabase'
  ],
  array[
    'Responsive UI with Tailwind for quick iteration across devices',
    'Hierarchical navigation (year → month → date → songs → recordings)',
    'Built-in audio player for browser playback',
    'Supabase for storage and database to simplify real-time updates'
  ],
  array['Next.js','TypeScript','Tailwind CSS','Supabase','React Audio Player','SWR'],
  '[{"title":"Handling large sets of recordings","solution":"Optimized Supabase queries and paging, cached with SWR, and tuned audio loading to avoid blocking the UI."},{"title":"Keeping navigation state predictable","solution":"Modeled the hierarchy in the DB and UI to mirror each other; added guards and defaults to reduce 404s and dead-ends."}]'::jsonb,
  array[
    'App Router patterns for data fetching and caching with SWR',
    'Structuring hierarchical data for predictable navigation',
    'Tuning Supabase storage/DB for media-heavy workloads'
  ]
),
(
  'db8d898d-5c9a-435d-84f4-c049417e5f49',
  'LeetCode Daily Challenge Discord Bot',
  'Live',
  'https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png',
  null,
  'https://github.com/beretests/Useful-python-scripts/blob/discord-leetcode-bot/discord-leetcode/discord-leetcode-db.py',
  'After finishing my software engineering diploma, many developer roles required LeetCode-style assessments. To stay consistent—and encourage peers—I built a Discord bot that automatically posts a daily LeetCode challenge. It was also a chance to deepen Python skills and integrate external APIs and AWS services.',
  array[
    'Automate posting of daily LeetCode challenges to a Discord community',
    'Improve engagement and consistency in coding practice',
    'Learn Discord bot development and strengthen AWS/web scraping skills'
  ],
  array[
    'Discord threads to keep each challenge and discussion organized',
    'DynamoDB to store posted/unposted questions and prevent duplicates',
    'LeetScrape API to retrieve LeetCode question content',
    'Message splitting to handle Discord’s 2,000-character limit',
    'Scheduled tasks to post challenges every 24 hours',
    'Environment variables to keep tokens and credentials secure'
  ],
  array['Python','Discord.py','AWS DynamoDB (Boto3)','LeetScrape','dotenv'],
  '[{"title":"Handling large question text within Discord limits","solution":"Implemented a splitter that breaks long descriptions into smaller messages without breaking formatting to stay under 2,000 characters."},{"title":"Preventing duplicate posts","solution":"Tracked posted/unposted questions in DynamoDB and always fetched the next unposted item before posting."}]'::jsonb,
  array[
    'Practical asynchronous programming in Python',
    'Building Discord bots that integrate AWS and external scraping APIs',
    'Formatting and delivering long content in chat environments',
    'Scheduling background tasks while maintaining data integrity across systems'
  ]
),
(
  '14b93b54-cecd-4f28-8a32-42036f9a95aa',
  'Funstats App',
  'Live',
  'https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png',
  'https://funstats.online',
  'https://github.com/beretests/brainstation-capstone-funstats',
  'Built a sports stats tracker so athletes can log and compare performance. Used it to deepen full-stack skills with React/Express, relational DB design, and Cloudinary for media.',
  array[
    'Create an intuitive interface for athletes to track/compare stats',
    'Practice full-stack development with React + Express + SQL',
    'Integrate third-party media storage (Cloudinary) for profile images'
  ],
  array[
    'Component-based React UI with SASS for styling flexibility',
    'Express API with JWT auth for secure access',
    'Relational schema for users, stats, relationships; Knex.js for queries',
    'Cloudinary for efficient media storage and transformation'
  ],
  array['React','SASS','Express.js','MySQL','Knex.js','Cloudinary','JWT'],
  '[{"title":"Managing performance with growing data","solution":"Optimized queries, added indexes, and tuned API responses to keep comparisons fast even with larger datasets."},{"title":"Keeping authentication secure","solution":"Hardened JWT handling, tightened middleware, and improved error handling around auth flows."}]'::jsonb,
  array[
    'Relational modeling for comparison features and social elements',
    'JWT-based auth patterns in Express',
    'Cloudinary integration and secure media handling',
    'Debugging and performance tuning across React + Express + MySQL'
  ]
),
(
  '15c4b285-82be-4978-b434-fee1e4f5679f',
  'Funstats App - Refactored Project',
  'WIP',
  'https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png',
  null,
  'https://github.com/beretests/funstats-next-app',
  'Refactoring Funstats into a Next.js stack with improved DX.',
  array[
    'Migrate to Next.js for better DX and performance',
    'Refine data model and UI for comparisons',
    'Tighten authentication and API patterns'
  ],
  array[
    'Next.js App Router for routing/data fetching',
    'TypeScript-first components for safer refactors',
    'API rework for clearer domain boundaries'
  ],
  array['Next.js','TypeScript','Supabase'],
  '[]'::jsonb,
  array[]::text[]
),
(
  '3a591773-aa65-4e87-9ed7-a9df5ff5aec0',
  'Funstats App Mobile',
  'Not Started',
  'https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png',
  null,
  null,
  'Mobile version of Funstats to track athlete performance with a modern React Native + Supabase stack.',
  array[
    'Deliver a mobile-first experience for athletes',
    'Support multi-sport stat tracking with real-time updates',
    'Strengthen mobile auth and offline-friendly patterns'
  ],
  array[
    'React Navigation for mobile routing',
    'Flexible schema to accommodate multiple sports and stat types',
    'Zod/form validation for reliable input handling',
    'Tailwind-style utility classes for consistent styling',
    'Supabase real-time for live stat updates'
  ],
  array['React Native','Node.js','Supabase','Zod'],
  '[{"title":"Real-time updates on mobile","solution":"Tuned Supabase subscriptions and minimized payloads to keep UI responsive on slower connections."},{"title":"Authentication state persistence","solution":"Improved token handling and rehydration so sessions survive app restarts."}]'::jsonb,
  array[
    'State management in complex React Native apps',
    'Supabase real-time usage on mobile',
    'Designing flexible schemas for multi-sport stats'
  ]
)
on conflict (id) do update
set name = excluded.name,
    status = excluded.status,
    gifUrl = excluded.gifUrl,
    liveUrl = excluded.liveUrl,
    githubUrl = excluded.githubUrl,
    overview = excluded.overview,
    goals = excluded.goals,
    designDecisions = excluded.designDecisions,
    techStack = excluded.techStack,
    challenges = excluded.challenges,
    learnings = excluded.learnings;
