"use client";

import { PERSONAL_INFO } from "@/lib/data";
import { Github, Linkedin, Code2, Trophy, ArrowUp, Mail, MapPin, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden bg-background border-t border-card-border/40">
      
      <div className="section-container relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24"
        >
          {/* Brand & Bio */}
          <div className="lg:col-span-5">
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tightest mb-6 uppercase">
                PRANAB<span className="text-accent">.</span>
              </h2>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-md font-medium">
                  Extracting insights that scale. Turning complex data into clear, actionable intelligence.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-8">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors group font-semibold text-lg"
              >
                <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Mail size={18} />
                </div>
                {PERSONAL_INFO.email}
              </a>
              <div className="flex items-center gap-3 text-text-secondary font-medium">
                <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                {PERSONAL_INFO.location}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <SocialLink href={PERSONAL_INFO.github} icon={<Github size={20} />} label="GitHub" />
              <SocialLink href={PERSONAL_INFO.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href={PERSONAL_INFO.leetcode} icon={<Code2 size={20} />} label="LeetCode" />
              <SocialLink href={PERSONAL_INFO.hackerrank} icon={<Trophy size={20} />} label="HackerRank" />
            </motion.div>
          </div>

          {/* Navigation Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
              <motion.div variants={itemVariants} className="flex flex-col gap-8">
                <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                  <div className="w-8 h-[1px] bg-accent/30" /> Navigation
                </div>
                <div className="flex flex-col gap-5">
                  <FooterLink href="#about">The Identity</FooterLink>
                  <FooterLink href="#projects">The Works</FooterLink>
                  <FooterLink href="#experience">The Journey</FooterLink>
                  <FooterLink href="#skills">The Stack</FooterLink>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-8">
                <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                  <div className="w-8 h-[1px] bg-accent/30" /> Recognition
                </div>
                <div className="flex flex-col gap-5">
                  <FooterLink href="#certifications">Benchmarks</FooterLink>
                  <FooterLink href="#recommendations">Endorsements</FooterLink>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-8 col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                  <div className="w-8 h-[1px] bg-accent/30" /> Connect
                </div>
                <div className="flex flex-col gap-5">
                      <a 
                        href="https://wa.me/917026886001?text=Hi%20Pranab,%20I'd%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-[12px] font-black text-foreground hover:text-accent transition-all uppercase tracking-widest"
                      >
                        Hire Me <MessageCircle size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </a>
                  <button 
                    onClick={scrollToTop}
                    className="w-fit flex items-center gap-3 px-6 py-3 rounded-full bg-accent/5 hover:bg-accent hover:text-white text-text-primary font-black text-[10px] uppercase tracking-widest transition-all hover:translate-y-[-2px] border border-accent/10"
                  >
                    Back to Top <ArrowUp size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="pt-12 border-t border-card-border/40 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-40">
            © {currentYear} PRANAB DEBNATH — DESIGNED FOR IMPACT
          </div>
          <div className="flex gap-8">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-40">
              BANGALORE // IN
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">
              PRECISION & SCALE
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a 
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all duration-300 shadow-xl group"
      title={label}
    >
      {icon}
    </motion.a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="relative text-base font-bold text-text-secondary hover:text-text-primary transition-colors group w-fit"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
