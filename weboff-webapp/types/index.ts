// === Language Types ===
export type Lang = "en" | "de";

// === Translation Card Types ===
export interface TranslationCard {
  title?: string;
  points?: string[];
  text?: string;
  author?: string;
  role?: string;
}

// === Stack Tile Type ===
export interface StackTile {
  title: string;
  items: string[];
  note: string;
}

// === Translation Structure ===
export interface Translation {
  brand: string;
  nav: {
    stack: string;
    work: string;
    services: string;
    testimonials: string;
    contact: string;
  };
  cta: string;
  hero: {
    title1: string;
    title2: string;
    desc: string;
    btnPortfolio: string;
    btnServices: string;
    bullets: string[];
    stats: {
      yoe: string;
      yoeLabel: string;
      prods: string;
      prodsLabel: string;
      uptime: string;
      uptimeLabel: string;
    };
    badge: string;
    followLabel?: string;
  };
  why: {
    badge: string;
    title: string;
    desc: string;
    items: Array<{ title: string; text: string }>;
  };
  stack: {
    title: string;
    note: string;
    tiles: {
      backend: StackTile;
      web: StackTile;
      tg: StackTile;
      data: StackTile;
      devops: StackTile;
      qa: StackTile;
    };
  };
  work: {
    title: string;
    discuss: string;
  };
  services: {
    title: string;
    cards: TranslationCard[];
  };
  testimonials: {
    title: string;
    list: TranslationCard[];
  };
  contact: {
    title: string;
    desc: string;
    form: {
      name: string;
      email: string;
      task: string;
      placeholders: {
        name: string;
        email: string;
        task: string;
      };
      submit: string;
      success: string;
      error: string;
    };
    labels: {
      email: string;
      gh: string;
      li: string;
    };
  };
  footer: {
    loc: string;
    rights: (y: number) => string;
    contactTitle: string;
    menuTitle: string;
    legalTitle: string;
    contacts: Array<{ label: string; value: string; href: string }>;
    legalLinks: Array<{ label: string; href: string }>;
  };
  cookie: {
    title: string;
    desc: string;
    accept: string;
    reject: string;
  };
  discuss: string;
  backToTop: string;
}

// === Strapi Media Type ===
export interface Media {
    id: number;
    attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: Record<string, unknown>; 
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: string;
        provider: string;
        provider_metadata?: Record<string, unknown>;
        createdAt: string;
        updatedAt: string;
    };
}

// === Skill Type ===
export interface Skill {
  id: number;
  name: string;
  description?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

// === Project Type (from Strapi) ===
export interface Project {
  id: number;
  title: string;
  description: string;
  link?: string;
  order_index?: number;
  is_active?: boolean;
  media: Media[];
  skills: Skill[];
}
