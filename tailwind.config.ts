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
        background: "#F9F8F6",
        foreground: "#2A3B32",
        accent: {
          DEFAULT: "#D4A373",
          hover: "#C39262",
        },
        secondary: "#E9EDC9",
        muted: "#8A9A86",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out',  // ← НОВОЕ
        'slide-in-left': 'slide-in-left 0.5s ease-out',   // ← НОВОЕ
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
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'slide-in-right': {  // ← НОВОЕ
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {  // ← НОВОЕ
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;