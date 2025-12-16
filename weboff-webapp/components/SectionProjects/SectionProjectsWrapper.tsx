"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import { i18n } from "@/lib/i18n";
import SectionProjects from "./SectionProjects";

export function SectionProjectsWrapper() {
  const { lang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    work: i18n[lang].work,
    discuss: i18n[lang].discuss,
  };

  return <SectionProjects translations={translations} />;
}
