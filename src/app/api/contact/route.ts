// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone, message, telegram, delivery, address, comment, retreatTitle } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Telegram не настроен" },
        { status: 500 }
      );
    }

    // Формируем сообщение в зависимости от типа заявки
    let text = "";

    if (type === "retreat") {
      text = `🧘‍♂️ *НОВАЯ ЗАЯВКА НА РЕТРИТ*\n\n`;
      text += `*Ретрит:* ${retreatTitle}\n`;
      text += `*Имя:* ${name}\n`;
      text += `*Телефон:* ${phone}\n`;
      if (message) text += `*Сообщение:* ${message}\n`;
    } else if (type === "order") {
      text = `🛒 *НОВЫЙ ЗАКАЗ*\n\n`;
      text += `*Телефон:* ${phone}\n`;
      text += `*Telegram:* ${telegram}\n`;
      text += `*Доставка:* ${delivery === "pochta" ? "Почта России (350₽)" : "СДЭК (500₽)"}\n`;
      text += `*Адрес:* ${address}\n`;
      if (comment) text += `*Комментарий:* ${comment}\n`;
      text += `\n*Товары:*\n`;
      body.items.forEach((item: { title: string; quantity: number; price: number }) => {
        text += `• ${item.title} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽\n`;
      });
      text += `\n*Итого:* ${body.totalPrice.toLocaleString("ru-RU")} ₽`;
    } else {
      text = `📩 *ОБРАТНАЯ СВЯЗЬ*\n\n`;
      text += `*Имя:* ${name}\n`;
      text += `*Телефон:* ${phone}\n`;
      if (message) text += `*Сообщение:* ${message}\n`;
    }

    text += `\n📅 ${new Date().toLocaleString("ru-RU")}`;

    // Отправляем в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      console.error("Telegram error:", telegramData);
      return NextResponse.json(
        { error: "Ошибка отправки в Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}