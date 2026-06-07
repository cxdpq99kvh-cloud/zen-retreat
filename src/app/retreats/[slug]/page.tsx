// src/app/retreats/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { retreats } from "@/data/retreats";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart } from "lucide-react";

export default function RetreatPage() {
  const params = useParams();
  const retreat = retreats.find((r) => r.slug === params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  if (!retreat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Курс не найден</p>
      </div>
    );
  }

  const nextWeek = () => {
    if (!retreat.weeks || isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("right");
    setCurrentWeek((prev) => (prev + 1) % retreat.weeks!.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevWeek = () => {
    if (!retreat.weeks || isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("left");
    setCurrentWeek((prev) => (prev - 1 + retreat.weeks!.length) % retreat.weeks!.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToWeek = (idx: number) => {
    if (isAnimating || idx === currentWeek) return;
    setIsAnimating(true);
    setSlideDirection(idx > currentWeek ? "right" : "left");
    setCurrentWeek(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero секция */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={retreat.image} alt={retreat.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 pb-12 w-full">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">{retreat.category || retreat.tags[0]}</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">{retreat.title}</h1>
          <div className="flex flex-wrap gap-6 text-white/90 font-sans">
            <span>📅 {retreat.dates}</span>
            <span>📍 {retreat.location}</span>
            <span>⏱ {retreat.duration}</span>
          </div>
        </div>
      </section>

      {/* О курсе + цена */}
      <section className="py-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">О курсе</h2>
            <p className="text-lg text-muted leading-relaxed mb-8 font-sans">{retreat.description}</p>

            {/* Уникальность курса (если есть) */}
            {retreat.uniqueness && (
              <div className="bg-secondary/30 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-serif text-foreground mb-4">{retreat.uniqueness.title}</h3>
                <p className="text-muted leading-relaxed mb-6 font-sans">{retreat.uniqueness.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {retreat.uniqueness.levels.map((level, idx) => (
                    <div key={idx} className="bg-background rounded-xl p-4 text-center">
                      <p className="text-accent font-serif text-xl mb-1">{level.name}</p>
                      <p className="text-xs text-muted font-sans">{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Карточка цены */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-secondary/30 rounded-2xl p-8">
              <p className="text-sm text-muted font-sans uppercase tracking-wider mb-2">Стоимость</p>
              <p className="text-4xl font-serif text-foreground mb-6">{retreat.price.toLocaleString("ru-RU")} ₽</p>
              <button className="w-full bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Записаться
              </button>
              <p className="text-xs text-muted text-center mt-4 font-sans">Осталось мест: {retreat.spotsLeft}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Программа курса со свайпером (для онлайн-курсов) */}
      {retreat.weeks && retreat.weeks.length > 0 && (
        <section className="py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12 text-center">Программа курса</h2>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Навигация по неделям */}
              <div className="flex justify-center gap-4 mb-8">
                {retreat.weeks.map((week, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToWeek(idx)}
                    className={`px-6 py-3 rounded-full font-sans text-sm transition-all duration-300 ${
                      currentWeek === idx
                        ? "bg-accent text-white"
                        : "bg-background text-foreground hover:bg-accent/10"
                    }`}
                  >
                    Неделя {week.number}
                  </button>
                ))}
              </div>

              {/* Контейнер с контентом */}
              <div className="relative bg-background rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
                <div
                  key={currentWeek}
                  className={`transition-all duration-500 ease-out ${
                    slideDirection === "right"
                      ? "animate-[slide-in-right_0.5s_ease-out]"
                      : "animate-[slide-in-left_0.5s_ease-out]"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-serif">
                      {retreat.weeks[currentWeek].number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground">{retreat.weeks[currentWeek].title}</h3>
                  </div>
                  <p className="text-muted text-lg leading-relaxed mb-8 font-sans">{retreat.weeks[currentWeek].description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {retreat.weeks[currentWeek].practices.map((practice, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <p className="text-foreground font-sans">{practice}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Стрелки навигации */}
                <button
                  onClick={prevWeek}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background hover:bg-accent hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 text-foreground"
                  aria-label="Предыдущая неделя"
                >
                  ←
                </button>
                <button
                  onClick={nextWeek}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background hover:bg-accent hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 text-foreground"
                  aria-label="Следующая неделя"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Что включено */}
      {retreat.included && retreat.included.length > 0 && (
        <section className="py-16 px-6 md:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12 text-center">
              {retreat.weeks ? "Что включено" : "Что включено в стоимость"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {retreat.included.map((item, idx) => (
                <div key={idx} className="bg-secondary/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-accent text-2xl">✓</span>
                  </div>
                  <p className="text-foreground font-sans">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Что от вас потребуется (для онлайн-курсов) */}
      {retreat.required && retreat.required.length > 0 && (
        <section className="py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12 text-center">Что от вас потребуется</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {retreat.required.map((item, idx) => (
                <div key={idx} className="bg-background rounded-2xl p-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-accent text-2xl">📋</span>
                  </div>
                  <p className="text-foreground font-sans">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Что взять с собой (для офлайн-ретритов) */}
      {retreat.whatToBring && retreat.whatToBring.length > 0 && (
        <section className="py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12 text-center">Что взять с собой</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retreat.whatToBring.map((item, idx) => (
                <div key={idx} className="bg-background rounded-2xl p-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-accent text-2xl">🎒</span>
                  </div>
                  <p className="text-foreground font-sans">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {retreat.faq && retreat.faq.length > 0 && (
        <section className="py-16 px-6 md:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-12 text-center">Частые вопросы</h2>
            <div className="space-y-4">
              {retreat.faq.map((faq, idx) => (
                <div key={idx} className="bg-secondary/20 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/40 transition-colors"
                  >
                    <span className="text-lg font-serif text-foreground">{faq.question}</span>
                    <span className={`text-2xl text-accent transition-transform duration-300 ${openFaq === idx ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? "max-h-96" : "max-h-0"}`}>
                    <p className="px-6 pb-5 text-muted leading-relaxed font-sans">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}