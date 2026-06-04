// src/components/CartButton.tsx
"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={openCart}
      className="fixed bottom-8 right-8 w-16 h-16 bg-accent text-white rounded-full shadow-2xl shadow-accent/40 flex items-center justify-center z-30 hover:bg-accent-hover transition-colors"
      aria-label="Открыть корзину"
    >
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {totalItems > 0 && (
        <motion.span
          key={totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-foreground text-white rounded-full text-xs font-sans flex items-center justify-center"
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  );
}