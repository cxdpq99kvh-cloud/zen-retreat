// src/app/retreats/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { retreats } from "@/data/retreats";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingBookingForm from "@/components/FloatingBookingForm";
import { ArrowLeft } from "lucide-react";

export default function RetreatPage() {
  const params = useParams();
  const router = useRouter();
  const retreat = retreats.find((r) => r.slug === params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!retreat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Курс не найден</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Кнопка "Назад" */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-24 left-6 z-40 w-12 h-12 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 text-foreground"
        aria-label="Вернуться на главную"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Hero секция */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] flex items-end overflow-hidden">
        <img src={retreat.image} alt={retreat.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 pb-8 md:pb-12 w-full">
          <p className="text-accent uppercase tracking-[0.2em] text-xs md:text-sm mb-3 md:mb-4 font-sans">{retreat.category || retreat.tags[0]}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight">{retreat.title}</h1>
          <div className="flex flex-wrap gap-3 md:gap-6 text-white/90 font-sans text-sm md:text-base">
            <span>📅 {retreat.dates}</span>
            <span>📍 {retreat.location}</span>
            <span>⏱ {retreat.duration}</span>
          </div>
        </div>
      </section>

      {/* О курсе + цена */}
      <section className="py-12 md:py-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-4 md:mb-6">О курсе</h2>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-6 md:mb-8 font-sans">{retreat.description}</p>

            {/* Уникальность курса */}
            {retreat.uniqueness && (
              <div className="bg-gradient-to-br from-secondary/30 to-accent/5 rounded-2xl p-6 md:p-8 mb-8 border border-accent/10">
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">✨</span>
                  {retreat.uniqueness.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6 font-sans text-sm md:text-base">{retreat.uniqueness.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {retreat.uniqueness.levels.map((level, idx) => (
                    <div key={idx} className="bg-background/80 backdrop-blur rounded-xl p-4 text-center border border-accent/10 hover:border-accent/30 transition-colors">
                      <p className="text-accent font-serif text-xl md:text-2xl mb-1">{level.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Карточка цены */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-secondary/30 rounded-2xl p-6 md:p-8">
              <p className="text-xs md:text-sm text-muted font-sans uppercase tracking-wider mb-2">Стоимость</p>
              <p className="text-3xl md:text-4xl font-serif text-foreground mb-6">{retreat.price.toLocaleString("ru-RU")} ₽</p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Записаться на курс
              </button>
              <p className="text-xs text-muted text-center mt-4 font-sans">Осталось мест: {retreat.spotsLeft}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Программа курса */}
      {retreat.weeks && retreat.weeks.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 text-center">Программа курса</h2>
            
            {/* Навигация по неделям */}
            <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8">
              {retreat.weeks.map((week, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentWeek(idx)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-sans text-xs md:text-sm font-medium transition-all duration-300 ${
                    currentWeek === idx
                      ? "bg-accent text-white shadow-lg scale-105"
                      : "bg-background text-foreground hover:bg-accent/10 border border-foreground/10"
                  }`}
                >
                  Неделя {week.number}
                </button>
              ))}
            </div>

            {/* Контент недели */}
            <div className="bg-background rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-serif shrink-0">
                  {retreat.weeks[currentWeek].number}
                </div>
                <h3 className="text-xl md:text-3xl font-serif text-foreground">{retreat.weeks[currentWeek].title}</h3>
              </div>
              <p className="text-muted text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-sans">{retreat.weeks[currentWeek].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {retreat.weeks[currentWeek].practices.map((practice, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 md:p-4 bg-secondary/30 rounded-xl">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <p className="text-foreground font-sans text-sm md:text-base">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Что включено */}
      {retreat.included && retreat.included.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 text-center">
              Что включено
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {retreat.included.map((item, idx) => (
                <div key={idx} className="bg-secondary/20 rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-accent text-xl md:text-2xl">✓</span>
                  </div>
                  <p className="text-foreground font-sans text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Что от вас потребуется */}
      {retreat.required && retreat.required.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 text-center">Что от вас потребуется</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {retreat.required.map((item, idx) => (
                <div key={idx} className="bg-background rounded-2xl p-5 md:p-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <span className="text-accent text-xl md:text-2xl">📋</span>
                  </div>
                  <p className="text-foreground font-sans text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {retreat.faq && retreat.faq.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 text-center">Частые вопросы</h2>
            <div className="space-y-3 md:space-y-4">
              {retreat.faq.map((faq, idx) => (
                <div key={idx} className="bg-secondary/20 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-secondary/40 transition-colors"
                  >
                    <span className="text-base md:text-lg font-serif text-foreground pr-4">{faq.question}</span>
                    <span className={`text-2xl text-accent transition-transform duration-300 shrink-0 ${openFaq === idx ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? "max-h-96" : "max-h-0"}`}>
                    <p className="px-5 md:px-6 pb-4 md:pb-5 text-muted leading-relaxed font-sans text-sm md:text-base">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Плавающая кнопка записи (мобильная) */}
      <div className="fixed bottom-6 left-6 right-6 lg:hidden z-40">
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300 shadow-2xl"
        >
          Записаться на курс
        </button>
      </div>

      {/* Плавающая форма записи */}
      <FloatingBookingForm 
        courseTitle={retreat.title}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <Footer />
    </main>
  );
}