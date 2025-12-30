"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, memo } from "react";

interface TunnelEffectProps {
  className?: string;
}

export const TunnelEffect = memo(function TunnelEffect({ 
  className = "absolute inset-0"
}: TunnelEffectProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const archCount = 20; 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
    const lineColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(5, 31, 32, 0.25)";

  return (
    <div className={`${className} w-full h-full overflow-hidden pointer-events-none z-0`}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* The Arches - Image 1 perspective lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-[20vh]">
          {Array.from({ length: archCount }).map((_, i) => {
            const opacity = Math.pow(1 - i / archCount, 1.8);
            const width = 100 + i * 300; 
            const height = 150 + i * 400;
            
              return (
                <div
                  key={i}
                  className="absolute border-t border-l border-r rounded-t-[2000px] arch-entrance"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    bottom: "10vh",
                    borderColor: lineColor,
                    borderWidth: isDark ? "1.5px" : "2px",
                    animationDelay: `${i * 0.03}s`,
                    opacity: 0,
                    transform: 'scale(0.95)',
                    // Set actual opacity via CSS variable for the animation to use
                    '--target-opacity': opacity
                  } as any}
                />
              );

          })}
        </div>

        {/* Vertical Convergence Lines (Floor) */}
        <div className="absolute bottom-0 w-full h-[50%] pointer-events-none">
          <div className={`absolute inset-0 overflow-hidden ${isDark ? 'opacity-30' : 'opacity-60'}`}>
             {Array.from({ length: 40 }).map((_, i) => {
               const angle = (i - 20) * 4.5;
                 return (
                   <div 
                    key={i}
                    className="absolute top-0 h-[300%] w-px origin-top"
                    style={{
                      left: "50%",
                      backgroundColor: lineColor,
                      transform: `rotate(${angle}deg)`,
                    }}
                   />
                 );

             })}
          </div>
          
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#051f20] via-[#051f20]/90 to-transparent' : 'from-[#daf1de] via-[#daf1de]/90 to-transparent'} z-10`} />
        </div>
      </div>
      <style jsx>{`
        @keyframes archEnter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: var(--target-opacity); transform: scale(1); }
        }
        .arch-entrance {
          animation: archEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
});
