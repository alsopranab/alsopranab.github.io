"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function MainOverlay({ isHidden = false }: { isHidden?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    const isDark = resolvedTheme === "dark";
    const strokeColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.25)";
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.9)";
    const accentColor = "var(--accent)";
    const bgColor = "bg-background";

      return (
        <div 
          className={`fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden ${bgColor} ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        >
          {mounted && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <svg
                viewBox="0 0 1000 1000"
                className="w-full h-full object-cover opacity-[0.6]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >

              <g stroke={strokeColor} strokeWidth={isDark ? "0.8" : "1"}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="1000" />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
                ))}
              </g>

              <g transform="translate(0, 250)">
                <line
                  x1="100"
                  y1="500"
                  x2="900"
                  y2="500"
                  stroke={textColor}
                  strokeWidth="1"
                  opacity={isDark ? "0.5" : "0.8"}
                />
                <line
                  x1="100"
                  y1="515"
                  x2="900"
                  y2="515"
                  stroke={textColor}
                  strokeWidth="1"
                  opacity={isDark ? "0.3" : "0.5"}
                />

                <path
                  d="M100,500 C300,500 400,100 500,100 C600,100 700,500 900,500"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="1"
                />
                
                <g className="font-mono tracking-[0.2em] uppercase" fill={textColor}>
                  <text x="200" y="250" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>ALL</text>
                  <text x="200" y="275" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>THINGS</text>
                  <text x="200" y="300" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>ARE</text>

                  <text 
                    x="500" 
                    y="180" 
                    textAnchor="middle" 
                    fill={accentColor} 
                    className="text-[36px] font-black tracking-[0.3em]"
                  >
                    DIFFICULT
                  </text>

                  <text x="800" y="250" textAnchor="end" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>BEFORE</text>
                  <text x="800" y="275" textAnchor="end" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>THEY ARE</text>
                  <text x="800" y="300" textAnchor="end" className={`text-[14px] font-black ${isDark ? 'opacity-60' : 'opacity-90'}`}>EASY.</text>
                </g>

                <circle
                  r="4"
                  className="fill-accent move-along-path"
                  style={{
                    offsetPath: "path('M100,500 C300,500 400,100 500,100 C600,100 700,500 900,500')",
                  }}
                />

            </g>
          </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none" />
      <style jsx>{`
        @keyframes moveAlong {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        .move-along-path {
          animation: moveAlong 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
