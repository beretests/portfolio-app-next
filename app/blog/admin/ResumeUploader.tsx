"use client";

import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

type WorkItem = { role: string; company: string; dates: string; bullets: string[] };
type EducationItem = { school: string; degree: string; dates: string; details?: string };
type CertificationItem = { name: string; issuer?: string; date?: string };
type LangFramework = { name: string; icon?: string | null };

export default function AdminResumeUploader() {
  const [status, setStatus] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("info");
  const [saving, setSaving] = useState(false);

  const [headline, setHeadline] = useState("Software Engineer");
  const [summary, setSummary] = useState("");
  const [work, setWork] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/resume/admin/content", {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.content) {
          const c = json.content;
          setHeadline(c.headline || "Software Engineer");
          setSummary(c.summary || "");
          setWork(JSON.stringify(c.work || [], null, 2));
          setEducation(JSON.stringify(c.education || [], null, 2));
          setSkills((c.skills || []).join(", "));
          setCertifications(JSON.stringify(c.certifications || [], null, 2));
          setLanguages(JSON.stringify(c.languages_frameworks || [], null, 2));
        }
      } catch (err) {
        console.error("Failed to load resume content", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const parseJson = <T,>(value: string, fallback: T): T => {
    if (!value.trim()) return fallback;
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("Saving resume content...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    const payload = {
      headline,
      summary,
      work: parseJson<WorkItem[]>(work, []),
      education: parseJson<EducationItem[]>(education, []),
      skills: skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      certifications: parseJson<CertificationItem[]>(certifications, []),
      languages_frameworks: parseJson<LangFramework[]>(languages, []),
    };

    const res = await fetch("/api/resume/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(json.error || "Failed to save resume content");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSaving(false);
      return;
    }
    setStatus("Resume content saved");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setSaving(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSave}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">
            Headline
          </label>
          <p className="text-xs text-foreground/70 mb-2">Short role/branding line.</p>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">
            Summary
          </label>
          <p className="text-xs text-foreground/70 mb-2">One–two sentence professional summary.</p>
          {loading ? (
            <Skeleton height={90} />
          ) : (
            <textarea
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">
          Work (JSON array)
        </label>
        <p className="text-xs text-foreground/70 mb-2">
          Format: [{`{"role":"","company":"","dates":"","bullets":["..."]}`}]
        </p>
        {loading ? (
          <Skeleton height={140} />
        ) : (
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            rows={6}
            value={work}
            onChange={(e) => setWork(e.target.value)}
            placeholder='[{"role":"","company":"","dates":"","bullets":["..."]}]'
          />
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">
          Education (JSON array)
        </label>
        <p className="text-xs text-foreground/70 mb-2">
          Format: [{`{"school":"","degree":"","dates":"","details":""}`}] (details optional)
        </p>
        {loading ? (
          <Skeleton height={110} />
        ) : (
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            rows={4}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder='[{"school":"","degree":"","dates":"","details":""}]'
          />
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">
          Skills (comma separated)
        </label>
        <p className="text-xs text-foreground/70 mb-2">Example: React, Next.js, TypeScript.</p>
        {loading ? (
          <Skeleton height={40} />
        ) : (
          <input
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Next.js, TypeScript"
          />
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">
          Certifications (JSON array)
        </label>
        <p className="text-xs text-foreground/70 mb-2">
          Format: [{`{"name":"","issuer":"","date":""}`}]
        </p>
        {loading ? (
          <Skeleton height={90} />
        ) : (
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            rows={3}
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            placeholder='[{"name":"","issuer":"","date":""}]'
          />
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">
          Languages & Frameworks (JSON array)
        </label>
        <p className="text-xs text-foreground/70 mb-2">
          Format: [{`{"name":"","icon":""}`}], where icon matches Skills icons (e.g., React, Javascript, Nextjs, Python).
        </p>
        {loading ? (
          <Skeleton height={110} />
        ) : (
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            rows={4}
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder='[{"name":"React","icon":"React"}]'
          />
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-primary text-background px-4 py-2 font-semibold hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Resume Content"}
      </button>

      {status && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {status}
          </MuiAlert>
        </Snackbar>
      )}
    </form>
  );
}
