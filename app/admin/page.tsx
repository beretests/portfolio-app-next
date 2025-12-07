"use client";

import { useState } from "react";
import BlogEditorPage from "../blog/editor/page";
import AdminProjectsPage from "../blog/admin/projects/page";
import AboutUploader from "../blog/admin/AboutUploader";
import AdminResumeUploader from "../blog/admin/ResumeUploader";

type Tab = "blog" | "projects" | "about" | "resume";

const tabs: { id: Tab; label: string }[] = [
  { id: "blog", label: "Blog" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Images" },
  { id: "resume", label: "Resume" },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("blog");
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await fetch("/api/blog/admin/logout", { method: "POST", credentials: "include" }).catch(() => {});
    window.location.href = "/blog/admin/sign-in";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 min-h-screen">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="uppercase text-xs tracking-wide text-foreground/70 font-[family-name:var(--font-cta)]">
            Admin
          </p>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-headings)]">
            Content Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-end">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-background border-primary"
                    : "bg-background text-foreground border-borderSecondary hover:border-borderPrimary hover:bg-hover"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-full border border-error/70 bg-error/10 px-4 py-2 text-sm font-semibold text-error shadow-[0_0_0_1px_rgba(255,0,0,0.12)] hover:bg-error/15 hover:shadow-[0_4px_12px_rgba(255,0,0,0.15)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-error focus-visible:ring-offset-background disabled:opacity-60"
          >
            <span aria-hidden>⎋</span>
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-borderSecondary bg-background shadow-sm p-4 md:p-6">
        {activeTab === "blog" && <BlogEditorPage />}
        {activeTab === "projects" && <AdminProjectsPage />}
        {activeTab === "about" && (
          <div className="space-y-4">
            <p className="text-sm text-foreground/80 font-[family-name:var(--font-body)]">
              Upload images for the About page carousels.
            </p>
            <AboutUploader />
          </div>
        )}
        {activeTab === "resume" && (
          <div className="space-y-4">
            <p className="text-sm text-foreground/80 font-[family-name:var(--font-body)]">
              Upload a new resume file (PDF or doc).
            </p>
            <AdminResumeUploader />
          </div>
        )}
      </div>
    </div>
  );
}
