// src/components/CursorGradient.tsx
"use client";

import { useEffect, useRef } from "react";

export default function CursorGradient() {
  const mousePosition = useRef({ x: 50, y: 50 });
  const currentPosition = useRef({ x: 50, y: 50 });
  const animationFrameRef = useRef<number | undefined>(undefined); // ✅ Явно указали undefined

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const animate = () => {
      const lerp = 0.08;
      
      currentPosition.current.x += (mousePosition.current.x - currentPosition.current.x) * lerp;
      currentPosition.current.y += (mousePosition.current.y - currentPosition.current.y) * lerp;

      document.documentElement.style.setProperty('--mouse-x', `${currentPosition.current.x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${currentPosition.current.y}%`);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return null;
}