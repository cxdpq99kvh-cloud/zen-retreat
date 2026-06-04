// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Обязательно для Netlify
  },
};

export default nextConfig;