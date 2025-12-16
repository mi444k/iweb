"use client";

import { useLanguage } from "@/components";
import { SectionHeroWrapper } from "@/components/SectionHero/SectionHeroWrapper";
import { SectionWhyWrapper } from "@/components/SectionWhy/SectionWhyWrapper";
import { SectionContactWrapper } from "@/components/SectionContact/SectionContactWrapper";
import { SectionProjectsWrapper } from "@/components/SectionProjects/SectionProjectsWrapper";

export default function HomeClient() {
  const { mounted } = useLanguage();
  if (!mounted) {
    return null;
  }

  return (
    <main id="main-content" className="min-h-screen text-(--text] bg-[--bg)">
      <SectionHeroWrapper />
      <SectionWhyWrapper />

      {/* STACK */}
      {/* <section
        id="stack"
        className="relative bg-(--bg-soft] border-y border-[--line)/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t.stack.title}
            </h2>
            <span className="text-sm text-(--muted)">{t.stack.note}</span>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StackCard {...t.stack.tiles.backend} />
            <StackCard {...t.stack.tiles.web} />
            <StackCard {...t.stack.tiles.tg} />
            <StackCard {...t.stack.tiles.data} />
            <StackCard {...t.stack.tiles.devops} />
            <StackCard {...t.stack.tiles.qa} />
          </div>
        </div>
      </section> */}

      <SectionProjectsWrapper />

      {/* SERVICES */}
      {/* <section
        id="services"
        className="relative bg-(--bg-soft] border-y border-[--line)/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <h2 className="text-2xl md:rounded-3xl font-semibold tracking-tight">
            {t.services.title}
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {t.services.cards.map((c, i) => (
              <ServiceCard
                key={i}
                title={c.title || ""}
                points={c.points || []}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* TESTIMONIALS */}
      {/* <section id="testimonials" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t.testimonials.title}
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {t.testimonials.list.map((tt, i) => (
              <div key={i} className="rounded-3xl card p-6">
                <p className="text-(--muted)">&ldquo;{tt.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-(--bg-elev) ring-soft" />
                  <div>
                    <p className="text-sm font-medium">{tt.author}</p>
                    <p className="text-xs text-(--muted)">{tt.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <SectionContactWrapper />
    </main>
  );
}
