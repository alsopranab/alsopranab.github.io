"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Database, 
  Search, 
  BarChart2, 
  BrainCircuit, 
  Lightbulb,
  LucideIcon
} from "lucide-react";
import { useEffect, useState, memo } from "react";

interface FunnelStage {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
}

const STAGES: FunnelStage[] = [
  { id: "collection", title: "Data Collection", icon: Database, color: "from-blue-900/40" },
  { id: "cleaning", title: "Cleaning & Preprocessing", icon: Search, color: "from-cyan-900/40" },
  { id: "eda", title: "Exploratory Data Analysis", icon: BarChart2, color: "from-emerald-900/40" },
  { id: "modeling", title: "Statistical Modeling", icon: BrainCircuit, color: "from-teal-900/40" },
  { id: "insights", title: "Insights & Business Decisions", icon: Lightbulb, color: "from-indigo-900/40" },
];

export const AnalyticsLifecycle = memo(function AnalyticsLifecycle() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "text-white" : "text-black";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative">
      <div className="flex flex-row items-center justify-between h-[120px] md:h-[180px] relative">
        {STAGES.map((stage, index) => {
          const StageIcon = stage.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={stage.id}
              initial={{ y: isEven ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative flex-1 flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className="relative z-10 flex flex-col items-center text-center gap-2">
                  <motion.div 
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: isEven ? 5 : -5,
                      y: isEven ? -5 : 5
                    }}
                    className={`p-2.5 md:p-3 rounded-xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'} border-2 backdrop-blur-2xl glow-sm group-hover:border-accent group-hover:bg-accent/20 transition-all duration-500 relative overflow-hidden`}
                    style={{ WebkitBackdropFilter: 'blur(30px)' }}
                  >

                  <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
                  <StageIcon className={`relative z-10 w-4 h-4 md:w-5 md:h-5 ${textColor} group-hover:text-accent transition-colors duration-300`} />
                </motion.div>

                <div className="space-y-0.5">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[6px] md:text-[7px] font-black tracking-[0.4em] uppercase ${isDark ? 'text-white/50' : 'text-black/50'} block group-hover:text-accent transition-colors`}
                  >
                    Stage 0{index + 1}
                  </motion.span>
                  <h3 className={`text-[7px] md:text-[8px] font-black ${textColor} leading-tight uppercase tracking-[0.15em] max-w-[80px] mx-auto group-hover:scale-105 transition-all duration-300 group-hover:text-accent`}>
                    {stage.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-accent/10 blur-[60px] rounded-full scale-75 opacity-20 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});
