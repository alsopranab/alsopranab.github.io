"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function InsightClock() {
  const secondHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const hourHandRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let frameId: number;
    const update = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds() + ms / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      const secondAngle = s * 6;
      const minuteAngle = m * 6;
      const hourAngle = h * 30;

      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondAngle}deg)`;
        secondHandRef.current.style.transformOrigin = "200px 200px";
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteAngle}deg)`;
        minuteHandRef.current.style.transformOrigin = "200px 200px";
      }
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourAngle}deg)`;
        hourHandRef.current.style.transformOrigin = "200px 200px";
      }

      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col items-center justify-center py-12 bg-background overflow-hidden select-none cursor-crosshair"
    >
      <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <marker
              id="arrow-primary-bold"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3.5"
              markerHeight="3.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <marker
              id="arrow-primary-thin"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="2.5"
              markerHeight="2.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <marker
              id="arrow-secondary"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="2"
              markerHeight="2"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>

            <line
              x1="200"
              y1="50"
              x2="200"
              y2="350"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              className="text-foreground opacity-70 dark:opacity-20"
            />

            {[...Array(60)].map((_, i) => {
              const angle = i * 6;
              const isMajor = i % 5 === 0;
              const r1 = isMajor ? 165 : 170;
              const r2 = 175;
              return (
                <line
                  key={i}
                  x1={200 + r1 * Math.sin((angle * Math.PI) / 180)}
                  y1={200 - r1 * Math.cos((angle * Math.PI) / 180)}
                  x2={200 + r2 * Math.sin((angle * Math.PI) / 180)}
                  y2={200 - r2 * Math.cos((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth={isMajor ? "0.8" : "0.4"}
                  className={isMajor ? "text-text-secondary opacity-100 dark:opacity-30" : "text-foreground opacity-60 dark:opacity-10"}
                />
              );
            })}

            <g ref={secondHandRef} className="text-text-secondary opacity-100 dark:opacity-40">
            <motion.line
              x1="200"
              y1="200"
              x2="200"
              y2="60"
              stroke="currentColor"
              strokeWidth="0.3"
              markerEnd="url(#arrow-secondary)"
              variants={handVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4, duration: 1.5, ease: "circOut" }}
            />
            <text
              x="200"
              y="48"
              fill="currentColor"
              fontSize="6"
              fontWeight="400"
              textAnchor="middle"
              className="tracking-[0.4em] uppercase"
            >
              Insight Capture
            </text>
          </g>

          <g ref={hourHandRef} className="text-text-primary">
            <motion.line
              x1="200"
              y1="200"
              x2="200"
              y2="140"
              stroke="currentColor"
              strokeWidth="0.6"
              markerEnd="url(#arrow-primary-thin)"
              variants={handVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, ease: "circOut" }}
            />
            <text
              x="200"
              y="128"
              fill="currentColor"
              fontSize="7.5"
              fontWeight="500"
              textAnchor="middle"
              className="tracking-widest uppercase"
            >
              Hypothesis
            </text>
          </g>

          <g ref={minuteHandRef} className="text-text-primary">
            <motion.line
              x1="200"
              y1="200"
              x2="200"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.8"
              markerEnd="url(#arrow-primary-bold)"
              variants={handVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 1.5, ease: "circOut" }}
            />
            <text
              x="200"
              y="85"
              fill="currentColor"
              fontSize="8"
              fontWeight="700"
              textAnchor="middle"
              className="tracking-[0.2em] uppercase"
            >
              Decision Loop
            </text>
          </g>

          <circle cx="200" cy="200" r="1.5" className="fill-text-primary stroke-background" strokeWidth="1" />
        </svg>

        <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
          <div className="font-mono text-[8px] tracking-[0.3em] text-text-primary opacity-60 dark:opacity-30 uppercase text-center max-w-[80%] leading-relaxed">
            Patterns shape the future. Analysis drives movement. Data never stops.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
