"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import { i18n } from "@/lib/i18n";
import SectionHero from "./SectionHero";

export function SectionHeroWrapper() {
  const { lang, setLang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    hero: i18n[lang].hero,
  };

  return (
    <SectionHero lang={lang} setLang={setLang} translations={translations} />
  );
}
