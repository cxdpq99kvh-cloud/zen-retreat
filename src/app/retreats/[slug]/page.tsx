// src/app/retreats/[slug]/page.tsx
import { notFound } from "next/navigation";
import { retreats } from "@/data/retreats";
import Link from "next/link";
import Footer from "@/components/Footer";
import RetreatBookingForm from "@/components/RetreatBookingForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return retreats.map((retreat) => ({
    slug: retreat.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const retreat = retreats.find((r) => r.slug === slug);
  
  if (!retreat) {
    return {
      title: "Ретрит не найден | Пространство Тишины",
    };
  }

  return {
    title: `${retreat.title} | Пространство Тишины`,
    description: retreat.description,
  };
}

export default async function RetreatPage({ params }: Props) {
  const { slug } = await params;
  const retreat = retreats.find((r) => r.slug === slug);

  if (!retreat) {
    notFound();
  }

  const otherRetreats = retreats.filter((r) => r.id !== retreat.id);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={retreat.image}
          alt={retreat.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-24 text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/#retreats"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 font-sans"
            >
              <span>←</span>
              <span>Все ретриты</span>
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {retreat.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 leading-tight">
              {retreat.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-serif italic">
              {retreat.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Основная информация */}
      <section className="py-16 px-6 md:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Левая часть: контент */}
            <div className="lg:col-span-2">
              {/* Детали */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-sans mb-1">Локация</p>
                    <p className="text-sm text-foreground font-sans">{retreat.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-sans mb-1">Даты</p>
                    <p className="text-sm text-foreground font-sans">{retreat.dates}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⏱</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-sans mb-1">Длительность</p>
                    <p className="text-sm text-foreground font-sans">{retreat.duration}</p>
                  </div>
                </div>
              </div>

              {/* Описание */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-6">О практике</h2>
                <p className="text-lg text-foreground/80 leading-relaxed font-sans mb-4">
                  {retreat.description}
                </p>
                <p className="text-foreground/80 leading-relaxed font-sans">
                  Вас ждут медитации на рассвете, энергетические практики в живописных местах, 
                  работа с дыханием и полное погружение в тишину природы. Мы создаём безопасное 
                  пространство для трансформации и внутреннего покоя.
                </p>
              </div>

              {/* Программа */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-6">Программа</h2>
                <div className="space-y-6">
                  {retreat.program.map((day, index) => (
                    <div
                      key={index}
                      className="bg-secondary/20 rounded-2xl p-6 border border-foreground/5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-serif text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-xs text-accent font-sans uppercase tracking-wider">
                            {day.day}
                          </p>
                          <h3 className="font-serif text-xl text-foreground">
                            {day.title}
                          </h3>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-13">
                        {day.activities.map((activity, actIndex) => (
                          <li
                            key={actIndex}
                            className="flex items-start gap-3 text-foreground/80 font-sans"
                          >
                            <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Что включено */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-6">Что включено</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {retreat.included.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl"
                    >
                      <span className="text-accent text-lg mt-0.5">✓</span>
                      <span className="text-foreground/80 font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Что взять с собой */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-6">Что взять с собой</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {retreat.whatToBring.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-background border border-foreground/10 rounded-xl"
                    >
                      <span className="text-muted text-lg mt-0.5">→</span>
                      <span className="text-foreground/80 font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-6">Частые вопросы</h2>
                <div className="space-y-4">
                  {retreat.faq.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-secondary/20 rounded-xl border border-foreground/5 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-secondary/30 transition-colors">
                        <span className="font-serif text-lg text-foreground pr-4">
                          {item.question}
                        </span>
                        <span className="text-accent text-2xl group-open:rotate-45 transition-transform flex-shrink-0">
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-foreground/80 font-sans leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая часть: форма записи (sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RetreatBookingForm retreat={retreat} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Другие ретриты */}
      {otherRetreats.length > 0 && (
        <section className="py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-foreground mb-8">Другие ретриты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherRetreats.map((other) => (
                <Link
                  key={other.id}
                  href={`/retreats/${other.slug}`}
                  className="group bg-background rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all hover:shadow-xl"
                >
                  <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm text-muted font-sans mb-4">{other.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-foreground/70 font-sans">{other.dates}</p>
                      <p className="text-xl font-serif text-accent">
                        {other.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
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