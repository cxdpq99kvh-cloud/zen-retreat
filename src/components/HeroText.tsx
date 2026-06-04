// src/components/HeroText.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Глобальный скролл страницы — анимация начинается СРАЗУ при скролле
  const { scrollY } = useScroll();

  // Текст расходится до самых краёв экрана (50vw = половина ширины экрана)
  // Используем функцию для преобразования в строку с единицами измерения
  const xLeft = useTransform(scrollY, [0, 500], [0, -50]);
  const xRight = useTransform(scrollY, [0, 500], [0, 50]);
  
  // Прозрачность исчезает
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Лёгкое размытие
  const filter = useTransform(
    scrollY,
    [0, 500],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{ opacity, filter }}
        className="relative"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] text-foreground flex flex-wrap justify-center gap-x-6 relative">
          {/* "Пространство" — уезжает влево до самого края */}
          <motion.span 
            style={{ 
              x: useTransform(xLeft, (v) => `${v}vw`),
            }}
            className="inline-block relative"
          >
            Пространство
            <motion.span
              className="absolute -top-4 -left-4 w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
          
          <br className="md:hidden" />
          
          {/* "Тишины" — уезжает вправо до самого края */}
          <motion.span 
            style={{ 
              x: useTransform(xRight, (v) => `${v}vw`),
            }}
            className="italic text-accent inline-block relative"
          >
            Тишины
            <motion.span
              className="absolute -bottom-4 -right-4 w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.span>
        </h1>
      </motion.div>
    </div>
  );
}