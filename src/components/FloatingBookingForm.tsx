// src/components/FloatingBookingForm.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FloatingBookingFormProps {
  courseTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingBookingForm({ courseTitle, isOpen, onClose }: FloatingBookingFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });

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
          course: courseTitle,
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ email: "", phone: "", message: "" });
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 bg-background border border-foreground/10 rounded-3xl shadow-2xl z-50 overflow-hidden">
      {/* Заголовок */}
      <div className="bg-accent/10 p-5 flex items-center justify-between border-b border-foreground/10">
        <div>
          <p className="text-xs text-muted font-sans uppercase tracking-wider">Запись на курс</p>
          <p className="text-lg font-serif text-foreground">{courseTitle}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {isSuccess ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">✨</p>
            <p className="text-xl font-serif text-foreground mb-2">Заявка отправлена!</p>
            <p className="text-sm text-muted">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
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
                className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
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
                className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                required
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Вопрос или пожелания */}
            <div>
              <label className="block text-xs text-muted font-sans uppercase tracking-wider mb-2">
                Вопрос или пожелания
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите, что для вас важно..."
                rows={3}
                className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 rounded-xl font-sans text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent-hover text-white px-6 py-4 rounded-full font-sans uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Отправка..." : "Записаться"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}