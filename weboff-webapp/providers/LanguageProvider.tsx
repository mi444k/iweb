"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang } from "@/types";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) {
      setLang(saved);
    } else {
      const nav = navigator.language.toLowerCase();
      setLang(nav.startsWith("de") ? "de" : "en");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lang", lang);
    }
  }, [lang, mounted]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
