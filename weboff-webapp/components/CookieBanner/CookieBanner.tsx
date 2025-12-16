"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { i18n } from "@/lib/i18n";

const STORAGE_KEY = "cookie-consent";

type ConsentValue = "accepted" | "rejected";

export function CookieBanner() {
  const { lang, mounted } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
    if (!saved) {
      setVisible(true);
    }
  }, [mounted]);

  const handleChoice = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible || !mounted) {
    return null;
  }

  const t = i18n[lang].cookie;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-(--bg-elev) border border-(--line)/60 shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-white">{t.title}</p>
          <p className="text-sm text-(--muted) mt-1 leading-relaxed">{t.desc}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="rounded-full px-4 py-2 text-sm border border-(--line)/60 text-white hover:text-(--accent) transition-colors"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-full px-4 py-2 text-sm bg-(--accent) hover:bg-(--accent-2) text-black transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
