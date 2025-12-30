"use client";

import { SKILLS } from "@/lib/data";
import { Database, Terminal, Workflow, ArrowRight } from "lucide-react";

export function Skills() {
    const categories = [
      { 
        id: "01",
        title: "Analytics & SQL", 
        icon: <Database size={20} />, 
        skills: SKILLS.programming,
        desc: "Specialized in complex SQL querying, data cleaning with Pandas, and advanced Excel modeling."
      },
      { 
        id: "02",
        title: "Automation & BI", 
        icon: <Workflow size={20} />, 
        skills: SKILLS.automation,
        desc: "Building automated data streams and intuitive Looker Studio dashboards for real-time tracking."
      },
      { 
        id: "03",
        title: "Operational Stack", 
        icon: <Terminal size={20} />, 
        skills: [...SKILLS.platforms.crm, ...SKILLS.platforms.dialers],
        desc: "Extracting intelligence from CRM and Dialer systems to optimize sales and lead conversion."
      }
    ];

  return (
    <section id="skills" className="section-container relative">
      <div className="flex flex-col mb-16">
        <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
          <div className="w-8 h-[1px] bg-accent/30" /> Core Capabilities
        </div>
        <h2 className="section-title">
          Mastering the tools <br /> 
          <span className="opacity-[var(--muted-opacity)]">that power the engine.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="apple-card p-6 md:p-8 cursor-default h-full flex flex-col justify-between glow-md border-card-border/40 bg-card-bg/60 backdrop-blur-xl transition-all duration-300 transform-gpu will-change-transform">
                <div>
                  <div className="text-accent mb-6 p-4 w-fit rounded-2xl bg-card-bg border border-card-border/50">
                    {cat.icon}
                  </div>
  
                  <div className="space-y-3">
                    <span className="text-[10px] font-black tracking-[0.4em] text-accent/80 uppercase block">Expertise {cat.id}</span>
                    <h3 className="text-lg font-black tracking-tighter text-foreground uppercase">{cat.title}</h3>
                  <p className="text-text-secondary font-semibold text-[11px] leading-relaxed opacity-80">
                    {cat.desc}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIndex) => (
                    <span 
                      key={sIndex}
                      className="px-3 py-1.5 rounded-full bg-accent/5 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

                <div className="mt-8 flex items-center gap-3 text-text-secondary font-black text-[8px] uppercase tracking-[0.4em] group-hover:text-accent transition-colors">
                  Inspect Stack <ArrowRight size={12} className="text-accent group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
