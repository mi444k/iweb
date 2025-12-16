"use client";

import { Lang } from "@/types";

interface LangSwitchProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function LangSwitch({ lang, setLang }: LangSwitchProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl ring-soft border border-white/20 overflow-hidden text-black">
      <button
        aria-label="Deutsch"
        onClick={() => setLang("de")}
        className={`px-3 py-2 text-xs cursor-pointer ${
          lang === "de" ? "bg-(--accent)" : "hover:bg-(--accent-2) text-white"
        }`}
      >
        DE
      </button>
      <button
        aria-label="English"
        onClick={() => setLang("en")}
        className={`px-3 py-2 text-xs cursor-pointer ${
          lang === "en" ? "bg-(--accent)" : "hover:bg-(--accent-2) text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
