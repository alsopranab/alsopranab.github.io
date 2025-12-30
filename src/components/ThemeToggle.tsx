"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-20 h-10 rounded-full p-1 transition-colors duration-300 overflow-hidden group focus:outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring transform-gpu active:scale-95"
      aria-label="Toggle theme"
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          backgroundColor: isDark ? "#051f20" : "#daf1de",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Desert/Night Scene Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Night Stars */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 2 + 1 + "px",
                    height: Math.random() * 2 + 1 + "px",
                    top: Math.random() * 60 + "%",
                    left: Math.random() * 80 + 10 + "%",
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
              <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-[#f1f1f1] shadow-[0_0_10px_#fff]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Day Clouds */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0"
            >
              <div className="absolute top-2 left-4 w-6 h-3 rounded-full bg-foreground/10 blur-[2px]" />
              <div className="absolute top-5 left-10 w-4 h-2 rounded-full bg-foreground/5 blur-[1px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dunes */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/2 opacity-30"
          animate={{
            color: isDark ? "#0b2b26" : "#8eb69b",
          }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,50 C20,40 40,45 60,35 C80,25 100,30 100,50 L100,50 L0,50 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>

      {/* Toggle Thumb */}
      <motion.div
        className="relative z-10 w-8 h-8 rounded-full bg-foreground glow-md flex items-center justify-center border border-background/20"
        animate={{
          x: isDark ? 0 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-20" />
      </motion.div>
    </button>
  );
}
