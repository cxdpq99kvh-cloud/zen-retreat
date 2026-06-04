// src/components/RetreatModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { Retreat } from "@/data/retreats";

type RetreatModalProps = {
  retreat: Retreat | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function RetreatModal({ retreat, isOpen, onClose }: RetreatModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!retreat) return null;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    
    let cleanDigits = digits;
    if (cleanDigits.startsWith("8")) {
      cleanDigits = "7" + cleanDigits.slice(1);
    }
    if (cleanDigits.startsWith("7") || cleanDigits.startsWith("8")) {
      cleanDigits = cleanDigits.slice(1);
    }
    
    cleanDigits = cleanDigits.slice(0, 10);
    
    let formatted = "+7 ";
    if (cleanDigits.length > 0) {
      formatted += "(" + cleanDigits.slice(0, 3);
    }
    if (cleanDigits.length >= 4) {
      formatted += ") " + cleanDigits.slice(3, 6);
    }
    if (cleanDigits.length >= 7) {
      formatted += "-" + cleanDigits.slice(6, 8);
    }
    if (cleanDigits.length >= 9) {
      formatted += "-" + cleanDigits.slice(8, 10);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setFormData({ ...formData, phone: formatted });
    
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      newErrors.phone = "Введите номер телефона в формате +7 (XXX) XXX-XX-XX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "retreat",
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          retreatTitle: retreat.title,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", message: "" });
        setErrors({});
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам по телефону.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Изображение */}
      <div className="aspect-video bg-secondary/30 relative overflow-hidden rounded-t-2xl">
        <img
          src={retreat.image}
          alt={retreat.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg z-10 group"
          aria-label="Закрыть"
        >
          <svg
            className="w-6 h-6 text-foreground group-hover:text-accent transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {retreat.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-sans uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-1">
            {retreat.title}
          </h2>
          <p className="text-white/80 font-sans">{retreat.subtitle}</p>
        </div>
      </div>

      {/* Контент */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span>📍</span>
            </div>
            <div>
              <p className="text-xs text-muted font-sans">Локация</p>
              <p className="text-sm text-foreground font-sans">{retreat.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span>📅</span>
            </div>
            <div>
              <p className="text-xs text-muted font-sans">Даты</p>
              <p className="text-sm text-foreground font-sans">{retreat.dates}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span>⏱</span>
            </div>
            <div>
              <p className="text-xs text-muted font-sans">Длительность</p>
              <p className="text-sm text-foreground font-sans">{retreat.duration}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-serif text-xl text-foreground mb-4">О практике</h3>
          <p className="text-foreground/80 leading-relaxed font-sans">
            {retreat.description}
          </p>
          <p className="text-foreground/80 leading-relaxed font-sans mt-4">
            Вас ждут медитации на рассвете, энергетические практики в живописных местах, 
            работа с дыханием и полное погружение в тишину природы. Мы создаём безопасное 
            пространство для трансформации и внутреннего покоя.
          </p>
        </div>

        <div className="mb-8 p-6 bg-secondary/30 rounded-xl">
          <h3 className="font-serif text-xl text-foreground mb-4">Что включено</h3>
          <ul className="space-y-2 text-foreground/80 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Проживание в комфортных условиях</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Вегетарианское питание</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Все практики и медитации</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">✓</span>
              <span>Аудиозаписи медитаций после ретрита</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl text-foreground mb-1">Записаться на ретрит</h3>
              <p className="text-sm text-muted font-sans">Оставьте заявку, и мы свяжемся с вами</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted font-sans">Стоимость</p>
              <p className="text-2xl font-serif text-accent">
                {retreat.price.toLocaleString("ru-RU")} ₽
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                disabled={isSubmitting || isSubmitted}
                className={`w-full px-5 py-4 bg-background border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
                  errors.name ? "border-red-500" : "border-foreground/10"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 font-sans">{errors.name}</p>
              )}
            </div>
            
            <div>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handlePhoneChange}
                disabled={isSubmitting || isSubmitted}
                className={`w-full px-5 py-4 bg-background border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
                  errors.phone ? "border-red-500" : "border-foreground/10"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1 font-sans">{errors.phone}</p>
              )}
              <p className="text-xs text-muted mt-1 font-sans">
                Формат: +7 (900) 123-45-67
              </p>
            </div>
            
            <div>
              <textarea
                placeholder="Ваш вопрос или пожелания (необязательно)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                disabled={isSubmitting || isSubmitted}
                className="w-full px-5 py-4 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans resize-none disabled:opacity-50"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 border border-foreground/20 text-foreground rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-foreground/5 transition-all disabled:opacity-50"
              >
                Закрыть
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="flex-1 px-8 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20 disabled:bg-muted disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Отправка..." : isSubmitted ? "✓ Заявка отправлена!" : "Отправить заявку"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}