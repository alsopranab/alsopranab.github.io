"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
  import { ArrowRight, Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const springConfig = { stiffness: 200, damping: 30, restDelta: 0.001 };

  const rawPadding = useTransform(scrollY, [0, 100], ["16px", "12px"]);
  const rawMaxWidth = useTransform(scrollY, [0, 100], ["64rem", "60rem"]);
  const rawOpacity = useTransform(scrollY, [0, 100], [0.8, 0.98]);
  const rawScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const rawBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const rawY = useTransform(scrollY, [0, 100], [0, 8]);
  const rawGap = useTransform(scrollY, [0, 100], ["3rem", "2rem"]);
  
  const padding = useSpring(rawPadding, springConfig);
  const maxWidth = useSpring(rawMaxWidth, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const y = useSpring(rawY, springConfig);
  const gap = useSpring(rawGap, springConfig);
  
  const backdropFilter = useTransform(rawBlur, (v) => `blur(${v}px) saturate(200%)`);

  const links = [
    { name: "About", href: "#about" },
    { name: "Exp", href: "#experience" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certs", href: "#certifications" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-center items-center pointer-events-none">
      <motion.div 
        style={{ 
          paddingTop: padding, 
          paddingBottom: padding,
          maxWidth: maxWidth,
          opacity: opacity,
          scale: scale,
          y: y,
          backdropFilter: backdropFilter
        }}
          className="w-full flex justify-between items-center bg-glass-bg rounded-full px-6 md:px-10 glow-lg pointer-events-auto border border-glass-border overflow-hidden group/nav transition-colors duration-500 hover:border-accent/40"
        >
          <Link href="/" className="flex items-center group shrink-0">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "anticipate" }}
              className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-white font-black text-[12px] mr-4 glow-md group-hover:shadow-accent/50 transition-shadow"
            >

            P
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[12px] font-black tracking-tighter text-text-primary uppercase group-hover:tracking-[0.1em] transition-all duration-500"
          >
            PRANAB<span className="text-accent">.</span>
          </motion.span>
        </Link>

        <motion.div 
          style={{ gap }}
          className="hidden md:flex items-center"
        >
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03, duration: 0.4 }}
            >
              <Link 
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-text-primary/40 hover:text-text-primary hover:tracking-[0.5em] transition-all duration-500 relative group/link"
              >
                {link.name}
                <motion.span 
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-accent transition-all duration-400" 
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <ThemeToggle />
            <Link 
              href="#contact"
              className="hidden sm:flex items-center gap-3 bg-text-primary text-bg px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all duration-500 glow-lg active:scale-95 group/btn"
            >
              Connect 
              <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-400" />
            </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden w-11 h-11 items-center justify-center rounded-full bg-text-primary/5 text-text-primary hover:bg-accent hover:text-white transition-all duration-400"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-6 right-6 p-8 bg-glass-bg backdrop-blur-2xl rounded-[2.5rem] border border-glass-border glow-lg pointer-events-auto md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-black uppercase tracking-tighter text-text-primary/40 hover:text-accent transition-colors duration-300 flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.1 }}
                    className="pt-6 border-t border-text-primary/5 space-y-4"
                  >
                    <Link 
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 bg-accent text-white w-full py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] glow-md active:scale-95"
                    >
                      Get in Touch
                      <ArrowRight size={14} />
                    </Link>
                    <a 
                      href="https://wa.me/917026886001?text=Hi%20Pranab,%20I'd%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 bg-text-primary text-bg w-full py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] active:scale-95"
                    >
                      Hire Me (WhatsApp)
                      <MessageCircle size={14} />
                    </a>
                  </motion.div>
              </div>
            </motion.div>

        )}
      </AnimatePresence>
    </nav>
  );
}
