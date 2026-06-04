// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Увеличиваем таймаут загрузки изображений
    minimumCacheTTL: 60,
  },
  // Увеличиваем таймаут для медленных запросов
  experimental: {
    // Отключаем строгий режим для разработки (может помочь с таймаутами)
  },
};

export default nextConfig;