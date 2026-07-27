"use client";

import { useCallback, useEffect, useState } from "react";

type BlogPostAnalytics = {
  path: string;
  uniqueVisitors: number;
  lastViewedAt: string;
};

type AnalyticsSummary = {
  siteUniqueVisitors: number;
  blogUniqueVisitors: number;
  blogPosts: BlogPostAnalytics[];
};

function postName(path: string) {
  const slug = path.split("/").filter(Boolean).at(-1) ?? path;
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AnalyticsPanel() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/analytics", { cache: "no-store" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load analytics.");
      }

      setSummary(result);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (loading && !summary) {
    return <p className="text-sm text-foreground/70">Loading analytics…</p>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-error/40 bg-error/10 p-5">
        <h2 className="font-bold text-foreground">Analytics unavailable</h2>
        <p className="mt-2 text-sm text-foreground/80">{error}</p>
        <p className="mt-2 text-sm text-foreground/70">
          Run <code className="rounded bg-background px-1.5 py-0.5">seeds/analytics.sql</code>{" "}
          in the Supabase SQL editor, then refresh this panel.
        </p>
        <button
          type="button"
          onClick={loadAnalytics}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-bold text-background transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!summary) return null;

  const metrics = [
    { label: "Site visitors", value: summary.siteUniqueVisitors },
    { label: "Blog readers", value: summary.blogUniqueVisitors },
    { label: "Posts viewed", value: summary.blogPosts.length },
  ];

  return (
    <section className="space-y-6" aria-labelledby="analytics-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2
            id="analytics-heading"
            className="font-[family-name:var(--font-headings)] text-xl font-bold text-foreground"
          >
            Visitor analytics
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            All-time unique visitors, deduplicated by visitor and page.
          </p>
        </div>
        <button
          type="button"
          onClick={loadAnalytics}
          disabled={loading}
          className="rounded-md border border-borderSecondary bg-background px-3 py-2 text-sm font-bold text-foreground transition hover:bg-hover disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-borderSecondary bg-secondary/30 p-5"
          >
            <p className="text-sm font-semibold text-foreground/65">{metric.label}</p>
            <p className="mt-2 font-[family-name:var(--font-headings)] text-4xl font-bold text-foreground">
              {metric.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-borderSecondary">
        <div className="border-b border-borderSecondary bg-secondary/30 px-5 py-4">
          <h3 className="font-bold text-foreground">Unique visitors by blog post</h3>
        </div>

        {summary.blogPosts.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-foreground/65">
            No blog post visits have been recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-foreground/60">
                <tr>
                  <th className="px-5 py-3 font-semibold">Blog post</th>
                  <th className="px-5 py-3 text-right font-semibold">Visitors</th>
                  <th className="px-5 py-3 text-right font-semibold">Last viewed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderSecondary">
                {summary.blogPosts.map((post) => (
                  <tr key={post.path}>
                    <td className="px-5 py-4">
                      <a
                        href={post.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-link hover:text-primary"
                      >
                        {postName(post.path)}
                      </a>
                      <p className="mt-1 text-xs text-foreground/50">{post.path}</p>
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-foreground">
                      {post.uniqueVisitors.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-foreground/65">
                      {new Date(post.lastViewedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
