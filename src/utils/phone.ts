// src/utils/phone.ts

/**
 * Форматирует номер телефона в маску +7 (XXX) XXX-XX-XX
 * Принимает только цифры, ограничивает длину до 11 цифр
 */
export const formatPhone = (value: string): string => {
  // Убираем всё кроме цифр
  const digits = value.replace(/\D/g, "");
  
  // Если первая цифра 8, заменяем на 7
  let cleanDigits = digits;
  if (cleanDigits.startsWith("8")) {
    cleanDigits = "7" + cleanDigits.slice(1);
  }
  
  // Убираем первую 7 если есть (добавим её в формате)
  if (cleanDigits.startsWith("7")) {
    cleanDigits = cleanDigits.slice(1);
  }
  
  // Ограничиваем до 10 цифр (без +7)
  cleanDigits = cleanDigits.slice(0, 10);
  
  // Форматируем: +7 (XXX) XXX-XX-XX
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

/**
 * Проверяет валидность номера телефона (должно быть 11 цифр)
 */
export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
};