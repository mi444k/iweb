"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const content = {
  de: {
    heading: "Datenschutzerklärung",
    badge: "Legal",
    sections: [
      {
        title: "Verantwortlicher",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Deutschland", "info@martis.me"],
      },
      {
        title: "Server-Logfiles",
        body:
          "Beim Aufruf dieser Website werden technisch bedingt Server-Logfiles gespeichert (Browsertyp/-version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse). Diese Daten sind notwendig, um die Website auszuliefern und zur Stabilität/Sicherheit zu gewährleisten. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Logfiles werden in der Regel automatisch nach kurzer Zeit gelöscht, sofern keine Sicherheitsrelevanz besteht.",
      },
      {
        title: "Kontakt",
        body:
          "Wenn Sie per E-Mail oder Telegram Kontakt aufnehmen, werden die übermittelten Daten ausschließlich zur Bearbeitung der Anfrage verwendet und anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.",
      },
      {
        title: "Cookies",
        body:
          "Diese Website verwendet nur technisch notwendige Cookies (z. B. zur Speicherung Ihrer Cookie-Einwilligung). Es werden keine Tracking- oder Marketing-Cookies gesetzt.",
      },
      {
        title: "Externe Dienste / Analytics",
        body:
          "Es werden keine externen Analyse- oder Tracking-Dienste (z. B. Google Analytics) eingebunden. Externe Ressourcen werden nur geladen, wenn dies technisch erforderlich ist.",
      },
      {
        title: "Ihre Rechte",
        body:
          "Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie auf Datenübertragbarkeit, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.",
      },
      {
        title: "Aufbewahrung",
        body:
          "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Danach werden die Daten gelöscht oder anonymisiert.",
      },
    ],
  },
  en: {
    heading: "Privacy Policy",
    badge: "Legal",
    sections: [
      {
        title: "Controller",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Germany", "info@martis.me"],
      },
      {
        title: "Server log files",
        body:
          "When you access this website, server log files are stored for technical reasons (browser type/version, operating system, referrer URL, host name of the accessing device, time of server request, IP address). These data are required to deliver the website and to maintain stability/security. No combination with other data sources takes place. Log files are usually deleted automatically after a short period unless needed for security reasons.",
      },
      {
        title: "Contact",
        body:
          "If you contact me via email or Telegram, the data you provide is used solely to process the request and then deleted unless legal retention duties apply.",
      },
      {
        title: "Cookies",
        body:
          "This site uses only strictly necessary cookies (e.g., to store your cookie consent). No tracking or marketing cookies are set.",
      },
      {
        title: "External services / analytics",
        body:
          "No external analytics or tracking services (e.g., Google Analytics) are embedded. External resources are loaded only when technically required.",
      },
      {
        title: "Your rights",
        body:
          "You have the right to access, rectify, erase, restrict processing, object to processing, and data portability, unless legal retention obligations apply. You also have the right to lodge a complaint with the competent supervisory authority.",
      },
      {
        title: "Retention",
        body:
          "Personal data are stored only as long as necessary for the purposes stated or as required by law. Afterwards, data are deleted or anonymized.",
      },
    ],
  },
};

export function PrivacyClient() {
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
