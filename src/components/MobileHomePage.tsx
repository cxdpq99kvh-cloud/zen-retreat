// src/components/MobileHomePage.tsx
"use client";

import RetreatCard from "@/components/RetreatCard";
import { retreats } from "@/data/retreats";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import ShopSection from "@/components/ShopSection";
import HeroText from "@/components/HeroText";
import Stardust from "@/components/Stardust";
import StatsSection from "@/components/StatsSection";

export default function MobileHomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
        <Stardust />
        
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-secondary/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-xl text-center">
          <p className="text-muted uppercase tracking-[0.2em] text-xs mb-4 font-sans">
            Свердловская область • Выездные практики
          </p>
          
          <HeroText />
          
          <p className="text-base text-muted max-w-sm mx-auto mb-8 leading-relaxed font-light">
            Чем глубже вы в проблемах, тем тише внутренний голос.
            Время услышать не «надо», а своё «хочу».
          </p>
          
          <div className="flex flex-col gap-3 justify-center">
            <a 
              href="#retreats" 
              className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Ближайшие курсы
            </a>
            <a 
              href="#shop" 
              className="px-6 py-3 border border-foreground/20 text-foreground rounded-full font-sans text-sm uppercase tracking-wider hover:bg-secondary/50 transition-all duration-300"
            >
              Наша продукция
            </a>
          </div>
        </div>
      </section>

      {/* О пространстве */}
      <section className="py-12 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/2" />
        
        <div className="max-w-xl mx-auto relative">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            О пространстве
          </p>
          <h2 className="text-3xl font-serif text-foreground mb-6 leading-tight">
            Возвращение к себе,
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent italic pb-2 inline-block">
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
          <div className="pt-8">
            <StatsSection />
          </div>
        </div>
      </section>

      {/* Расписание */}
      <section id="retreats" className="py-12 px-6 bg-background">
        <div className="max-w-xl mx-auto">
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
            {retreats.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        </div>
      </section>

      {/* Остальные секции */}
      <PhilosophySection />
      <ProcessSection />
      <ShopSection />
    </main>
  );
}