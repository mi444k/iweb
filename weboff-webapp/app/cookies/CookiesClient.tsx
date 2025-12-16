"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const content = {
  de: {
    heading: "Cookie-Richtlinie",
    badge: "Legal",
    sections: [
      {
        title: "Zweck",
        body:
          "Diese Seite informiert darüber, welche Speichertechnologien wir einsetzen und wofür. Wir setzen keine Werbe- oder Tracking-Cookies ein.",
      },
      {
        title: "Welche Speicher nutzen wir?",
        body:
          "Wir verwenden lediglich den lokalen Speicher Ihres Browsers (localStorage), um notwendige Einstellungen zu sichern. Es werden keine Drittanbieter-Cookies oder Tracking-Pixel geladen.",
      },
      {
        title: "Notwendige Einträge",
        body:
          "Im localStorage werden folgende Schlüssel gespeichert: \n- \"cookie-consent\": Merkt sich, ob Sie den Cookie-Hinweis akzeptiert oder abgelehnt haben.\n- \"lang\": Merkt sich Ihre gewählte Sprache.\nDiese Einträge sind technisch erforderlich, um Ihre Auswahl beizubehalten und die Website in der gewählten Sprache anzuzeigen.",
      },
      {
        title: "Keine Analyse-Tools",
        body:
          "Es werden keine Analyse-, Tracking- oder Marketing-Dienste (z. B. Google Analytics, Pixel) eingebunden.",
      },
      {
        title: "Aufbewahrungsdauer",
        body:
          "Die Einträge im localStorage bleiben bestehen, bis Sie sie in Ihrem Browser manuell löschen oder den lokalen Speicher leeren. Nach dem Löschen erscheint der Cookie-Hinweis erneut, sodass Sie eine neue Auswahl treffen können.",
      },
      {
        title: "Kontakt",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Deutschland", "info@martis.me"],
      },
    ],
  },
  en: {
    heading: "Cookie Policy",
    badge: "Legal",
    sections: [
      {
        title: "Purpose",
        body:
          "This page explains which storage technologies we use and why. We do not use advertising or tracking cookies.",
      },
      {
        title: "What storage do we use?",
        body:
          "We only use your browser's localStorage to remember required settings. No third-party cookies or tracking pixels are loaded.",
      },
      {
        title: "Necessary entries",
        body:
          "The following keys are stored in localStorage: \n- \"cookie-consent\": Remembers whether you accepted or rejected the cookie notice.\n- \"lang\": Remembers your selected language.\nThese entries are technically necessary to keep your choice and serve the site in your chosen language.",
      },
      {
        title: "No analytics",
        body:
          "No analytics, tracking, or marketing services (e.g., Google Analytics, pixels) are used.",
      },
      {
        title: "Retention",
        body:
          "The localStorage entries remain until you delete them in your browser or clear local storage. After deletion, the cookie notice will reappear so you can choose again.",
      },
      {
        title: "Contact",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Germany", "info@martis.me"],
      },
    ],
  },
};

export function CookiesClient() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="min-h-screen bg-(--bg) text-white px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-(--muted)">{t.badge}</p>
          <h1 className="text-3xl md:text-4xl font-bold">{t.heading}</h1>
        </header>

        <section className="space-y-6 text-(--muted)">
          {t.sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              {section.lines && (
                <div className="space-y-1">
                  {section.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              )}
              {section.body && <p className="leading-relaxed whitespace-pre-line">{section.body}</p>}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
