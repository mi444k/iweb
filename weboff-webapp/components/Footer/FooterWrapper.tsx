"use client";

import { useLanguage } from "../../providers/LanguageProvider";
import Footer from "./Footer";
import { i18n } from "@/lib/i18n";

export function FooterWrapper() {
  const { lang, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  const translations = {
    footer: i18n[lang].footer,
    nav: i18n[lang].nav,
  };

  return <Footer translations={translations} />;
}
