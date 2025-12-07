"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

type Status = "Live" | "WIP" | "Not Started";

export default function AdminProjectsPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("WIP");
  const [gifUrl, setGifUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [overview, setOverview] = useState("");
  const [goals, setGoals] = useState("");
  const [designDecisions, setDesignDecisions] = useState("");
  const [techStack, setTechStack] = useState("");
  const [challenges, setChallenges] = useState("");
  const [learnings, setLearnings] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [kind, setKind] = useState<"success" | "error" | "info">("info");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [projectsList, setProjectsList] = useState<
    { id: string; name: string; status?: Status; gifUrl?: string; liveUrl?: string; githubUrl?: string; overview?: string; goals?: string[]; designDecisions?: string[]; techStack?: string[]; challenges?: { title: string; solution: string }[]; learnings?: string[] }[]
  >([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/blog/admin/projects/list", {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.projects) {
          setProjectsList(json.projects);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoadingList(false);
      }
    };
    loadProjects();
  }, []);

  const loadProject = (projId: string) => {
    const proj = projectsList.find((p) => p.id === projId);
    if (!proj) {
      resetForm();
      return;
    }
    setId(proj.id);
    setName(proj.name);
    setStatus((proj.status as Status) || "WIP");
    setGifUrl(proj.gifUrl || "");
    setLiveUrl(proj.liveUrl || "");
    setGithubUrl(proj.githubUrl || "");
    setOverview(proj.overview || "");
    setGoals((proj.goals || []).join("\n"));
    setDesignDecisions((proj.designDecisions || []).join("\n"));
    setTechStack((proj.techStack || []).join(", "));
    setChallenges(
      (proj.challenges || [])
        .map((c) => `${c.title} | ${c.solution}`)
        .join("\n")
    );
    setLearnings((proj.learnings || []).join("\n"));
  };

  const resetForm = () => {
    setSelectedProjectId("");
    setId("");
    setName("");
    setStatus("WIP");
    setGifUrl("");
    setLiveUrl("");
    setGithubUrl("");
    setOverview("");
    setGoals("");
    setDesignDecisions("");
    setTechStack("");
    setChallenges("");
    setLearnings("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setKind("info");
    setStatusMsg("Saving project...");
    setSnackbarOpen(true);

    const payload = {
      id: id || uuidv4(),
      name,
      status,
      gifUrl,
      liveUrl,
      githubUrl,
      overview,
      goals: goals
        ? goals.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
      designDecisions: designDecisions
        ? designDecisions.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
      techStack: techStack
        ? techStack.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      challenges: challenges
        ? challenges
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
              const [title, ...rest] = line.split("|");
              return {
                title: title?.trim() || "",
                solution: rest.join("|").trim() || "",
              };
            })
        : [],
      learnings: learnings
        ? learnings.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    const res = await fetch("/api/blog/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setKind("error");
      setStatusMsg(json.error || "Failed to save project");
      setSnackbarOpen(true);
      return;
    }

    setKind("success");
    setStatusMsg("Project saved");
    resetForm();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="uppercase text-xs tracking-wide text-foreground/70 font-[family-name:var(--font-cta)]">
            Blog Admin
          </p>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-headings)]">
            Add / Update Project
          </h1>
        </div>
        <a
          href="/projects"
          className="rounded border border-borderSecondary bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-hover transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
        >
          ← Back to projects
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-borderSecondary bg-background p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-foreground mb-1">
              Load existing project
            </label>
            <select
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                loadProject(e.target.value);
              }}
              value={selectedProjectId}
              disabled={loadingList}
            >
              <option value="">Select a project to edit…</option>
              {loadingList ? (
                <option>Loading projects…</option>
              ) : (
                projectsList.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))
              )}
            </select>
            {loadingList && (
              <div className="mt-2 space-y-2">
                <Skeleton height={32} />
                <Skeleton width="70%" height={28} />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="rounded bg-foreground text-background px-3 py-2 text-sm font-semibold hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
          >
            Clear
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              ID (optional)
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Leave empty to auto-generate"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Name
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Status
            </label>
            <select
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="Live">Live</option>
              <option value="WIP">WIP</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Thumbnail URL
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Live URL
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              GitHub URL
            </label>
            <input
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Overview
          </label>
          <textarea
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            Tech Stack (comma separated)
          </label>
          <input
            className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, Next.js, Supabase"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Goals (one per line)
            </label>
            <textarea
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Design Decisions (one per line)
            </label>
            <textarea
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              value={designDecisions}
              onChange={(e) => setDesignDecisions(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Challenges (one per line, format: Title | Solution)
            </label>
            <textarea
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Handling latency | Cached requests and added retries"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Learnings (one per line)
            </label>
            <textarea
              className="w-full rounded border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded bg-primary text-background px-4 py-2 font-semibold hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
        >
          Save Project
        </button>

        {statusMsg && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handleSnackbarClose}
              severity={kind}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {statusMsg}
            </MuiAlert>
          </Snackbar>
        )}
      </form>
    </div>
  );
}
