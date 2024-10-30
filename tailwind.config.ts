import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        highlight: "var(--highlight)",
        borderPrimary: "var(--border-primary)",
        borderSecondary: "var(--border-secondary)",
        link: "var(--link)",
        success: "var(--success)",
        hover: "var(--hover)",
        active: "var(--active)",
        error: "var(--error)",
        warning: "var(--warning)",
        divider: "var(--divider)",
      },
    },
  },
  plugins: [],
};
export default config;
