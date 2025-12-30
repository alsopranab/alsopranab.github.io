"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Preview Mode</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500 hover:border-red-500 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center group">
              <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
              
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src={src}
                  alt={alt || "Image preview"}
                  width={1920}
                  height={1080}
                  className="object-contain w-auto h-auto max-w-full max-h-full rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
                  priority
                  unoptimized // Good for external images or if we don't know the size
                />
              </div>
            </div>

            {/* Footer Info */}
            {alt && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-8 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 max-w-[90%] md:max-w-md">
                <p className="text-[11px] font-bold text-white/80 text-center uppercase tracking-widest leading-relaxed">
                  {alt}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
