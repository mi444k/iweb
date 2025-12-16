"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import { i18n } from "@/lib/i18n";
import SectionContact from "./SectionContact";

export function SectionContactWrapper() {
  const { lang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    contact: i18n[lang].contact,
    cta: i18n[lang].cta,
  };

  return <SectionContact translations={translations} />;
}
