// src/app/shop/page.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categoryLabels } from "@/data/products";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Шапка с увеличенным отступом сверху */}
      <div className="bg-secondary/20 pt-32 pb-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 font-sans relative z-10"
          >
            <span>←</span>
            <span>На главную</span>
          </Link>
          
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
            Каталог
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Наша продукция
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Создайте своё пространство тишины дома. Благовония, статуэтки и авторские 
            картины, наполненные энергией уральской природы.
          </p>
        </div>
      </div>

      {/* Фильтры и товары */}
      <div className="py-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Категории */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full font-sans text-sm border transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-accent text-white border-accent"
                  : "border-foreground/20 text-foreground hover:bg-accent hover:text-white hover:border-accent"
              }`}
            >
              Все товары
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2 rounded-full font-sans text-sm border transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-accent text-white border-accent"
                    : "border-foreground/20 text-foreground hover:bg-accent hover:text-white hover:border-accent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted font-sans">Товары в этой категории скоро появятся</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}