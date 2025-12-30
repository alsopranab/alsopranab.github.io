"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function DataStreamTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
      <div ref={containerRef} className="relative h-6 md:h-8 w-full flex items-center justify-center bg-background overflow-hidden">
      {/* Central Data Cable */}
      <div className="absolute inset-0 flex justify-center">
        <svg width="2" height="100%" className="h-full">
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 10"
              style={{ pathLength, opacity }}
              className="text-text-secondary opacity-60 dark:text-accent dark:opacity-40"
            />
        </svg>
      </div>

      {/* Falling Data Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <DataParticle key={i} delay={i * 0.4} />
        ))}
      </div>

      {/* Glow Effect */}
      <motion.div 
        style={{ opacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 blur-[10px]"
      />
      
      {/* Subtle Binary Flow */}
      <div className="absolute inset-0 flex justify-center items-center gap-20 opacity-5 select-none pointer-events-none font-mono text-[8px] tracking-[1em] text-accent">
        <div className="flex flex-col gap-4 animate-pulse">
          <span>10110</span>
          <span>01101</span>
          <span>11010</span>
        </div>
        <div className="flex flex-col gap-4 animate-pulse delay-75">
          <span>00101</span>
          <span>11100</span>
          <span>01011</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes fall {
          0% { transform: translate(-50%, -20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-50%, 100vh); opacity: 0; }
        }
        .data-particle {
          animation: fall 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

function DataParticle({ delay }: { delay: number }) {
  return (
    <div
      className="absolute top-0 left-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_var(--accent)] data-particle transform-gpu backface-hidden"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
