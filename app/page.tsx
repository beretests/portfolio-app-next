"use client";

import HeroSection from "./components/HeroSection";
import { Button } from "@mui/material";
import { VisitorCounter } from "./components/VisitorCounter";
//  bg-gradient-radial from-[#4B4C7A] to-[#1D1842]
export default function Home() {
  return (
    <div className="font-[family-name:var(--font-headings)] h-[82vh] flex flex-col">
      <HeroSection />
      <section className="pt-16 flex justify-center items-center h-[30vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to my portfolio website!
          </h2>
          <div className="text-gray-400">
            <VisitorCounter />
          </div>

          <p>Thanks for stopping by 😍!</p>
          <div className="flex flex-col md:flex-row md:gap-4 justify-center">
            <Button href="/resume" className="pb-2">
              My resume
            </Button>
            <Button href="/projects">My projects</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
