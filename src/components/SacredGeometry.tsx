// src/components/SacredGeometry.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type SacredGeometryProps = {
  variant?: "mandala" | "flower" | "circles";
  className?: string;
};

export default function SacredGeometry({ variant = "mandala", className = "" }: SacredGeometryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Вращение при скролле
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  // Вариант 1: Мандала
  if (variant === "mandala") {
    return (
      <div ref={ref} className={`pointer-events-none ${className}`}>
        <motion.svg
          style={{ rotate, scale }}
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          className="opacity-20"
        >
          {/* Внешний круг */}
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
          
          {/* Лепестки мандалы */}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="120"
              rx="20"
              ry="60"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 30} 200 200)`}
            />
          ))}
          
          {/* Внутренние элементы */}
          <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="20" fill="currentColor" fillOpacity="0.1" />
        </motion.svg>
      </div>
    );
  }

  // Вариант 2: Цветок жизни
  if (variant === "flower") {
    return (
      <div ref={ref} className={`pointer-events-none ${className}`}>
        <motion.svg
          style={{ rotate: rotateReverse, scale }}
          width="500"
          height="500"
          viewBox="0 0 500 500"
          fill="none"
          className="opacity-15"
        >
          {/* Центральный круг */}
          <circle cx="250" cy="250" r="60" stroke="currentColor" strokeWidth="1" />
          
          {/* 6 кругов вокруг (цветок жизни) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const cx = 250 + Math.cos(angle) * 60;
            const cy = 250 + Math.sin(angle) * 60;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="60"
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Внешний круг */}
          <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" />
        </motion.svg>
      </div>
    );
  }

  // Вариант 3: Концентрические круги
  return (
    <div ref={ref} className={`pointer-events-none ${className}`}>
      <motion.svg
        style={{ rotate, scale }}
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        className="opacity-20"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={i}
            cx="150"
            cy="150"
            r={20 + i * 18}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
        ))}
      </motion.svg>
    </div>
  );
}