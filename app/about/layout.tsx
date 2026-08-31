import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Eberechi Omeje, a Power Platform engineer, Microsoft Azure solutions architect and full-stack software engineer in Canada.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
