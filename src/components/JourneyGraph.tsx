"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function JourneyGraph() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

    const isDark = resolvedTheme === "dark";
    const strokeColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.6)";
    const textColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.8)";
    const accentColor = "var(--accent)";
    
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center py-24 px-12">
        <div className="w-full h-full max-w-6xl relative opacity-100 dark:opacity-30">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="10" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="1" />
              </pattern>
            </defs>

          <g stroke={strokeColor} strokeWidth="2">
            <line x1="100" y1="50" x2="100" y2="500" />
            <path d="M95,60 L100,50 L105,60" fill="none" />
            <line x1="100" y1="500" x2="950" y2="500" />
            <path d="M940,495 L950,500 L940,505" fill="none" />
          </g>

          <g className="font-mono text-[12px] font-black tracking-widest uppercase" fill={textColor}>
            <text x="80" y="40" textAnchor="end" transform="rotate(-90 80,40)">INSIGHTS</text>
            <text x="940" y="530" textAnchor="end">TIME</text>
          </g>

          <path
            d="M100,500 L900,100 L900,500 Z"
            fill="url(#hatch)"
            className="opacity-50"
          />
          <path
            d="M100,500 Q500,500 900,100 L900,500 Z"
            fill={isDark ? "#021314" : "#f0f9f1"}
          />

          <line
            x1="100"
            y1="500"
            x2="900"
            y2="100"
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <text x="650" y="220" fill={textColor} className="font-mono text-[10px] tracking-tight uppercase" transform="rotate(-26 650,220)">
            Expected Data Growth
          </text>

          <motion.path
            d="M100,500 Q500,500 900,100"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
          <text x="700" y="380" fill={accentColor} className="font-mono text-[10px] font-bold tracking-tight uppercase">
            Value Realization
          </text>

          <g transform="translate(150, 420)">
            <text x="0" y="0" fill={textColor} className="font-black text-[12px] tracking-[0.2em] uppercase">
              The Insight
            </text>
            <text x="0" y="20" fill={textColor} className="font-black text-[12px] tracking-[0.2em] uppercase">
              Lag
            </text>
          </g>

          <motion.circle
            r="6"
            className="fill-accent"
            style={{
              offsetPath: "path('M100,500 Q500,500 900,100')",
              filter: `drop-shadow(0 0 10px var(--accent))`
            }}
            animate={{
              offsetDistance: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  );
}
