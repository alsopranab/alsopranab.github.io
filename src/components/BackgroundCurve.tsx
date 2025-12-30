"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundCurve() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

    const isDark = resolvedTheme === "dark";
    const strokeColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.6)";
    const textColor = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.8)";

    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-3xl px-10">
            <svg
              viewBox="0 0 1000 400"
              className="w-full h-auto overflow-visible transition-colors duration-1000 opacity-100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              {/* Main Bell Curve Path with Gradient */}
              <defs>
                <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
                </linearGradient>
              </defs>


            <path
              id="bell-curve"
              d="M0,300 L200,300 C350,300 400,100 500,100 C600,100 650,300 800,300 L1000,300"
              stroke="url(#curve-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Secondary Base Line */}
            <path
              d="M0,320 L1000,320"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={isDark ? "0.5" : "0.8"}
            />

            {/* Floating Labels with Glow */}
            <g className="filter drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]">
              <text x="50" y="240" fill={textColor} className="font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">
                DIFFICULT
              </text>
              <text x="460" y="80" fill="var(--accent)" className="font-black text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-80">
                THE PEAK
              </text>
              <text x="800" y="240" fill={textColor} className="font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">
                EASY.
              </text>
            </g>

            {/* Animated Ball with Trailing Effect */}
            <circle
              r="8"
              className="fill-accent"
              style={{
                offsetPath: "path('M0,300 L200,300 C350,300 400,100 500,100 C600,100 650,300 800,300 L1000,300')",
                animation: "moveBallAbout 15s linear infinite",
                willChange: "offset-distance",
                filter: `drop-shadow(0 0 12px var(--accent))`
              }}
            />
          </svg>
        </div>
      <style jsx>{`
        @keyframes moveBallAbout {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}
