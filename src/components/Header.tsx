// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/#retreats", label: "Курсы" },
    { href: "/#philosophy", label: "Философия" },
    { href: "/#shop", label: "Магазин" },
    { href: "/about", label: "О нас" },
  ];

  // Определяем стиль шапки
  const headerStyle = isHomePage
    ? // На главной: прозрачная → с фоном при скролле
      isScrolled
        ? "bg-background/90 backdrop-blur-md shadow-sm"
        : "bg-transparent"
    : // На других страницах: сразу с фоном
      "bg-background/90 backdrop-blur-md shadow-sm";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerStyle} ${
          isScrolled || !isHomePage ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/images/logo.png"
                alt="Пространство Тишины"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg text-foreground leading-tight">
                Пространство
              </p>
              <p className="font-serif text-sm text-accent leading-tight">
                Тишины
              </p>
            </div>
          </Link>

          {/* Навигация (десктоп) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-foreground hover:text-accent transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Правая часть: корзина и бургер */}
          <div className="flex items-center gap-4">
            {/* Кнопка корзины (десктоп) */}
            <button
              onClick={openCart}
              className="relative p-2 text-foreground hover:text-accent transition-colors hidden lg:flex items-center gap-2"
              aria-label="Корзина"
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
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full text-xs font-sans flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Кнопка "Связаться" (десктоп) */}
            <Link
              href={isHomePage ? "#footer" : "/#footer"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hidden lg:inline-block px-6 py-2.5 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-md hover:shadow-lg shadow-accent/20"
            >
              Связаться
            </Link>

            {/* Бургер-меню (мобильное) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Меню"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-background shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Шапка меню */}
              <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/logo.png"
                      alt="Пространство Тишины"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-foreground leading-tight">
                      Пространство
                    </p>
                    <p className="font-serif text-sm text-accent leading-tight">
                      Тишины
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                  aria-label="Закрыть"
                >
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Навигация */}
              <nav className="flex-grow p-6">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-4 text-lg font-serif text-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Нижняя часть */}
              <div className="p-6 border-t border-foreground/10 space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full flex items-center justify-between px-4 py-4 bg-secondary/30 rounded-xl text-foreground hover:bg-secondary/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-sans">Корзина</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-sans">
                      {totalItems}
                    </span>
                  )}
                </button>

                <Link
                  href={isHomePage ? "#footer" : "/#footer"}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (isHomePage) {
                      e.preventDefault();
                      setTimeout(() => {
                        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }
                  }}
                  className="block w-full text-center px-6 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
                >
                  Связаться с нами
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}