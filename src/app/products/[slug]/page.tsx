// src/app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { products, categoryLabels } from "@/data/products";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProductActions from "@/components/ProductActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: "Товар не найден | Пространство Тишины",
    };
  }

  return {
    title: `${product.title} | Пространство Тишины`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Похожие товары из той же категории
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Навигация */}
      <div className="pt-28 pb-4 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-4 font-sans"
          >
            <span>←</span>
            <span>Назад в каталог</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted font-sans">
            <Link href="/shop" className="hover:text-accent transition-colors">
              Каталог
            </Link>
            <span>/</span>
            <span>{categoryLabels[product.category]}</span>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Основная информация о товаре */}
      <section className="px-6 md:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Левая часть: Изображение */}
            <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden relative">
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-foreground/80 text-white px-4 py-2 rounded-full text-sm font-sans backdrop-blur-sm">
                  Нет в наличии
                </div>
              )}
            </div>

            {/* Правая часть: Информация и действия */}
            <div>
              {/* Категория */}
              <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
                {categoryLabels[product.category]}
              </p>

              {/* Заголовок */}
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
                {product.title}
              </h1>

              {/* Цена */}
              <p className="text-4xl font-serif text-accent mb-8">
                {product.price.toLocaleString("ru-RU")} ₽
              </p>

              {/* Краткое описание */}
              <p className="text-lg text-foreground/80 leading-relaxed font-sans mb-8">
                {product.description}
              </p>

              {/* Кнопки действий */}
              <ProductActions product={product} />

              {/* Характеристики */}
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  Характеристики
                </h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-foreground/5"
                    >
                      <span className="text-muted font-sans">{spec.label}</span>
                      <span className="text-foreground font-sans font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Особенности */}
              <div className="mt-8">
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  Особенности
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground/80 font-sans"
                    >
                      <span className="text-accent text-lg mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Полное описание */}
      <section className="px-6 md:px-24 py-16 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground mb-8">
            Описание
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed font-sans">
            {product.fullDescription}
          </p>
        </div>
      </section>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-foreground mb-8">
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all hover:shadow-xl"
                >
                  <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-accent uppercase tracking-wider font-sans mb-2">
                      {categoryLabels[related.category]}
                    </p>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-foreground/70 font-sans mb-4 line-clamp-2">
                      {related.description}
                    </p>
                    <p className="text-2xl font-serif text-accent">
                      {related.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}