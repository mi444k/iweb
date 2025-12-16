"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import { Header } from "./Header";
import { i18n } from "@/lib/i18n";

export function HeaderWrapper() {
  const { lang, setLang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    brand: i18n[lang].brand,
    nav: i18n[lang].nav,
    cta: i18n[lang].cta,
  };

  return <Header lang={lang} setLang={setLang} translations={translations} />;
}
