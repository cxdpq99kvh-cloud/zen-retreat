// src/components/StatsSection.tsx
"use client";

import ExplodingNumber from "./ExplodingNumber";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-foreground/10 relative">
      {/* 8+ Лет опыта */}
      <ExplodingNumber
        number="8+"
        label="Лет опыта"
        gradientColors={["#F0C9A0", "#D4A373", "#C39262", "#8B6F47"]}
      />

      {/* 50+ Участников */}
      <ExplodingNumber
        number="50+"
        label="Участников"
        gradientColors={["#E5B88B", "#D4A373", "#B8860B", "#8B6F47"]}
      />

      {/* 10+ Ретритов */}
      <ExplodingNumber
        number="10+"
        label="Ретритов"
        gradientColors={["#F5D4A9", "#C39262", "#A67B4F", "#8B6F47"]}
      />
    </div>
  );
}