"use client";

import { Quote } from "lucide-react";

export function Recommendations() {
  return (
    <section id="recommendations" className="section-container relative">
      <div className="flex flex-col mb-16 items-center text-center">
        <div className="flex items-center justify-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
          <div className="w-8 h-[1px] bg-accent/30" /> Professional Recommendation
        </div>
        <h2 className="section-title">
          Trusted by <br /> 
          <span className="opacity-[var(--muted-opacity)]">industry leaders.</span>
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="apple-card p-6 sm:p-8 md:p-10 relative group glow-md border border-card-border/40 bg-card-bg/60 backdrop-blur-xl transition-all duration-300 transform-gpu will-change-transform">
          <Quote className="absolute top-8 right-8 text-accent opacity-10" size={40} />
          
          <div className="relative z-10">
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium tracking-tight mb-8 italic">
              "I've had the privilege of working with Pranab at Magicbricks, and he has consistently proven himself to be an exceptional Data Analyst with rare versatility and drive.
              <br /><br />
              Pranab is outstanding in data analysis, automation, and advanced Google Sheets/MS Excel work. His deep expertise in Google Apps Script enabled him to automate highly complex reports that previously required hours of manual effort. These automations not only saved significant time but also brought structure, accuracy, and scalability to our operations.
              <br /><br />
              He is also very comfortable working with AI tools, often integrating them creatively into his workflow to enhance productivity and bring innovative solutions to the team.
              <br /><br />
              One of Pranab's strongest qualities is his solution-oriented mindset. He learns incredibly fast, approaches every task with discipline, and carries a solid bias for action—always stepping up, always delivering. His work ethic is remarkable, and he reliably takes ownership of challenges without hesitation.
              <br /><br />
              Pranab will be a true asset to any team or organisation. I strongly recommend him for any role that demands analytical thinking, automation expertise, and a proactive, high-performance work style."
            </p>
            
            <div className="flex items-center gap-4 border-t border-card-border/30 pt-8">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-base glow-md">
                AS
              </div>
              <div>
                <div className="text-xs font-bold text-foreground tracking-tight">Amit Sarwade</div>
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-1">Operations Manager at Magicbricks</div>
                <div className="text-[9px] text-text-secondary/60 font-medium">November 30, 2025 • Managed Pranab directly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
