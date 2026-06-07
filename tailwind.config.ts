// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Наша природная палитра
        background: "#F9F8F6", // Теплый алебастр
        foreground: "#2A3B32", // Глубокий хвойный
        accent: {
          DEFAULT: "#D4A373", // Мягкая глина
          hover: "#C39262",   // Глина при наведении
        },
        secondary: "#E9EDC9", // Светлый мох
        muted: "#8A9A86",     // Приглушенный шалфей (для второстепенного текста)
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite', // ← НОВАЯ анимация
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': { // ← НОВАЯ keyframe
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    },
  },
  plugins: [],
};
export default config;