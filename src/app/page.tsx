// src/app/page.tsx
import RetreatCard from "@/components/RetreatCard";
import { retreats } from "@/data/retreats";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import ShopSection from "@/components/ShopSection";
import HeroText from "@/components/HeroText";
import Stardust from "@/components/Stardust";
import Footer from "@/components/Footer";
// Trigger redeploy
export default function Home() {
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
              Ближайшие ретриты
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
      <section className="py-24 px-6 md:px-24 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая часть: текст */}
            <div>
              <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
                О пространстве
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
                Возвращение к себе,
                <br />
                <span className="italic text-accent">своей внутренней силе</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-6 font-sans">
                Мы создаём уникальные практики, объединяющие древние знания об энергии тела 
                с современными подходами к осознанности.
              </p>
              <p className="text-lg text-muted leading-relaxed font-sans">
                Наши программы помогают снять напряжение, восстановить внутренний баланс 
                и обрести ясность мышления. Каждая практика — это путь к себе настоящему.
              </p>

              {/* Декоративные элементы */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-12 h-0.5 bg-accent" />
                <p className="text-sm text-foreground/70 font-serif italic">
                  Тишина — это не отсутствие звука, а присутствие себя
                </p>
              </div>
            </div>

            {/* Правая часть: картинка */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10">
                <img
                  src="/images/about-space.jpg"
                  alt="Возвращение к себе"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Декоративный элемент */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Секция с ретритами */}
      <section id="retreats" className="py-24 px-6 md:px-24 bg-background relative"></section>

      {/* Секция с ретритами */}
      <section id="retreats" className="py-24 px-6 md:px-24 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Расписание
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
              Ближайшие практики
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Выберите ретрит, который откликается вашему внутреннему состоянию. 
              Каждая практика — это путешествие к себе.
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
      <Footer />
    </main>
  );
}