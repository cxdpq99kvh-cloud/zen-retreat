// src/components/ShopSection.tsx
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";

export default function ShopSection() {
  const featuredProducts = [
    products.find((p) => p.id === "incense-sandalwood")!,
    products.find((p) => p.id === "statue-buddha")!,
    products.find((p) => p.id === "art-mandala-gold")!,
  ];

  const categoryLabels = {
    incense: "Благовония",
    statues: "Статуэтки",
    art: "Картины",
  };

  return (
    <section id="shop" className="py-24 px-6 md:px-24 bg-secondary/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
            Для практики дома
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Наша продукция
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Создайте своё пространство тишины дома. Благовония, статуэтки и авторские 
            картины, наполненные энергией уральской природы.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className="px-6 py-2 rounded-full font-sans text-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block px-10 py-4 border border-foreground/20 text-foreground rounded-full font-sans text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Смотреть все товары →
          </Link>
        </div>
      </div>
    </section>
  );
}