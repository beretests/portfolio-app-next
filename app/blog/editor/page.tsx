"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Markdown from "markdown-to-jsx";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { formatBlogDate, getReadingTime, type BlogPost } from "@/lib/blog";

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  description: "",
  tag: "",
  image: "",
  date: new Date().toISOString().slice(0, 10),
  body: "",
  source: "database",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function BlogEditorPage() {
  const [post, setPost] = useState<BlogPost>(emptyPost);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    kind: "success" | "error" | "info";
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const notify = (message: string, kind: "success" | "error" | "info") => {
    setStatus({ message, kind });
    setSnackbarOpen(true);
  };

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch("/api/blog/posts", { cache: "no-store" });
      if (response.status === 401) {
        window.location.href = "/blog/admin/sign-in";
        return;
      }
      if (!response.ok) throw new Error("Could not load existing posts");
      const payload = (await response.json()) as { posts: BlogPost[] };
      setPosts(payload.posts ?? []);
    } catch (error) {
      notify(error instanceof Error ? error.message : "Could not load posts", "error");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const databasePosts = useMemo(
    () => posts.filter((item) => item.source !== "code"),
    [posts]
  );

  const curatedPosts = useMemo(
    () => posts.filter((item) => item.source === "code"),
    [posts]
  );

  const tags = useMemo(
    () => Array.from(new Set(posts.map((item) => item.tag).filter(Boolean))),
    [posts]
  );

  const updateField = <K extends keyof BlogPost>(field: K, value: BlogPost[K]) => {
    setPost((current) => ({ ...current, [field]: value }));
  };

  const handleTitleChange = (title: string) => {
    setPost((current) => ({
      ...current,
      title,
      slug: slugEdited ? current.slug : slugify(title),
    }));
  };

  const startNewPost = () => {
    setPost({ ...emptyPost, date: new Date().toISOString().slice(0, 10) });
    setSelectedSlug("");
    setSlugEdited(false);
  };

  const selectPost = (slug: string) => {
    setSelectedSlug(slug);
    const existing = databasePosts.find((item) => item.slug === slug);
    if (existing) {
      setPost(existing);
      setSlugEdited(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    notify("Saving article…", "info");

    try {
      const response = await fetch("/api/blog/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const payload = await response.json().catch(() => ({}));

      if (response.status === 401) {
        window.location.href = "/blog/admin/sign-in";
        return;
      }
      if (!response.ok) throw new Error(payload.error || "Failed to save article");

      notify("Article saved", "success");
      setSelectedSlug(post.slug);
      setSlugEdited(true);
      await loadPosts();
    } catch (error) {
      notify(error instanceof Error ? error.message : "Failed to save article", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    notify("Uploading image…", "info");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/blog/admin/upload", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => ({}));

      if (response.status === 401) {
        window.location.href = "/blog/admin/sign-in";
        return;
      }
      if (!response.ok) throw new Error(payload.error || "Image upload failed");

      updateField("image", payload.publicUrl);
      notify("Image uploaded", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-[family-name:var(--font-cta)] text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Blog administration
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground">
            Write and update field notes
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">
            Supabase posts can be edited here. Code-managed case-study articles are
            listed for reference and updated through the portfolio source.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={startNewPost} className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-background transition hover:opacity-90">
            New article
          </button>
          <Link href="/blog" className="rounded-md border border-borderSecondary bg-background px-4 py-2 text-sm font-bold text-foreground transition hover:bg-hover">
            View blog
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border border-borderSecondary bg-background p-4 shadow-sm">
          <h2 className="font-[family-name:var(--font-headings)] text-lg font-bold text-foreground">
            Existing articles
          </h2>
          {loadingPosts ? (
            <p className="mt-4 text-sm text-foreground/65">Loading…</p>
          ) : (
            <div className="mt-4 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/55">Editable</p>
                <div className="mt-2 space-y-2">
                  {databasePosts.length === 0 && <p className="text-sm text-foreground/60">No Supabase posts yet.</p>}
                  {databasePosts.map((item) => (
                    <button key={item.slug} type="button" onClick={() => selectPost(item.slug)} className={`w-full rounded-lg border p-3 text-left transition ${selectedSlug === item.slug ? "border-primary bg-primary/10" : "border-borderSecondary hover:bg-hover"}`}>
                      <span className="block text-sm font-bold text-foreground">{item.title}</span>
                      <span className="mt-1 block text-xs text-foreground/60">{formatBlogDate(item.date)} · {item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {curatedPosts.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground/55">Code managed</p>
                  <div className="mt-2 space-y-2">
                    {curatedPosts.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className="block rounded-lg border border-borderSecondary p-3 transition hover:bg-hover">
                        <span className="block text-sm font-bold text-foreground">{item.title}</span>
                        <span className="mt-1 block text-xs text-primary">Open article →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-borderSecondary bg-background p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-headings)] text-xl font-bold text-foreground">
              {selectedSlug ? "Edit article" : "New article"}
            </h2>
            <span className="text-xs font-semibold text-foreground/60">{getReadingTime(post.body)} min read</span>
          </div>

          <label className="block text-sm font-bold text-foreground">
            Title
            <input value={post.title} onChange={(event) => handleTitleChange(event.target.value)} required className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <label className="block text-sm font-bold text-foreground">
            Slug
            <input value={post.slug} onChange={(event) => { setSlugEdited(true); updateField("slug", slugify(event.target.value)); }} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-mono text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <label className="block text-sm font-bold text-foreground">
            Description
            <textarea value={post.description} onChange={(event) => updateField("description", event.target.value)} rows={3} required className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-bold text-foreground">
              Topic
              <input list="blog-tags" value={post.tag} onChange={(event) => updateField("tag", event.target.value)} required className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <datalist id="blog-tags">{tags.map((tag) => <option key={tag} value={tag} />)}</datalist>
              <span className="mt-1 block text-xs font-normal text-foreground/55">Use “Testing” to keep a draft out of the public blog.</span>
            </label>
            <label className="block text-sm font-bold text-foreground">
              Publication date
              <input type="date" value={post.date.slice(0, 10)} onChange={(event) => updateField("date", event.target.value)} required className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
          </div>

          <label className="block text-sm font-bold text-foreground">
            Image URL
            <input type="url" value={post.image ?? ""} onChange={(event) => updateField("image", event.target.value)} required className="mt-1 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="block w-full text-sm text-foreground/70 file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:font-bold file:text-foreground" />

          <label className="block text-sm font-bold text-foreground">
            Article body (Markdown)
            <textarea value={post.body} onChange={(event) => updateField("body", event.target.value)} rows={18} required className="mt-1 min-h-80 w-full rounded-md border border-borderSecondary bg-background px-3 py-2.5 font-mono text-sm font-normal leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <button type="submit" disabled={saving || uploading} className="rounded-md bg-primary px-5 py-2.5 font-bold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55">
            {saving ? "Saving…" : selectedSlug ? "Update article" : "Save article"}
          </button>
        </form>

        <section className="h-fit rounded-xl border border-borderSecondary bg-background p-5 shadow-sm sm:p-6 xl:sticky xl:top-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-headings)] text-xl font-bold text-foreground">Preview</h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{post.tag || "Topic"}</span>
          </div>
          <h3 className="mt-5 font-[family-name:var(--font-headings)] text-3xl font-bold leading-tight text-foreground">{post.title || "Your article title"}</h3>
          <p className="mt-3 leading-7 text-foreground/70">{post.description || "A concise description will appear here."}</p>
          <p className="mt-4 text-xs font-semibold text-foreground/55">{formatBlogDate(post.date)} · {getReadingTime(post.body)} min read</p>
          <div className="mt-6 border-t border-divider pt-6 text-foreground">
            <Markdown options={{ overrides: { h2: { props: { className: "mb-3 mt-7 text-2xl font-bold" } }, h3: { props: { className: "mb-2 mt-6 text-xl font-bold" } }, p: { props: { className: "mb-4 leading-7" } }, ul: { props: { className: "mb-4 list-disc space-y-2 pl-5" } }, ol: { props: { className: "mb-4 list-decimal space-y-2 pl-5" } } } }}>
              {post.body || "_Start writing to see the article preview._"}
            </Markdown>
          </div>
        </section>
      </div>

      {status && (
        <Snackbar open={snackbarOpen} autoHideDuration={3500} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <MuiAlert onClose={() => setSnackbarOpen(false)} severity={status.kind} variant="filled" sx={{ width: "100%" }}>
            {status.message}
          </MuiAlert>
        </Snackbar>
      )}
    </main>
  );
}
