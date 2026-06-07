"use client";

import RetreatCard from "@/components/RetreatCard";
import { retreats } from "@/data/retreats";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import ShopSection from "@/components/ShopSection";
import HeroText from "@/components/HeroText";
import Stardust from "@/components/Stardust";
import StatsSection from "@/components/StatsSection";

export default function DesktopHomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 md:p-24 overflow-hidden">
        <Stardust />
        
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-3xl text-center">
          <p className="text-muted uppercase tracking-[0.2em] text-sm mb-6 font-sans">
            Свердловская область • Выездные практики
          </p>
          
          <HeroText />
          
          <p className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Оставь городской шум позади. Погрузись в энергетические практики 
            и медитации в самых живописных уголках уральской природы.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#retreats" 
              className="px-8 py-4 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Ближайшие курсы
            </a>
            <a 
              href="#shop" 
              className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-sans text-sm uppercase tracking-wider hover:bg-secondary/50 transition-all duration-300"
            >
              Наша продукция
            </a>
          </div>
        </div>
      </section>

      {/* Секция "О пространстве" */}
      <section className="py-24 px-6 md:px-24 bg-background relative overflow-hidden">
        {/* Фоновые blob-эффекты */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px] translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Левая часть: текст */}
            <div className="order-2 lg:order-1">
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6 font-sans">
                О пространстве
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-8 leading-[1.1]">
                Возвращение к себе,
                <br />
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent italic pb-2 inline-block">
                  своей внутренней силе{" "}
                </span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted leading-relaxed font-sans">
                  Мы создаём уникальные практики, объединяющие древние знания об энергии тела 
                  с современными подходами к осознанности.
                </p>
                <p className="text-lg text-muted leading-relaxed font-sans">
                  Наши программы помогают снять напряжение, восстановить внутренний баланс 
                  и обрести ясность мышления. Каждая практика — это путь к себе настоящему.
                </p>
              </div>

              <StatsSection />
            </div>

            {/* Правая часть: современная картинка */}
            <div className="order-1 lg:order-2 relative">
              {/* Градиентная рамка */}
              <div className="relative group">
                {/* Внешняя градиентная рамка */}
                <div className="absolute -inset-1 bg-gradient-to-br from-accent via-accent/50 to-transparent rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500" />
                
                {/* Основной контейнер с картинкой */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10">
                  <img
                    src="/images/about-space.jpg"
                    alt="Возвращение к себе"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Градиентный оверлей */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                </div>

                {/* Стеклянная карточка с цитатой */}
                <div className="absolute -bottom-6 -left-6 md:-left-12 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 max-w-xs shadow-xl">
                  <p className="text-sm text-foreground font-serif italic leading-relaxed">
                    "Тишина — это не отсутствие звука, а присутствие себя"
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-8 h-0.5 bg-accent" />
                    <p className="text-xs text-muted font-sans">Наша философия</p>
                  </div>
                </div>

                {/* Декоративная точка */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full blur-md opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с курсами */}
      <section id="retreats" className="py-24 px-6 md:px-24 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Расписание
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
              Ближайшие курсы
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Выберите курс, который откликается вашему внутреннему состоянию. 
              Каждая встреча — это возможность замедлиться и услышать свой внутренний голос.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {retreats.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        </div>
      </section>

      <PhilosophySection />
      <ProcessSection />
      <ShopSection />
    </main>
  );
}