"use client";

import { EXPERIENCE } from "@/lib/data";
import { CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

export function Experience() {
  const experienceTransition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <section id="experience" className="section-container relative overflow-hidden">
        <div className="flex flex-col mb-16 relative z-10">
          <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
            <div className="w-8 h-[1px] bg-accent/30" /> Professional Journey
          </div>
          <h2 className="section-title">
            Generating insights <br /> 
            <span className="opacity-[var(--muted-opacity)]">that drive real-world impact.</span>
          </h2>
        </div>

      <div className="relative pl-0 md:pl-20">
        <div className="absolute left-[31px] top-0 bottom-0 w-[2px] bg-accent/20 hidden md:block" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              className="relative group"
            >
                <div className="absolute left-[-9px] top-8 w-10 h-10 rounded-full bg-bg border-2 border-accent hidden md:flex items-center justify-center z-20 glow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[12px] font-black">{index + 1}</span>
                </div>

                    <div className="apple-card p-6 md:p-8 cursor-default border-card-border/40 glow-md bg-card-bg/60 backdrop-blur-xl transition-all duration-300 group-hover:border-accent/30">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                      <div className="space-y-2">
                        <div className="text-accent font-black text-[12px] tracking-[0.4em] uppercase opacity-100 mb-1">
                          Milestone 0{index + 1}
                        </div>
                    <h3 className="text-lg md:text-2xl font-black tracking-tighter text-text-primary leading-tight uppercase">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-text-secondary font-black text-[9px] tracking-wider uppercase">
                      <span className="text-text-primary px-3 py-1.5 bg-accent/5 rounded-2xl border border-accent/10">{exp.company}</span>
                      <div className="w-1 h-1 rounded-full bg-accent/40" />
                      <span className="opacity-60">{exp.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-accent font-black text-[8px] tracking-[0.2em] uppercase bg-accent/5 px-4 py-2 rounded-full border border-accent/10 shrink-0 self-start md:self-center shadow-sm">
                    Deep Dive <ChevronDown size={12} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {exp.achievements.map((achievement, aIndex) => (
                      <div 
                        key={aIndex} 
                        className="flex gap-3 p-4 rounded-2xl bg-card-bg/20 border border-card-border/30 backdrop-blur-sm"
                      >

                      <div className="w-7 h-7 rounded-lg bg-accent/5 text-accent flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-text-secondary leading-relaxed font-medium text-[11px] pt-0.5">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
