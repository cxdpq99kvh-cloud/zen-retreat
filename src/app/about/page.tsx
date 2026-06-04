// src/app/about/page.tsx
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "О нас",
  description:
    "Узнайте больше о нашей философии, команде и подходе к практикам. 5 лет опыта, 200+ участников, 15 ретритов в самых живописных местах Урала.",
  openGraph: {
    title: "О нас | Пространство Тишины",
    description:
      "Узнайте больше о нашей философии, команде и подходе к практикам.",
    images: ["/images/og-image.jpg"],
  },
};

export default function AboutPage() {
  const team = [
    {
      name: "Анна Светлова",
      role: "Основатель, ведущая практик",
      description: "10 лет опыта в медитации и энергетических практиках. Прошла обучение в Индии и Тибете.",
      image: "/images/team1.jpg",
    },
    {
      name: "Дмитрий Горный",
      role: "Инструктор йоги",
      description: "Сертифицированный инструктор хатха-йоги. Специализация — работа с дыханием и телом.",
      image: "/images/team2.jpg",
    },
    {
      name: "Мария Лесная",
      role: "Звукотерапевт",
      description: "Практикующий звукотерапевт. Работает с поющими чашами, гонгами и камертонами.",
      image: "/images/team3.jpg",
    },
  ];

  const values = [
    {
      icon: "🌿",
      title: "Связь с природой",
      description: "Мы выбираем самые живописные места Урала, где природа становится проводником к внутреннему покою.",
    },
    {
      icon: "🧘",
      title: "Глубина практик",
      description: "Наши практики — это не поверхностная релаксация, а глубокая работа с сознанием и энергией.",
    },
    {
      icon: "💚",
      title: "Безопасное пространство",
      description: "Мы создаём атмосферу принятия и поддержки, где каждый может быть собой.",
    },
    {
      icon: "✨",
      title: "Трансформация",
      description: "Каждый ретрит — это возможность для внутренних изменений и нового взгляда на жизнь.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 font-sans"
          >
            <span>←</span>
            <span>На главную</span>
          </Link>

          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
            О нас
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
            Наша история <br />
            <span className="italic text-accent">и миссия</span>
          </h1>
          <p className="text-lg text-muted max-w-3xl leading-relaxed">
            Мы — команда практиков, которые верят в силу природы и древних знаний.
            Наша миссия — помочь людям найти внутреннюю тишину в мире постоянного шума.
          </p>
        </div>
      </section>

      {/* История */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
            Как всё началось
          </h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed font-sans">
            <p>
              Всё началось в 2019 году, когда основатель проекта Анна Светлова
              вернулась из путешествия по Индии, где провела полгода в ашраме,
              изучая медитацию и энергетические практики.
            </p>
            <p>
              Вернувшись в Екатеринбург, она поняла, что хочет поделиться
              полученными знаниями с людьми, которые живут в ритме большого
              города и нуждаются в пространстве для восстановления.
            </p>
            <p>
              Так родилась идея «Пространства Тишины» — места, где можно
              замедлиться, услышать себя и наполниться энергией природы.
              Мы выбрали Уральские горы как идеальное место для практик —
              здесь сила земли сочетается с красотой лесов и озёр.
            </p>
            <p>
              За 5 лет мы провели более 15 ретритов, через которые прошло
              более 200 участников. Многие из них возвращаются снова и снова,
              потому что каждый ретрит — это новый опыт и новая глубина.
            </p>
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="py-20 px-6 md:px-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Наши ценности
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
              Во что мы верим
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-foreground/5 hover:border-accent/30 transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Команда
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
              Люди, которые создают <br />
              <span className="italic text-accent">пространство</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all"
              >
                <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent font-sans mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-24 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            Готовы начать своё <br />
            <span className="italic text-accent">путешествие?</span>
          </h2>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Присоединяйтесь к нашим практикам и откройте для себя
            пространство внутренней тишины
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#retreats"
              className="px-8 py-4 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
            >
              Ближайшие ретриты
            </a>
            <a
              href="/#footer"
              className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-sans text-sm uppercase tracking-wider hover:bg-secondary/50 transition-all"
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}