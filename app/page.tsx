"use client";

import HeroSection from "./components/HeroSection";
import { Button } from "@mui/material";
import { VisitorCounter } from "./components/VisitorCounter";
//  bg-gradient-radial from-[#4B4C7A] to-[#1D1842]
export default function Home() {
  return (
    <div className="font-[family-name:var(--font-headings)] h-screen flex flex-col">
      <HeroSection />
      <section className="pt-16 flex justify-center items-center">
        <div className="grid text-center justify-items-center content-center ">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to my portfolio website!
          </h2>
          <div className="text-gray-400">
            <VisitorCounter />
          </div>

          <p className="pt-2 mb-6">Thanks for stopping by 😍!</p>
          <div className="flex flex-col gap-6 md:flex-row md:gap-4 pt-4 justify-center">
            <Button
              href="/resume"
              variant="contained"
              color="secondary"
              className="pb-2 font-[family-name:var(--font-cta)] px-4 font-semibold"
            >
              My resume
            </Button>
            <Button
              href="/projects"
              variant="contained"
              color="secondary"
              className="font-[family-name:var(--font-cta)] font-foreground px-4 font-semibold"
            >
              My projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
