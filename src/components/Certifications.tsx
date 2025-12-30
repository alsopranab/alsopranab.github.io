"use client";

import { useState, useEffect, useRef } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import Image from "next/image";
import { Award, ShieldCheck } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

export function Certifications() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollingCerts = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <section id="certifications" className="section-container relative overflow-hidden bg-bg">
      <div className="flex flex-col mb-20 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
          <div className="w-8 h-[1px] bg-accent/30" /> GLOBAL BENCHMARKS
        </div>
        <h2 className="section-title">
          Verified expertise <br /> 
          <span className="opacity-[var(--muted-opacity)]">passed with precision.</span>
        </h2>
      </div>

      <div className="relative w-full" ref={scrollRef}>
        <div className="flex overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative">
          <div 
            className={`flex gap-6 md:gap-8 py-4 px-4 ${isVisible ? 'animate-marquee-scroll' : ''}`}
            style={{ width: "max-content" }}
          >
            {scrollingCerts.map((cert, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage({ src: cert.image, alt: cert.title })}
                  className="relative flex-shrink-0 w-[260px] md:w-[340px] aspect-square rounded-2xl overflow-hidden group/card bg-card-bg border border-card-border glow-md cursor-zoom-in"
                >

                <div className="absolute top-4 left-4 z-20">
                  <div className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-1.5">
                    <Award size={10} className="text-accent" />
                    <span className="text-[8px] font-black text-accent tracking-widest uppercase">{cert.provider}</span>
                  </div>
                </div>

                <div className="relative h-full w-full p-6 md:p-8 flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-4 md:p-6"
                    sizes="(max-width: 768px) 260px, 340px"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-card-bg/95 border-t border-card-border">
                  <div className="flex justify-between items-end gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="text-xs md:text-sm font-bold text-text-primary tracking-tight leading-tight truncate">{cert.title}</h3>
                      <div className="text-[9px] font-medium text-text-secondary uppercase tracking-widest">{cert.date}</div>
                    </div>
                    <div className="text-[7px] font-black text-accent/60 border border-accent/20 px-1.5 py-0.5 rounded bg-accent/5 uppercase tracking-widest shrink-0">
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      </div>

      <ImageLightbox 
        src={selectedImage?.src || null} 
        alt={selectedImage?.alt} 
        onClose={() => setSelectedImage(null)} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}} />
    </section>
  );
}
