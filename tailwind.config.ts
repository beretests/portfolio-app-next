import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      // },
      // Theme colors are defined once in app/theme.css and consumed via CSS variables
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
        resume: "var(--resume)",
      },
    },
  },
  plugins: [require("@khoohaoyit/tailwind-grid-center")],
};
export default config;
