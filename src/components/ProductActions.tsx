// src/components/ProductActions.tsx
"use client";

import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const { addToCart, updateQuantity, openCart, items } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    if (!product.inStock) return;
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      updateQuantity(product.id, 0);
    }
  };

  const handleOpenCart = () => {
    openCart();
  };

  if (!product.inStock) {
    return (
      <div className="space-y-4">
        <button
          disabled
          className="w-full px-8 py-4 bg-muted text-white rounded-xl font-sans text-sm uppercase tracking-wider cursor-not-allowed"
        >
          Нет в наличии
        </button>
        <p className="text-sm text-muted text-center font-sans">
          Оставьте заявку, и мы сообщим о поступлении
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isInCart ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="w-full px-8 py-5 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3"
        >
          <svg
            className="w-5 h-5"
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
          Добавить в корзину
        </motion.button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-stretch gap-3">
            {/* Счётчик */}
            <div className="flex items-center bg-background border border-foreground/10 rounded-xl overflow-hidden">
              <button
                onClick={handleDecrement}
                className="w-14 h-14 flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-colors font-sans text-xl"
                aria-label="Уменьшить"
              >
                −
              </button>
              <span className="text-base font-sans min-w-[50px] text-center text-foreground font-medium">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-14 h-14 flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-colors font-sans text-xl"
                aria-label="Увеличить"
              >
                +
              </button>
            </div>

            {/* Кнопка "В корзине" */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenCart}
              className="flex-1 px-6 py-4 bg-secondary text-foreground rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              В корзине
            </motion.button>
          </div>

          <p className="text-sm text-muted text-center font-sans">
            Итого:{" "}
            <span className="text-accent font-medium">
              {(product.price * quantity).toLocaleString("ru-RU")} ₽
            </span>
          </p>
        </div>
      )}

      {/* Доставка */}
      <div className="pt-6 border-t border-foreground/10 space-y-3">
        <div className="flex items-center gap-3 text-sm text-foreground/70 font-sans">
          <span className="text-lg">🚚</span>
          <span>Доставка по всей России</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground/70 font-sans">
          <span className="text-lg">↩️</span>
          <span>Возврат в течение 14 дней</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground/70 font-sans">
          <span className="text-lg">💬</span>
          <span>Поддержка в Telegram</span>
        </div>
      </div>
    </div>
  );
}