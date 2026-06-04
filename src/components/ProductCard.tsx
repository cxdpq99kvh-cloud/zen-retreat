// src/components/ProductCard.tsx
"use client";

import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, openCart, items } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      updateQuantity(product.id, 0);
    }
  };

  const handleOpenCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openCart();
  };

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <article className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 flex flex-col h-full">
        {/* Изображение */}
        <div className="aspect-square bg-secondary/30 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent z-10 pointer-events-none" />

          {!product.inStock && (
            <div className="absolute top-4 left-4 z-20 bg-foreground/80 text-white px-3 py-1 rounded-full text-xs font-sans backdrop-blur-sm">
              Нет в наличии
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Цена и кнопки */}
          <div className="pt-4 border-t border-foreground/10 mt-auto space-y-3">
            <p className="text-2xl font-serif text-foreground">
              {product.price.toLocaleString("ru-RU")} ₽
            </p>

            {!isInCart ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                disabled={!product.inStock}
                className="w-full px-5 py-2.5 bg-accent text-white rounded-full font-sans text-xs uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 disabled:bg-muted disabled:cursor-not-allowed shadow-md hover:shadow-lg shadow-accent/30"
              >
                В корзину
              </motion.button>
            ) : (
              <div className="flex items-stretch gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenCart}
                  className="flex-1 px-3 py-2 bg-secondary text-foreground rounded-full font-sans text-xs uppercase tracking-wider hover:bg-secondary/80 transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
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
                  <span>В корзине</span>
                </motion.button>

                <div className="flex items-center bg-background border border-foreground/10 rounded-full shadow-sm overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    className="w-9 h-9 flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-colors font-sans text-base"
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <span className="text-xs font-sans min-w-[28px] text-center text-foreground font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-9 h-9 flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-colors font-sans text-base"
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}