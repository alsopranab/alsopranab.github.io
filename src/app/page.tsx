"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DataStreamTransition } from "@/components/DataStreamTransition";
import { InsightClock } from "@/components/InsightClock";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Recommendations } from "@/components/Recommendations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MainOverlay } from "@/components/MainOverlay";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen text-text-primary overflow-x-hidden relative">
      <Navbar />
      
      <div className="relative z-10 space-y-0 bg-background">
        {/* Section 1: Hero */}
        <div ref={heroRef} className="relative">
          <Hero />
        </div>

        {/* Transition Bridge */}
        <DataStreamTransition />

        {/* Insight Clock Section */}
        <div className="bg-background">
          <InsightClock />
        </div>

        {/* Middle Sections with Background Overlay */}
        <div className="relative">
          <MainOverlay />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Recommendations />
          <Contact />
        </div>

        {/* Section 3: Footer */}
        <div ref={footerRef} className="relative">
          <Footer />
        </div>
      </div>
    </main>
  );
}
