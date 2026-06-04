// src/components/CartSidebar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPhone, isValidPhone } from "@/utils/phone";

export default function CartSidebar() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    closeCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [formData, setFormData] = useState({
    phone: "",
    telegram: "",
    delivery: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Введите номер телефона в формате +7 (XXX) XXX-XX-XX";
    }

    if (!formData.telegram || !formData.telegram.startsWith("@")) {
      newErrors.telegram = "Telegram должен начинаться с @";
    }

    if (!formData.delivery) {
      newErrors.delivery = "Выберите способ доставки";
    }

    if (formData.delivery && !formData.address.trim()) {
      newErrors.address = "Введите адрес доставки";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const deliveryPrice = formData.delivery === "pochta" ? 350 : formData.delivery === "cdek" ? 500 : 0;
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order",
          phone: formData.phone,
          telegram: formData.telegram,
          delivery: formData.delivery,
          address: formData.address,
          comment: formData.comment,
          items: items.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: totalPrice + deliveryPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setStep("success");
      setTimeout(() => {
        clearCart();
        setStep("cart");
        setFormData({ phone: "", telegram: "", delivery: "", address: "", comment: "" });
        closeCart();
      }, 3000);
    } catch (error) {
      console.error("Ошибка отправки заказа:", error);
      alert("Произошла ошибка при оформлении заказа. Пожалуйста, позвоните нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    closeCart();
    setTimeout(() => setStep("cart"), 300);
  };

  const deliveryPrice = formData.delivery === "pochta" ? 350 : formData.delivery === "cdek" ? 500 : 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div>
                <h2 className="font-serif text-2xl text-foreground">
                  {step === "cart" && "Корзина"}
                  {step === "checkout" && "Оформление"}
                  {step === "success" && "Готово!"}
                </h2>
                {step === "cart" && items.length > 0 && (
                  <p className="text-sm text-muted font-sans mt-1">
                    {items.length}{" "}
                    {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors disabled:opacity-50"
                aria-label="Закрыть"
              >
                <svg
                  className="w-5 h-5 text-foreground"
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
            </div>

            <div className="flex-grow overflow-y-auto">
              {step === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
                        <svg
                          className="w-10 h-10 text-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-2">
                        Корзина пуста
                      </h3>
                      <p className="text-sm text-muted font-sans mb-6">
                        Добавьте товары, чтобы оформить заказ
                      </p>
                      <button
                        onClick={handleClose}
                        className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all"
                      >
                        К покупкам
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 bg-white/50 rounded-xl p-4 border border-foreground/5"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-grow min-w-0">
                            <h4 className="font-serif text-base text-foreground mb-1 truncate">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted font-sans mb-2">
                              {item.price.toLocaleString("ru-RU")} ₽ за шт.
                            </p>

                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 bg-background rounded-full border border-foreground/10">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-foreground hover:text-accent transition-colors"
                                >
                                  −
                                </button>
                                <span className="text-sm font-sans min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-foreground hover:text-accent transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-muted hover:text-red-500 transition-colors"
                                aria-label="Удалить"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>

                            <p className="text-base font-serif text-accent font-medium">
                              {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === "checkout" && (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-sans text-foreground mb-2">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: formatPhone(e.target.value) })
                      }
                      placeholder="+7 (___) ___-__-__"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-white/50 border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
                        errors.phone ? "border-red-500" : "border-foreground/10"
                      }`}
                    />
                    {errors.phone ? (
                      <p className="text-xs text-red-500 mt-1 font-sans">
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="text-xs text-muted mt-1 font-sans">
                        Формат: +7 (900) 123-45-67
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-sans text-foreground mb-2">
                      Telegram <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.telegram}
                      onChange={(e) =>
                        setFormData({ ...formData, telegram: e.target.value })
                      }
                      placeholder="@username"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-white/50 border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans disabled:opacity-50 ${
                        errors.telegram ? "border-red-500" : "border-foreground/10"
                      }`}
                    />
                    {errors.telegram && (
                      <p className="text-xs text-red-500 mt-1 font-sans">
                        {errors.telegram}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-sans text-foreground mb-2">
                      Способ доставки <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "pochta", label: "Почта России", price: 350 },
                        { id: "cdek", label: "СДЭК", price: 500 },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.delivery === option.id
                              ? "border-accent bg-accent/5"
                              : "border-foreground/10 hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="delivery"
                              value={option.id}
                              checked={formData.delivery === option.id}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  delivery: e.target.value,
                                })
                              }
                              disabled={isSubmitting}
                              className="w-4 h-4 accent-accent"
                            />
                            <span className="text-sm font-sans text-foreground">
                              {option.label}
                            </span>
                          </div>
                          <span className="text-sm text-accent font-sans">
                            {option.price} ₽
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.delivery && (
                      <p className="text-xs text-red-500 mt-1 font-sans">
                        {errors.delivery}
                      </p>
                    )}
                  </div>

                  {formData.delivery && (
                    <div>
                      <label className="block text-sm font-sans text-foreground mb-2">
                        Адрес доставки <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Город, улица, дом, квартира"
                        rows={3}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 bg-white/50 border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans resize-none disabled:opacity-50 ${
                          errors.address ? "border-red-500" : "border-foreground/10"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1 font-sans">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-sans text-foreground mb-2">
                      Комментарий к заказу
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      placeholder="Необязательно"
                      rows={2}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-sans resize-none disabled:opacity-50"
                    />
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">
                    Заказ оформлен!
                  </h3>
                  <p className="text-sm text-muted font-sans">
                    Мы свяжемся с вами в Telegram в ближайшее время
                  </p>
                </div>
              )}
            </div>

            {step === "cart" && items.length > 0 && (
              <div className="p-6 border-t border-foreground/10 bg-background">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted font-sans">Итого:</span>
                  <span className="text-2xl font-serif text-foreground">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full px-8 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
                >
                  Оформить заказ
                </button>
              </div>
            )}

            {step === "checkout" && (
              <div className="p-6 border-t border-foreground/10 bg-background">
                <div className="space-y-2 mb-4 text-sm font-sans">
                  <div className="flex justify-between text-muted">
                    <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                    <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  {deliveryPrice > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>Доставка</span>
                      <span>{deliveryPrice} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-serif text-foreground pt-2 border-t border-foreground/10">
                    <span>К оплате:</span>
                    <span>{(totalPrice + deliveryPrice).toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep("cart")}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 border border-foreground/20 text-foreground rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-foreground/5 transition-all disabled:opacity-50"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-4 bg-accent text-white rounded-xl font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "Отправка..." : "Заказать"}
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}