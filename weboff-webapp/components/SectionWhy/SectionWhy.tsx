"use client";

import { motion, type MotionProps, useReducedMotion } from "framer-motion";
import { Cpu, Shield, Sparkles, Wrench, Axis3D } from "lucide-react";

interface SectionWhyProps {
  translations: {
    why: {
      badge: string;
      title: string;
      desc: string;
      items: Array<{ title: string; text: string }>;
    };
    stats: {
      yoe: string;
      yoeLabel: string;
      prods: string;
      prodsLabel: string;
      uptime: string;
      uptimeLabel: string;
    };
  };
}

export default function SectionWhy({ translations }: SectionWhyProps) {
  const stats = [
    { value: translations.stats.yoe, label: translations.stats.yoeLabel },
    { value: translations.stats.prods, label: translations.stats.prodsLabel },
    { value: translations.stats.uptime, label: translations.stats.uptimeLabel },
  ];
  const prefersReducedMotion = useReducedMotion();

  const getCardMotion = (cardIndex: number): MotionProps => {
    if (prefersReducedMotion) {
      return {};
    }

    return {
      initial: { opacity: 0, y: -32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: {
        duration: 0.6,
        delay: cardIndex * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  };

  return (
    <section
      id="why"
      className="relative border-y border-(--line)/60 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-(--accent-2)/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-(--accent)/10 blur-[160px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-(--line) to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full py-1 text-xs font-mono uppercase tracking-[0.3em] text-(--accent-2) ring-soft bg-(--bg)/60">
              {translations.why.badge}
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-mono font-semibold tracking-tight">
              {translations.why.title}
            </h2>
            <p className="mt-4 text-lg text-(--muted) max-w-2xl">
              {translations.why.desc}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="rounded-2xl p-5 glass ring-soft"
                >
                  <div className="text-3xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-(--muted)">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {translations.why.items.map((item, index) => {
              const Icon = featureIcons[index] ?? Sparkles;
              return (
                <motion.article
                  {...getCardMotion(index)}
                  key={`${item.title}-${index}`}
                  className={`relative overflow-hidden rounded-3xl card p-6 ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    key={`${item.title}-${index}`}
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(17, 165, 125, 0.18), transparent)",
                    }}
                    aria-hidden
                  />
                  <div className="relative" key={`${index}-${item.title}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="size-11 rounded-2xl bg-(--bg-elev) ring-soft grid place-items-center text-(--accent-2)">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-(--muted)">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-(--muted)">{item.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const featureIcons = [Cpu, Axis3D, Wrench, Sparkles, Shield];
