"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lang } from "@/types";
import { LangSwitch } from "../LangSwitch";
import Image from "next/image";
import { socialMedia } from "../socialMedia";

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  translations: {
    brand: string;
    cta: string;
    nav: {
      stack: string;
      work: string;
      services: string;
      testimonials: string;
    };
  };
}

const SECTION_IDS = ["stack", "work", "services", "testimonials"] as const;

type SectionId = (typeof SECTION_IDS)[number];
const INITIAL_SECTION_RATIOS = SECTION_IDS.reduce<Record<SectionId, number>>(
  (acc, id) => ({ ...acc, [id]: 0 }),
  {} as Record<SectionId, number>
);

export function Header({ lang, setLang, translations }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<SectionId>("stack");
  const intersectionRatiosRef = useRef<Record<SectionId, number>>({
    ...INITIAL_SECTION_RATIOS,
  });

  const updateActiveSection = useCallback((sectionId: SectionId) => {
    setActiveSection((prev) => (prev === sectionId ? prev : sectionId));
  }, []);

  const findClosestSection = useCallback(() => {
    let closest: SectionId | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      const { top } = element.getBoundingClientRect();
      const distance = Math.abs(top - 120); // bias slightly below header
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = sectionId;
      }
    });

    return closest;
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const thresholds = Array.from({ length: 11 }, (_, index) => index / 10);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id as SectionId;
          intersectionRatiosRef.current[sectionId] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        let bestSection: SectionId | null = null;
        let bestRatio = 0;

        SECTION_IDS.forEach((sectionId) => {
          const ratio = intersectionRatiosRef.current[sectionId];
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestSection = sectionId;
          }
        });

        if (bestSection) {
          updateActiveSection(bestSection);
        } else {
          const fallbackClosest = findClosestSection();
          if (fallbackClosest) {
            updateActiveSection(fallbackClosest);
          }
        }
      },
      {
        threshold: thresholds,
        rootMargin: "-10% 0px 30% 0px",
      }
    );

    SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    const initial = findClosestSection();
    if (initial) {
      updateActiveSection(initial);
    }

    return () => {
      observer.disconnect();
    };
  }, [findClosestSection, updateActiveSection, isHome]);

  const navItems: { id: SectionId; label: string }[] = [
    { id: "stack", label: translations.nav.stack },
    { id: "work", label: translations.nav.work },
    { id: "services", label: translations.nav.services },
    { id: "testimonials", label: translations.nav.testimonials },
  ];

  const emailLink = socialMedia.find((item) => item.name === "Email");
  const emailDisplay = emailLink?.url
    ?.replace(/^mailto:/, "")
    .replace(/\?.*$/, "");

  return (
    <header className="sticky top-0 z-40 bg-(--bg)/70 backdrop-blur text-white font-mono text-md ">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Image
            src="/images/logo.webp"
            alt={translations.brand}
            width={40}
            height={40}
          />
          <span className="text-2xl">{translations.brand}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map(({ id, label }) => (
            <Link
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              prefetch={false}
              className={`transition-colors duration-200 uppercase hover:text-(--accent) ${
                isHome && activeSection === id ? "text-(--accent)" : "text-white"
              }`}
              aria-current={isHome && activeSection === id ? "true" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          {emailLink && (
            <a
              href={emailLink.url}
              className="hidden md:inline-block text-sm text-(--muted) hover:text-(--accent) transition-colors"
            >
              {emailDisplay}
            </a>
          )}
          <Link href={isHome ? "#contact" : "/#contact"} prefetch={false}>
            <button
              className={`flex flex-row items-center justify-around gap-2 bg-(--accent) hover:bg-(--accent-2) text-black rounded-full px-6 py-1 font-mono cursor-pointer`}
            >
              {translations.cta}
            </button>
          </Link>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
}
