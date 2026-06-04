// src/components/ProcessSection.tsx

const steps = [
  {
    number: "01",
    title: "Выбор ретрита",
    description: "Изучите расписание и выберите практику, которая откликается вашему состоянию. Если есть вопросы — напишите нам, поможем определиться.",
  },
  {
    number: "02",
    title: "Подготовка",
    description: "За неделю до выезда мы отправим подробное письмо: что взять с собой, как добраться, что вас ждёт. Никакой суеты — только предвкушение.",
  },
  {
    number: "03",
    title: "Погружение",
    description: "Мы оставляем телефоны и городские заботы за порогом. Природа, практики, медитации и время для себя в тишине уральских гор.",
  },
  {
    number: "04",
    title: "Интеграция",
    description: "После ретрита вы получаете аудиозаписи медитаций и рекомендации, как сохранить состояние спокойствия в повседневной жизни.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 md:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
            Процесс
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Как это работает
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Мы создаём пространство, где каждый шаг продуман для вашего комфорта и глубины практики
          </p>
        </div>

        {/* Шаги */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-foreground/5 hover:border-accent/30 transition-all duration-500 group"
            >
              {/* Номер шага */}
              <div className="text-6xl font-serif text-accent/20 absolute top-4 right-6 group-hover:text-accent/40 transition-colors">
                {step.number}
              </div>

              {/* Контент */}
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-foreground mb-4 mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}