"use client";

import { useState } from "react";
import Markdown from "markdown-to-jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function BlogEditorPage() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<{
    message: string;
    kind: "success" | "error" | "info";
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: "Saving...", kind: "info" });
    setSnackbarOpen(true);
    const res = await fetch("/api/blog/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        description,
        tag,
        image,
        date,
        body,
      }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setStatus({
        message: json.error || "Failed to save post",
        kind: "error",
      });
      setSnackbarOpen(true);
      return;
    }
    setStatus({ message: "Saved!", kind: "success" });
    setSnackbarOpen(true);
    setSlug("");
    setTitle("");
    setDescription("");
    setTag("");
    setImage("");
    setDate("");
    setBody("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus({ message: "Uploading image...", kind: "info" });
    setSnackbarOpen(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/admin/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus({
        message: json.error || "Image upload failed",
        kind: "error",
      });
      setSnackbarOpen(true);
      setUploading(false);
      return;
    }

    setImage(json.publicUrl);
    setStatus({ message: "Image uploaded and URL set", kind: "success" });
    setSnackbarOpen(true);
    setUploading(false);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 grid gap-8 lg:grid-cols-2">
      <div className="lg:col-span-2 flex justify-end">
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            className="rounded border border-borderSecondary bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-hover transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
          >
            ← Back to blog
          </a>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-borderSecondary bg-background p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Slug
          </label>
          <input
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Title
          </label>
          <input
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Description
          </label>
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Tag
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Image URL
          </label>
          <input
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <div className="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="text-sm"
            />
            {uploading && (
              <span className="text-sm text-foreground/70">Uploading…</span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Body (Markdown)
          </label>
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-primary text-background px-4 py-2 font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
        >
          Save Post
        </button>
        {status && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity={status.kind}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {status.message}
            </MuiAlert>
          </Snackbar>
        )}
      </form>

      <div className="rounded-xl border border-borderSecondary bg-background p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Live Preview
        </h2>
        <div className="prose prose-sm max-w-none text-foreground">
          <Markdown>{body || "_Start typing markdown to preview…_"}</Markdown>
        </div>
      </div>
    </div>
  );
}
