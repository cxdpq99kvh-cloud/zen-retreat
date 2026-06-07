// src/app/page.tsx
"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopHomePage from "@/components/DesktopHomePage";
import MobileHomePage from "@/components/MobileHomePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { isMobile, isLoaded } = useIsMobile();

  // Показываем заглушку пока определяется устройство (избегаем мигания)
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-accent/20 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {isMobile ? <MobileHomePage /> : <DesktopHomePage />}
      <Footer />
    </>
  );
}