// src/components/RetreatCard.tsx
import { Retreat } from "@/data/retreats";
import Link from "next/link";

type RetreatCardProps = {
  retreat: Retreat;
};

export default function RetreatCard({ retreat }: RetreatCardProps) {
  return (
    <article className="group bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
      {/* Ссылка на страницу ретрита (всё изображение и заголовок) */}
      <Link href={`/retreats/${retreat.slug}`} className="block">
        <div className="aspect-[4/3] bg-secondary/30 relative overflow-hidden">
          <img
            src={retreat.image}
            alt={retreat.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent z-10 pointer-events-none" />
          
          {retreat.spotsLeft <= 8 && (
            <div className="absolute top-4 right-4 z-20 bg-accent text-white px-3 py-1 rounded-full text-xs font-sans">
              Осталось {retreat.spotsLeft} мест
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {retreat.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-sans uppercase tracking-wider text-muted bg-secondary/50 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">
            {retreat.title}
          </h3>
          
          <p className="text-muted text-sm font-sans mb-4">
            {retreat.subtitle}
          </p>

          <p className="text-foreground/80 text-sm leading-relaxed mb-6 line-clamp-3">
            {retreat.description}
          </p>

          <div className="space-y-2 mb-6 text-sm font-sans">
            <div className="flex items-center gap-2 text-muted">
              <span>📍</span>
              <span>{retreat.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span>📅</span>
              <span>{retreat.dates}</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span>⏱</span>
              <span>{retreat.duration}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Кнопка "Записаться" (отдельно, не в ссылке) */}
      <div className="px-6 pb-6 flex items-center justify-between pt-4 border-t border-foreground/10">
        <div>
          <p className="text-xs text-muted font-sans">Стоимость</p>
          <p className="text-2xl font-serif text-foreground">
            {retreat.price.toLocaleString("ru-RU")} ₽
          </p>
        </div>
        
        <Link
          href={`/retreats/${retreat.slug}`}
          className="px-6 py-3 bg-accent text-white rounded-full font-sans text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-accent/30"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}