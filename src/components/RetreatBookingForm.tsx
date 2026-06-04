// src/components/RetreatBookingForm.tsx
"use client";

import { useState } from "react";
import { Retreat } from "@/data/retreats";

type Props = {
  retreat: Retreat;
};

export default function RetreatBookingForm({ retreat }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      newErrors.phone = "Введите номер телефона";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "retreat",
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          retreatTitle: retreat.title,
        }),
      });

      if (!response.ok) throw new Error("Ошибка отправки");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      alert("Произошла ошибка. Пожалуйста, позвоните нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background border border-foreground/10 rounded-2xl p-6 shadow-lg">
      {/* Цена */}
      <div className="mb-6 pb-6 border-b border-foreground/10">
        <p className="text-sm text-muted font-sans mb-2">Стоимость ретрита</p>
        <p className="text-4xl font-serif text-accent">
          {retreat.price.toLocaleString("ru-RU")} ₽
        </p>
        <p className="text-sm text-muted font-sans mt-2">
          Осталось мест: <span className="text-accent font-medium">{retreat.spotsLeft}</span>
        </p>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-serif text-xl text-foreground mb-4">
          Записаться на ретрит
        </h3>

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
            className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
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
            className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
              errors.phone ? "border-red-500" : "border-foreground/10"
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 font-sans">{errors.phone}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Ваш вопрос (необязательно)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            disabled={isSubmitting || isSubmitted}
            className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans resize-none disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="w-full px-6 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:bg-muted disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправка..." : isSubmitted ? "✓ Заявка отправлена!" : "Отправить заявку"}
        </button>

        <p className="text-xs text-muted text-center font-sans">
          Мы свяжемся с вами в течение 24 часов
        </p>
      </form>

      {/* Контакты */}
      <div className="mt-6 pt-6 border-t border-foreground/10">
        <p className="text-sm text-muted font-sans mb-3">Есть вопросы?</p>
        <a
          href="tel:+79961869262"
          className="flex items-center gap-2 text-foreground hover:text-accent transition-colors font-sans"
        >
          <span>📞</span>
          <span>8 996 186 92 62</span>
        </a>
      </div>
    </div>
  );
}