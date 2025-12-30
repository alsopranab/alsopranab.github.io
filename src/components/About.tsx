"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data";
import { BarChart3, Target, Zap, Cpu, ArrowRight, MousePointer2 } from "lucide-react";
import { useRef } from "react";
export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const liquidTransition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ...liquidTransition,
        delay: 0.1 * i,
      },
    }),
  };

  return (
    <section id="about" ref={containerRef} className="section-container relative overflow-hidden">
      <div className="flex flex-col mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={liquidTransition}
          className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6"
        >
          <div className="w-8 h-[1px] bg-accent/30" /> THE BLUEPRINT
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={liquidTransition}
          className="section-title"
        >
          Analytical clarity <br /> 
          <span className="opacity-[var(--muted-opacity)]">from the depth of data.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          <motion.div
            style={{ y: y1, rotate }}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="lg:col-span-5 relative"
          >
            <div className="apple-card aspect-square bg-card-bg/40 backdrop-blur-md p-8 md:p-12 flex flex-col justify-between group overflow-hidden glow-lg rounded-[3rem] transition-all duration-1000">
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] grayscale pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              </div>


            <motion.div 
              whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
                <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 shadow-accent/20">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-tighter mb-4 leading-none uppercase">Analytical <br />Thinking</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                  "I don't just visualize numbers; I build the automated systems that turn raw data into strategic direction."
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                className="relative z-10 flex items-center gap-4 p-4 bg-accent/5 backdrop-blur-3xl rounded-[2rem] border border-accent/10 group-hover:border-accent/40 transition-all duration-700"
              >
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-xl group-hover:scale-105 transition-all duration-700">
                  <Zap size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-lg font-black text-foreground tracking-tight uppercase">Velocity</div>
                  <div className="text-[8px] font-black text-accent uppercase tracking-[0.2em]">Automated Pipelines</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...liquidTransition, delay: 0.2 }}
              className="relative"
            >
              <span className="absolute -left-6 top-0 text-5xl font-black text-accent/5 select-none italic">"</span>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-bold tracking-tight opacity-90 first-letter:text-3xl first-letter:text-accent first-letter:font-black">
                {PERSONAL_INFO.about}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  icon: <BarChart3 size={18} />, 
                  title: "Pattern Recognition", 
                  content: "Identifying latent operational bottlenecks and predictive trends before they impact performance.",
                  label: "Insight Engine"
                },
                { 
                  icon: <Target size={18} />, 
                  title: "Lean Analytics", 
                  content: "Eliminating manual toil with high-resiliency scripts that reclaim thousands of productive hours.",
                  label: "Automation Core"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{ y: i === 1 ? y2 : 0 }}
                  custom={i + 2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="apple-card p-8 group cursor-default hover:bg-accent transition-all duration-700 border-card-border/60 hover:shadow-[0_30px_60px_rgba(35,83,71,0.15)]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center group-hover:bg-white group-hover:text-accent transition-all duration-700 shadow-sm group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h4 className="text-base font-black tracking-tight group-hover:text-white transition-colors duration-700 uppercase">{item.title}</h4>
                  </div>
                  <p className="text-text-secondary group-hover:text-white/90 text-[13px] leading-relaxed font-medium transition-colors duration-700">
                    {item.content}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-accent font-black text-[8px] uppercase tracking-widest group-hover:text-white transition-colors duration-700">
                    {item.label} <ArrowRight size={10} className="group-hover:translate-x-2 transition-transform duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );

}
