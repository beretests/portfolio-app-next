"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function AdminSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("info");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Signing in...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    const res = await fetch("/api/blog/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(json.error || "Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setStatus("Signed in");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    router.push("/blog/editor");
  };

  const handleClose = () => setSnackbarOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/50 to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-borderPrimary bg-background shadow-lg p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="uppercase text-xs tracking-wide text-foreground/70 font-[family-name:var(--font-cta)]">
            Blog Admin
          </p>
          <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-headings)]">
            Sign in
          </h1>
          <p className="text-sm text-foreground/70 font-[family-name:var(--font-body)]">
            Access the markdown editor for blog posts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Username
            </label>
            <input
              className="w-full rounded-lg border border-borderSecondary bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-borderSecondary bg-background px-3 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto h-9 px-2 rounded-md text-sm text-link hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary text-background py-2 font-semibold hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background"
          >
            Sign in
          </button>
          {status && (
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
              <MuiAlert
                onClose={handleClose}
                severity={snackbarSeverity}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {status}
              </MuiAlert>
            </Snackbar>
          )}
        </form>
      </div>
    </div>
  );
}
