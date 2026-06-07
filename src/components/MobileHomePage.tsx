// src/components/MobileHomePage.tsx
"use client";

import StatsSection from "./StatsSection";

export default function MobileHomePage() {
  return (
    <>
      {/* Hero секция */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-foreground to-foreground/90">
        <img
          src="/images/hero-bg.jpg"
          alt="Пространство тишины"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            Свердловская область • Выездные практики
          </p>
          <h1 className="text-4xl font-serif text-white mb-6 leading-tight">
            Пространство
            <br />
            <span className="italic">Тишины</span>
          </h1>
          <p className="text-base text-white/80 leading-relaxed mb-8 font-sans">
            В мире постоянного шума и бесконечных уведомлений мы забываем слышать себя. 
            Наши практики — это не побег от реальности, а возвращение к ней.
          </p>
          <a
            href="#retreats"
            className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300"
          >
            Ближайшие курсы
          </a>
        </div>
      </section>

      {/* О пространстве */}
      <section className="py-12 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto relative">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            О пространстве
          </p>
          <h2 className="text-3xl font-serif text-foreground mb-6 leading-tight">
            Возвращение к себе,
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent italic">
              своей внутренней силе
            </span>
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-base text-muted leading-relaxed font-sans">
              Мы создаём уникальные практики, объединяющие древние знания об энергии тела 
              с современными подходами к осознанности.
            </p>
            <p className="text-base text-muted leading-relaxed font-sans">
              Наши программы помогают снять напряжение, восстановить внутренний баланс 
              и обрести ясность мышления.
            </p>
          </div>

          {/* Картинка */}
          <div className="relative mb-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/about-space.jpg"
                alt="Возвращение к себе"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            
            {/* Цитата */}
            <div className="absolute -bottom-4 left-4 right-4 bg-background/90 backdrop-blur-xl border border-foreground/10 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-foreground font-serif italic leading-relaxed">
                "Тишина — это не отсутствие звука, а присутствие себя"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-0.5 bg-accent" />
                <p className="text-xs text-muted font-sans">Наша философия</p>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="pt-12">
            <StatsSection />
          </div>
        </div>
      </section>

      {/* Расписание */}
      <section id="retreats" className="py-12 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-accent uppercase tracking-[0.2em] text-xs mb-3 font-sans">
              Расписание
            </p>
            <h2 className="text-3xl font-serif text-foreground mb-4">
              Ближайшие курсы
            </h2>
            <p className="text-base text-muted leading-relaxed font-sans">
              Выберите курс, который откликается вашему внутреннему состоянию.
            </p>
          </div>

          {/* Карточки курсов */}
          <div className="space-y-6">
            {/* Здесь будут карточки курсов - их нужно импортировать из основного файла */}
          </div>
        </div>
      </section>
    </>
  );
}