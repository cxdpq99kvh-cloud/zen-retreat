// src/components/PhilosophySection.tsx

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 px-6 md:px-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Левая часть: Изображение */}
          <div className="aspect-[4/5] bg-secondary/40 rounded-2xl overflow-hidden relative">
            <img
              src="/images/meditation.jpg"
              alt="Медитация в природе"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
          </div>

          {/* Правая часть: Текст */}
          <div>
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Наша философия
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
              Возвращение <br />к истокам
            </h2>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                В мире постоянного шума и бесконечных уведомлений мы забываем 
                слышать себя. Наши практики — это не побег от реальности, 
                а возвращение к ней. К настоящей, живой, дышащей.
              </p>
              <p>
                Мы выбираем самые живописные уголки Свердловской области — 
                горные озёра, вековые леса, тихие долины. Природа здесь 
                становится проводником, а тишина — учителем.
              </p>
              <p>
                Каждая практика — это пространство, где можно замедлиться, 
                услышать свой внутренний голос и наполниться энергией 
                для новой главы жизни.
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-foreground/10">
              <div>
                <p className="text-3xl font-serif text-accent mb-2">5+</p>
                <p className="text-sm text-muted font-sans">лет практики</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-accent mb-2">200+</p>
                <p className="text-sm text-muted font-sans">участников</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-accent mb-2">15</p>
                <p className="text-sm text-muted font-sans">ретритов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}