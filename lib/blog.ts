export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image?: string | null;
  date: string;
  body: string;
  source?: "code" | "database";
};

export function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatBlogDate(date: string) {
  const parsed = new Date(`${date.slice(0, 10)}T12:00:00Z`);

  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function sortPostsByDate(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function mergeBlogPosts(
  curated: BlogPost[],
  database: BlogPost[]
) {
  const posts = new Map<string, BlogPost>();

  curated.forEach((post) => posts.set(post.slug, { ...post, source: "code" }));
  database.forEach((post) => {
    if (!posts.has(post.slug)) {
      posts.set(post.slug, { ...post, source: "database" });
    }
  });

  return sortPostsByDate(Array.from(posts.values()));
}
