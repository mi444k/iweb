"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import { i18n } from "@/lib/i18n";
import SectionWhy from "./SectionWhy";

export function SectionWhyWrapper() {
  const { lang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    why: i18n[lang].why,
    stats: i18n[lang].hero.stats,
  };

  return <SectionWhy translations={translations} />;
}
