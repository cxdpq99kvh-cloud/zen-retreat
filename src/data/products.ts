// src/data/products.ts

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: "incense" | "statues" | "art";
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  images: string[];
  inStock: boolean;
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
};

export const products: Product[] = [
  {
    id: "incense-sandalwood",
    slug: "sandalwood-incense",
    title: "Сандаловое дерево",
    category: "incense",
    description: "Натуральные благовония ручной работы.",
    fullDescription: "Глубокий древесный аромат сандалового дерева, созданный вручную из натуральных ингредиентов. Эти благовония идеально подходят для медитаций, очистки пространства и создания атмосферы спокойствия. Сандал известен своими успокаивающими свойствами и используется в духовных практиках уже тысячи лет.",
    price: 650,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg"],
    inStock: true,
    specifications: [
      { label: "Количество в упаковке", value: "20 палочек" },
      { label: "Время горения", value: "30-40 минут" },
      { label: "Состав", value: "Натуральный сандал, бамбуковая основа" },
      { label: "Страна производства", value: "Индия" },
    ],
    features: [
      "100% натуральные ингредиенты",
      "Ручная работа",
      "Без синтетических ароматизаторов",
      "Подходит для ежедневного использования",
      "Экологичная упаковка",
    ],
  },
  {
    id: "incense-lotus",
    slug: "lotus-incense",
    title: "Лотос",
    category: "incense",
    description: "Нежный цветочный аромат.",
    fullDescription: "Нежный и возвышенный аромат лотоса, способствующий расслаблению и раскрытию сердечной чакры. Лотос — символ чистоты и духовного пробуждения в восточных традициях. Эти благовония помогут создать атмосферу для глубокой медитации и внутреннего покоя.",
    price: 580,
    image: "/images/product2.jpg",
    images: ["/images/product2.jpg"],
    inStock: true,
    specifications: [
      { label: "Количество в упаковке", value: "20 палочек" },
      { label: "Время горения", value: "30-40 минут" },
      { label: "Состав", value: "Экстракт лотоса, натуральные масла" },
      { label: "Страна производства", value: "Индия" },
    ],
    features: [
      "Натуральный экстракт лотоса",
      "Способствует раскрытию сердечной чакры",
      "Идеально для медитации",
      "Мягкий, ненавязчивый аромат",
      "Ручная работа",
    ],
  },
  {
    id: "statue-buddha",
    slug: "buddha-statue",
    title: "Будда Шакьямуни",
    category: "statues",
    description: "Бронзовая статуэтка ручной работы.",
    fullDescription: "Изысканная бронзовая статуэтка Будды Шакьямуни, выполненная вручную мастерами из Непала. Эта статуэтка — символ просветления, внутренней гармонии и мудрости. Идеально подходит для домашнего алтаря или как центральный элемент медитативного пространства.",
    price: 4500,
    image: "/images/product3.jpg",
    images: ["/images/product3.jpg"],
    inStock: true,
    specifications: [
      { label: "Высота", value: "15 см" },
      { label: "Материал", value: "Бронза" },
      { label: "Вес", value: "450 г" },
      { label: "Страна производства", value: "Непал" },
    ],
    features: [
      "Ручная работа непальских мастеров",
      "Натуральная бронза",
      "Детализированная проработка",
      "Подходит для алтаря",
      "Уникальный экземпляр",
    ],
  },
  {
    id: "art-mandala-gold",
    slug: "mandala-gold",
    title: "Мандала «Золотое солнце»",
    category: "art",
    description: "Авторская работа акрилом на холсте.",
    fullDescription: "Авторская работа, созданная с использованием техники сакральной геометрии. Мандала «Золотое солнце» наполняет пространство энергией света, тепла и изобилия. Золотые и охристые тона создают атмосферу радости и внутренней силы. Картина написана акрилом на качественном холсте.",
    price: 12500,
    image: "/images/product4.jpg",
    images: ["/images/product4.jpg"],
    inStock: true,
    specifications: [
      { label: "Размер", value: "50×50 см" },
      { label: "Техника", value: "Акрил на холсте" },
      { label: "Оформление", value: "Подрамник" },
      { label: "Автор", value: "Анна Светлова" },
    ],
    features: [
      "Авторская работа",
      "Сакральная геометрия",
      "Качественный холст на подрамнике",
      "Готова к подвешиванию",
      "Сертификат подлинности",
    ],
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  incense: "Благовония",
  statues: "Статуэтки",
  art: "Картины",
};