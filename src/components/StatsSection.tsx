// src/components/StatsSection.tsx
"use client";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-foreground/10 relative">
      {/* 8+ Лет опыта */}
      <div className="relative group text-center">
        <p 
          className="relative text-5xl md:text-6xl font-serif mb-2 font-black tracking-[-0.03em] select-none"
          style={{
            color: 'transparent',
            background: `radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              #F0C9A0 0%,
              #D4A373 40%,
              #C39262 70%,
              #8B6F47 100%
            )`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: `
              inset 1px 1px 2px rgba(0,0,0,0.2),
              -1px -1px 0 rgba(139, 111, 71, 0.3),
              1px 1px 0 rgba(240, 201, 160, 0.2)
            `,
            filter: 'drop-shadow(1px 2px 3px rgba(139, 111, 71, 0.15))'
          }}
        >
          8+
        </p>
        
        <p className="text-xs text-muted font-sans uppercase tracking-wider">Лет опыта</p>
      </div>

      {/* 50+ Участников */}
      <div className="relative group text-center">
        <p 
          className="relative text-5xl md:text-6xl font-serif mb-2 font-black tracking-[-0.03em] select-none"
          style={{
            color: 'transparent',
            background: `radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              #E5B88B 0%,
              #D4A373 40%,
              #B8860B 70%,
              #8B6F47 100%
            )`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: `
              inset 1px 1px 2px rgba(0,0,0,0.2),
              -1px -1px 0 rgba(139, 111, 71, 0.3),
              1px 1px 0 rgba(229, 184, 139, 0.2)
            `,
            filter: 'drop-shadow(1px 2px 3px rgba(139, 111, 71, 0.15))'
          }}
        >
          50+
        </p>
        
        <p className="text-xs text-muted font-sans uppercase tracking-wider">Участников</p>
      </div>

      {/* 10+ Ретритов */}
      <div className="relative group text-center">
        <p 
          className="relative text-5xl md:text-6xl font-serif mb-2 font-black tracking-[-0.03em] select-none"
          style={{
            color: 'transparent',
            background: `radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              #F5D4A9 0%,
              #C39262 40%,
              #A67B4F 70%,
              #8B6F47 100%
            )`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: `
              inset 1px 1px 2px rgba(0,0,0,0.2),
              -1px -1px 0 rgba(139, 111, 71, 0.3),
              1px 1px 0 rgba(245, 212, 169, 0.2)
            `,
            filter: 'drop-shadow(1px 2px 3px rgba(139, 111, 71, 0.15))'
          }}
        >
          10+
        </p>
        
        <p className="text-xs text-muted font-sans uppercase tracking-wider">Ретритов</p>
      </div>
    </div>
  );
}