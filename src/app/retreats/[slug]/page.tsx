// src/app/retreats/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { retreats } from "@/data/retreats";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Check, Mail, Phone, MessageSquare } from "lucide-react";

export default function RetreatPage() {
  const params = useParams();
  const router = useRouter();
  const retreat = retreats.find((r) => r.slug === params.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Форма записи
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });

  if (!retreat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Курс не найден</p>
      </div>
    );
  }

  const validateEmail = (email: string) => {
    return email.includes("@") && email.indexOf("@") > 0 && email.indexOf("@") < email.length - 1;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = "+7";
    if (numbers.length > 1) formatted += " (" + numbers.slice(1, 4);
    if (numbers.length >= 4) formatted += ") " + numbers.slice(4, 7);
    if (numbers.length >= 7) formatted += "-" + numbers.slice(7, 9);
    if (numbers.length >= 9) formatted += "-" + numbers.slice(9, 11);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 11) {
      setFormData({ ...formData, phone: formatPhone(value) });
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    const newErrors = { email: "", phone: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Введите корректный email";
      hasError = true;
    }

    if (formData.phone.replace(/\D/g, "").length !== 11) {
      newErrors.phone = "Введите корректный номер телефона";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Запись на курс",
          course: retreat.title,
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Кнопка "Назад" */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-24 left-6 z-40 w-12 h-12 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 text-foreground group"
        aria-label="Вернуться на главную"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
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

      {/* О курсе + Запись */}
      <section className="py-12 md:py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            {/* О курсе — в едином стиле */}
            <div className="relative mb-8 md:mb-12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              
              <div className="pt-8 md:pt-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                    О курсе
                  </span>
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed font-sans">
                  {retreat.description}
                </p>
              </div>
            </div>

            {/* Уникальность курса — компактный и элегантный */}
            {retreat.uniqueness && (
              <div className="relative mb-8 md:mb-12 py-6 md:py-8">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 md:mb-6 leading-[1.1] tracking-tight">
                    <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                      {retreat.uniqueness.title}
                    </span>
                  </h3>

                  <p className="text-base md:text-lg lg:text-xl text-muted leading-relaxed font-light">
                    {retreat.uniqueness.description.split(' ').map((word, idx) => {
                      const keywords = ['психологию', 'цигун', 'гипнотерапия', 'НЛП', 'космоэнергетика', 'ангельская', 'сакральная'];
                      const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase().replace(',', '')));
                      
                      return (
                        <span key={idx}>
                          {isKeyword ? (
                            <span className="text-accent font-serif italic">{word} </span>
                          ) : (
                            <span>{word} </span>
                          )}
                        </span>
                      );
                    })}
                  </p>

                  <div className="mt-6 md:mt-8 flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <div className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-accent/30 rounded-full" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
                    <p className="text-xs text-muted font-serif italic whitespace-nowrap">
                      4 уровня трансформации
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Форма записи */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Стоимость */}
              <div className="bg-gradient-to-br from-accent/10 to-secondary/30 rounded-3xl p-8 border border-accent/20">
                <p className="text-xs text-muted font-sans uppercase tracking-wider mb-2">Стоимость курса</p>
                <p className="text-4xl md:text-5xl font-serif text-foreground mb-2">{retreat.price.toLocaleString("ru-RU")} ₽</p>
                <p className="text-sm text-muted font-sans">Осталось мест: {retreat.spotsLeft}</p>
              </div>

              {/* Форма */}
              <div className="bg-secondary/20 rounded-3xl p-6 md:p-8 border border-foreground/5">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-xl font-serif text-foreground mb-2">Заявка отправлена!</p>
                    <p className="text-sm text-muted">Мы свяжемся с вами в ближайшее время</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-serif text-foreground mb-6">Записаться на курс</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Имя */}
                      <div>
                        <label className="block text-xs text-muted font-sans uppercase tracking-wider mb-2">
                          Имя
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ваше имя"
                          className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-muted font-sans uppercase tracking-wider mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setErrors({ ...errors, email: "" });
                          }}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                          required
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      {/* Телефон */}
                      <div>
                        <label className="block text-xs text-muted font-sans uppercase tracking-wider mb-2">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                          required
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      {/* Кнопка */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-accent-hover text-white px-6 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? "Отправка..." : "Записаться"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Программа курса */}
      {retreat.weeks && retreat.weeks.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-8 md:mb-12 text-center">Программа курса</h2>
            
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
        <section className="py-16 md:py-24 px-6 md:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-12 md:mb-16 text-center">
              Что включено
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {retreat.included.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-gradient-to-br from-background to-secondary/20 rounded-2xl p-8 border border-foreground/5 hover:border-accent/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Check className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Что от вас потребуется */}
      {retreat.required && retreat.required.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-24 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-12 md:mb-16 text-center">Что от вас потребуется</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {retreat.required.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-background rounded-2xl p-6 md:p-8 border border-foreground/5 hover:border-accent/20 hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <span className="text-accent text-2xl">📋</span>
                  </div>
                  <p className="text-foreground font-sans text-base md:text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {retreat.faq && retreat.faq.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-12 md:mb-16 text-center">Частые вопросы</h2>
            <div className="space-y-4">
              {retreat.faq.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="group bg-gradient-to-br from-secondary/20 to-background rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/20 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-base md:text-xl font-serif text-foreground pr-4 group-hover:text-accent transition-colors">{faq.question}</span>
                    <div className={`w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all duration-300 ${openFaq === idx ? "rotate-45" : ""}`}>
                      <span className="text-2xl text-accent font-light">+</span>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? "max-h-96" : "max-h-0"}`}>
                    <p className="px-6 md:px-8 pb-5 md:pb-6 text-muted leading-relaxed font-sans text-sm md:text-base">{faq.answer}</p>
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