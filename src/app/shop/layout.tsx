// src/app/shop/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Магазин",
  description:
    "Благовония, статуэтки и авторские картины для вашей практики. Натуральные товары ручной работы, наполненные энергией уральской природы.",
  openGraph: {
    title: "Магазин | Пространство Тишины",
    description:
      "Благовония, статуэтки и авторские картины для вашей практики.",
    images: ["/images/og-image.jpg"],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}