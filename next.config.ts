// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Важно для Netlify — отключаем оптимизацию изображений
  },
  // Отключаем Turbopack для production (Netlify его плохо поддерживает)
  experimental: {
    // Убираем экспериментальные функции
  },
};

export default nextConfig;