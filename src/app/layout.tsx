// src/app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import CartButton from "@/components/CartButton";
import Header from "@/components/Header";
import CursorGradient from "@/components/CursorGradient";

// Fraunces НЕ поддерживает кириллицу — только латиница
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

// Manrope поддерживает кириллицу
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Пространство Тишины | Ретриты и медитации на Урале",
    template: "%s | Пространство Тишины",
  },
  description:
    "Выездные медитации и энергетические практики вдали от городского шума. Найди себя в природе Свердловской области. Ретриты, йога, дыхательные практики.",
  keywords: [
    "ретриты",
    "медитация",
    "йога",
    "Екатеринбург",
    "Урал",
    "Свердловская область",
    "дыхательные практики",
    "энергетические практики",
    "digital detox",
    "природа",
    "тишина",
    "осознанность",
  ],
  authors: [{ name: "Пространство Тишины" }],
  creator: "Пространство Тишины",
  publisher: "Пространство Тишины",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: baseUrl,
    siteName: "Пространство Тишины",
    title: "Пространство Тишины | Ретриты и медитации на Урале",
    description:
      "Выездные медитации и энергетические практики вдали от городского шума. Найди себя в природе Свердловской области.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Пространство Тишины — ретриты на Урале",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Пространство Тишины | Ретриты и медитации на Урале",
    description:
      "Выездные медитации и энергетические практики вдали от городского шума.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen">
        <CursorGradient />
        <CartProvider>
          <Header />
          {children}
          <CartSidebar />
          <CartButton />
        </CartProvider>
      </body>
    </html>
  );
}