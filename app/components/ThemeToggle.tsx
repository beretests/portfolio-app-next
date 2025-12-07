"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Avoid SSR hydration mismatch by resolving preference in an effect.
  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return; // respect explicit user choice
      const nextTheme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  const isDark = theme === "dark";
  const label = useMemo(
    () => (isDark ? "Switch to light theme" : "Switch to dark theme"),
    [isDark]
  );

  const handleToggle = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isDark}
      aria-label={label}
      className="ml-3 inline-flex items-center rounded-full border border-borderSecondary bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-borderPrimary hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-primary" aria-hidden />
      {isDark ? "Dark" : "Light"} mode
    </button>
  );
}
