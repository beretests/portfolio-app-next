"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LoadingGrid from "../components/LoadingGrid";
import {
  formatBlogDate,
  getReadingTime,
  type BlogPost,
} from "@/lib/blog";

const tagColors: Record<string, string> = {
  "Azure Architecture": "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Engineering: "bg-primary/15 text-primary",
  Product: "bg-highlight/20 text-active",
  Design: "bg-secondary text-foreground",
  Cloud: "bg-link/20 text-link",
  Career: "bg-success/15 text-success",
};

function PostArtwork({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (post.image) {
    return (
      <Image
        src={post.image}
        alt=""
        fill
        sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-sky-950 via-blue-800 to-cyan-500">
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/25 bg-white/10" />
      <div className="absolute bottom-5 left-5 right-5">
        <p className="font-[family-name:var(--font-cta)] text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
          Field note
        </p>
        <p className="mt-2 max-w-md font-[family-name:var(--font-headings)] text-2xl font-bold text-white sm:text-3xl">
          Event-driven Azure architecture
        </p>
      </div>
    </div>
  );
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-xs font-semibold text-foreground/65">
      {formatBlogDate(post.date)} · {getReadingTime(post.body)} min read
    </p>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch("/api/blog/posts", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("The blog could not be loaded.");

        const payload = (await response.json()) as { posts: BlogPost[] };
        setPosts(payload.posts ?? []);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "The blog could not be loaded."
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.tag)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tag === activeTag;
      const matchesQuery =
        !normalizedQuery ||
        [post.title, post.description, post.tag].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      return matchesTag && matchesQuery;
    });
  }, [activeTag, posts, query]);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <header className="rounded-3xl border border-borderPrimary bg-gradient-to-br from-primary/12 via-background to-secondary/70 p-7 shadow-sm sm:p-10">
        <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Engineering field notes
        </p>
        <h1 className="mt-3 max-w-4xl text-balance font-[family-name:var(--font-headings)] text-4xl font-bold text-foreground sm:text-5xl">
          Architecture decisions, delivery patterns and lessons from the work
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/75">
          Practical writing on Power Platform engineering, Microsoft Azure
          architecture and full-stack software delivery—focused on the trade-offs
          behind reliable systems.
        </p>
      </header>

      <section aria-label="Filter articles" className="mt-8 space-y-4">
        <label className="block max-w-xl">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic or technology"
            className="w-full rounded-xl border border-borderSecondary bg-background px-4 py-3 text-foreground shadow-sm outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "border-primary bg-primary text-background"
                    : "border-borderSecondary bg-background text-foreground hover:bg-hover"
                }`}
                aria-pressed={isActive}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {loading && <div className="mt-8"><LoadingGrid /></div>}

      {error && (
        <div className="mt-8 rounded-xl border border-error/30 bg-error/10 p-5 text-error">
          {error} Please try again shortly.
        </div>
      )}

      {!loading && !error && !featuredPost && (
        <div className="mt-8 rounded-xl border border-borderSecondary bg-secondary/30 p-8 text-center">
          <h2 className="font-[family-name:var(--font-headings)] text-xl font-bold text-foreground">
            No matching articles
          </h2>
          <p className="mt-2 text-foreground/70">
            Try another search term or choose a different topic.
          </p>
        </div>
      )}

      {!loading && !error && featuredPost && (
        <>
          <article className="group mt-10 grid overflow-hidden rounded-2xl border border-borderSecondary bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-64 border-b border-borderSecondary md:min-h-96 md:border-b-0 md:border-r">
              <PostArtwork post={featuredPost} featured />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${tagColors[featuredPost.tag] ?? "bg-secondary text-foreground"}`}>
                {featuredPost.tag}
              </span>
              <h2 className="mt-4 text-balance font-[family-name:var(--font-headings)] text-3xl font-bold leading-tight text-foreground">
                {featuredPost.title}
              </h2>
              <p className="mt-4 leading-7 text-foreground/75">
                {featuredPost.description}
              </p>
              <div className="mt-5"><PostMeta post={featuredPost} /></div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-[family-name:var(--font-cta)] text-sm font-bold text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Read the field note <span aria-hidden>→</span>
              </Link>
            </div>
          </article>

          {remainingPosts.length > 0 && (
            <section aria-labelledby="more-articles" className="mt-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.16em] text-primary">
                    More writing
                  </p>
                  <h2 id="more-articles" className="mt-1 font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground">
                    Browse the archive
                  </h2>
                </div>
                <span className="text-sm font-semibold text-foreground/60">
                  {filteredPosts.length} articles
                </span>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <article key={post.slug} className="group flex h-full flex-col overflow-hidden rounded-xl border border-borderSecondary bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/9] border-b border-borderSecondary">
                      <PostArtwork post={post} />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${tagColors[post.tag] ?? "bg-secondary text-foreground"}`}>
                        {post.tag}
                      </span>
                      <h3 className="mt-3 font-[family-name:var(--font-headings)] text-xl font-bold leading-tight text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/75">
                        {post.description}
                      </p>
                      <div className="mt-4"><PostMeta post={post} /></div>
                      <Link href={`/blog/${post.slug}`} className="mt-auto pt-5 text-sm font-bold text-link transition hover:text-primary">
                        Read article <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
