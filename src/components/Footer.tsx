// src/components/Footer.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatPhone, isValidPhone } from "@/utils/phone";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Пожалуйста, введите имя");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert("Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка. Пожалуйста, позвоните нам по телефону.");
    }
  };

  const socialLinks = [
    { name: "Telegram", href: "#", icon: "✈️" },
    { name: "WhatsApp", href: "#", icon: "💬" },
    { name: "VK", href: "#", icon: "🔵" },
    { name: "Instagram", href: "#", icon: "📷" },
  ];

  return (
    <footer id="footer" className="bg-foreground text-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-accent" />
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-24 py-20 relative z-10">
        {/* Верхняя часть: Форма и Контакты */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Левая часть: Форма записи */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Связаться с нами
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-background mb-8 leading-tight">
              Запишитесь на <br />
              <span className="italic text-accent">практику</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-background/5 border border-background/10 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  required
                  className="w-full px-5 py-4 bg-background/5 border border-background/10 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans"
                />
                <p className="text-xs text-background/40 mt-1 font-sans">
                  Формат: +7 (900) 123-45-67
                </p>
              </div>
              
              <div>
                <textarea
                  placeholder="Ваш вопрос или пожелания"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 bg-background/5 border border-background/10 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20"
              >
                {isSubmitted ? "✓ Заявка отправлена!" : "Отправить заявку"}
              </button>
            </form>
          </motion.div>

          {/* Правая часть: Контакты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pl-12"
          >
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4 font-sans">
              Контакты
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-background mb-8 leading-tight">
              Мы всегда <br />
              <span className="italic text-accent">на связи</span>
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-background/60 text-sm font-sans mb-1">Адрес</p>
                  <p className="text-background font-sans">
                    Свердловская область, <br />
                    г. Екатеринбург (выездные практики)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-background/60 text-sm font-sans mb-1">Телефон</p>
                  <a href="tel:+79961869262" className="text-background font-sans hover:text-accent transition-colors">
                    8 996 186 92 62
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-background/60 text-sm font-sans mb-1">Email</p>
                  <a href="mailto:ludadyachuk1111@gmail.com" className="text-background font-sans hover:text-accent transition-colors">
                    ludadyachuk1111@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🕐</span>
                </div>
                <div>
                  <p className="text-background/60 text-sm font-sans mb-1">Режим работы</p>
                  <p className="text-background font-sans">
                    Ежедневно с 9:00 до 21:00
                  </p>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div>
              <p className="text-background/60 text-sm font-sans mb-4">Мы в соцсетях:</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-background/5 border border-background/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
                    title={social.name}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Разделитель */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Нижняя часть: Копирайт и ссылки */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60 font-sans">
          <p>© 2026 Пространство Тишины. Все права защищены.</p>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}