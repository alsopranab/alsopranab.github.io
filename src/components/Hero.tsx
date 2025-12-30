"use client";

import { PERSONAL_INFO } from "@/lib/data";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
  import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnalyticsLifecycle } from "./AnalyticsLifecycle";
import { TunnelEffect } from "./TunnelEffect";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const tunnelY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    
    const isDark = resolvedTheme === "dark";

  const textColor = isDark ? "text-foreground" : "text-foreground";
  const subTextColor = "text-text-secondary";
  const glowColor = "bg-accent";

  if (!mounted) return <div className="relative min-h-screen bg-background" />;
  
    return (
      <>
        <section ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col items-center bg-background">
          
          {/* Image 1: Perspective Lines & Portal (Strictly in Hero) */}
          <motion.div 
            style={{ y: tunnelY }}
            className={`absolute inset-0 z-0 pointer-events-none ${isDark ? 'opacity-40' : 'opacity-70'}`}
          >
            <TunnelEffect />
            
              {/* The Door / Portal Hub - Image 1 Focal Point */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative bottom-[5vh] md:bottom-[10vh] flex flex-col items-center">
                  {/* Outer Atmospheric Glow */}
                  <div 
                    className={`w-[40vw] h-[40vw] ${glowColor} blur-[120px] rounded-full ${isDark ? 'opacity-10' : 'opacity-20'} atmospheric-glow`} 
                  />
                  
                  {/* The Portal Archway */}
                  <div className="absolute bottom-0 w-20 h-32 md:w-28 md:h-48 flex flex-col items-center">
                     <div className={`w-full h-full border-[1.5px] ${isDark ? 'border-accent/30' : 'border-accent/60'} rounded-t-full relative overflow-hidden bg-accent/5 backdrop-blur-sm shadow-[0_0_80px_rgba(var(--accent-rgb),${isDark ? '0.15' : '0.25'})]`}>
                        <div className={`absolute inset-0 ${glowColor} opacity-5 animate-pulse`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              style={shouldReduceMotion ? {} : { y, opacity, scale }}
              className="relative z-10 w-full flex flex-col items-center text-center pt-24 md:pt-32 pb-4 px-6"
            >
  
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <p className={`${subTextColor} text-[8px] md:text-[10px] font-black tracking-[0.6em] uppercase flex items-center gap-4 justify-center`}>
                <span className="h-[1px] w-6 bg-accent opacity-20" />
                {PERSONAL_INFO.primaryTitle}
                <span className="h-[1px] w-6 bg-accent opacity-20" />
              </p>
            </motion.div>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-3xl mb-8"
              >
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl md:text-3xl lg:text-5xl font-black text-text-primary leading-tight tracking-tight uppercase"
                >
                  Transforming <span className="text-accent italic">Entropy</span> into <br />
                  <span className="opacity-60 underline decoration-accent/20 underline-offset-8">Data Intelligence.</span>
                </motion.h2>
  
            </motion.div>
      
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-4 mb-6"
                >
                  <Link href="#contact" className="btn-primary">
                    Establish Link
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <a 
                    href="https://wa.me/917026886001?text=Hi%20Pranab,%20I'd%20like%20to%20discuss%20a%20project." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-8 py-4 rounded-full border border-card-border bg-card-bg/40 text-[10px] font-black uppercase tracking-widest text-text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 flex items-center gap-3 group"
                  >
                    Hire Me
                    <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                  </a>
                </motion.div>
      
                <div className="w-full mt-auto mb-24 md:mb-32 pointer-events-none opacity-100 max-w-5xl">
                  <AnalyticsLifecycle />
                </div>
  
          </motion.div>
        </section>
        <style jsx>{`
          @keyframes atmospheric {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.1); opacity: 0.15; }
          }
          .atmospheric-glow {
            animation: atmospheric 8s ease-in-out infinite;
          }
        `}</style>
      </>
    );

}
