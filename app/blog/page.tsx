"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  date: string;
  body: string;
};

const tagColors: Record<string, string> = {
  Engineering: "bg-primary/15 text-primary",
  Product: "bg-highlight/20 text-active",
  Design: "bg-secondary text-foreground",
  Cloud: "bg-link/20 text-link",
  Career: "bg-success/15 text-success",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadPosts = async () => {
      try {
        const res = await fetch("/api/blog/posts");
        if (!res.ok) {
          throw new Error("Failed to load posts");
        }
        const json = (await res.json()) as { posts: Post[] };
        if (isMounted) {
          setPosts(json.posts ?? []);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load posts");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.tag)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) => post.tag === activeTag);
  }, [activeTag, posts]);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/70 to-background border border-borderPrimary shadow-md p-8 mb-10">
        <p className="uppercase text-sm tracking-wide text-foreground/80 font-[family-name:var(--font-cta)]">
          Blog
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-headings)] mt-2">
          Ideas on engineering, testing, and building calm products
        </h1>
        <p className="text-foreground/80 md:text-lg mt-3 max-w-3xl font-[family-name:var(--font-body)]">
          Notes from the field on automation, performance, and product delivery—all
          aligned with the same palette and typography as the rest of the site.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "bg-primary text-background border-primary"
                  : "bg-background text-foreground border-borderSecondary hover:border-borderPrimary hover:bg-hover"
              }`}
              aria-pressed={isActive}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {loading && (
        <p className="text-foreground/70 font-[family-name:var(--font-body)]">
          Loading posts...
        </p>
      )}

      {error && (
        <p className="text-error font-[family-name:var(--font-body)]">
          {error}
        </p>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <p className="text-foreground/70 font-[family-name:var(--font-body)]">
          No posts found.
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group h-full rounded-xl border border-borderSecondary bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-t-xl border-b border-borderSecondary">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${tagColors[post.tag] ?? "bg-borderSecondary text-foreground"}`}
                >
                  {post.tag}
                </div>
                <h2 className="text-xl font-semibold text-foreground font-[family-name:var(--font-headings)] leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-foreground/80 font-[family-name:var(--font-body)]">
                  {post.description}
                </p>
                <p className="text-xs text-foreground/70 font-[family-name:var(--font-body)] mt-1">
                  {post.date}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-link hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read more
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
