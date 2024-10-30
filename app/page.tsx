"use client";

import HeroSection from "./components/HeroSection";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import { getUniquePageViews } from "../lib/tracking";
import { incrementPageCounter } from "@/lib/pageCounter";

export default function Home() {
  const [pageLoads, setPageLoads] = useState(0);

  useEffect(() => {
    setPageLoads(incrementPageCounter("/"));
  }, []);
  // const [visitCount, setVisitCount] = useState(0);

  // useEffect(() => {
  //   // const pageKey = "visited-page-unique-key";
  //   // if (!sessionStorage.getItem(pageKey)) {
  //   //   sessionStorage.setItem(pageKey, "true");
  //   //   // Call your API to increment the page load count
  //   //   fetch("/api/incrementPageCount", { method: "POST" });
  //   // }
  // }, []);
  // const initialCount = await getUniquePageViews("/");
  return (
    <div className="font-[family-name:var(--font-headings)] h-[82vh] flex flex-col">
      <HeroSection />
      <section className="pt-16 flex justify-center items-center h-[30vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to my portfolio website!
          </h2>
          <p className="text-gray-600">
            You're visitor number {pageLoads}
            {/* <UniquePageViewsCounter initialCount={initialCount} /> */}
            {/* {Math.floor(Math.random() * 10000) + 1} */}
          </p>

          <p>Thanks for stopping by!</p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button href="/resume" className="pb-2">
              My resume
            </Button>
            <Button href="/projects">My projects</Button>
            <Button href="/contact">Contact me</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
