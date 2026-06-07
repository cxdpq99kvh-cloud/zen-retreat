// src/components/ExplodingNumber.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface ExplodingNumberProps {
  number: string;
  label: string;
  gradientColors: string[];
}

export default function ExplodingNumber({ number, label, gradientColors }: ExplodingNumberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExploding, setIsExploding] = useState(false);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 200;
    const height = 120;
    canvas.width = width;
    canvas.height = height;

    // Рисуем число на временном canvas для получения пикселей
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.font = "bold 80px serif";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.fillStyle = "#000";
    tempCtx.fillText(number, width / 2, height / 2);

    // Получаем пиксели числа
    const imageData = tempCtx.getImageData(0, 0, width, height);
    const particles: any[] = [];

    // Создаём частицы из пикселей (каждые 4 пикселя для производительности)
    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        const index = (y * width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          // Это часть числа
          particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 20, // Случайная скорость по X
            vy: (Math.random() - 0.5) * 20, // Случайная скорость по Y
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            size: 3 + Math.random() * 2,
            color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
          });
        }
      }
    }

    particlesRef.current = particles;

    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (isExploding) {
          // Разлёт частиц
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;
          particle.vx *= 0.98; // Трение
          particle.vy *= 0.98;
        } else {
          // Сборка обратно
          const dx = particle.originX - particle.x;
          const dy = particle.originY - particle.y;
          particle.x += dx * 0.1;
          particle.y += dy * 0.1;
          particle.rotation *= 0.95;
        }

        // Рисуем частицу
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [number, gradientColors, isExploding]);

  // Обновление позиции мыши для градиента
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative group">
      <div
        className="relative inline-block cursor-pointer"
        onMouseEnter={() => setIsExploding(true)}
        onMouseLeave={() => setIsExploding(false)}
      >
        <canvas
          ref={canvasRef}
          className="w-[200px] h-[120px]"
          style={{
            filter: "drop-shadow(2px 4px 6px rgba(139, 111, 71, 0.2))",
          }}
        />
      </div>
      <p className="text-xs text-muted font-sans uppercase tracking-wider mt-2">{label}</p>
    </div>
  );
}