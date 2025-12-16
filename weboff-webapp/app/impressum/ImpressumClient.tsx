"use client";

import { useLanguage } from "@/providers/LanguageProvider";

const content = {
  de: {
    heading: "Impressum",
    badge: "Legal",
    sections: [
      {
        title: "Angaben gemäß § 5 TMG",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Deutschland"],
      },
      { title: "Kontakt", lines: ["Telegram: @iliasmartis", "E-Mail: info@martis.me"] },
      { title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV", lines: ["Ilias Martis"] },
      { title: "Berufsbezeichnung", lines: ["Freiberuflicher Softwareentwickler"] },
      { title: "Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG", lines: ["74302/20850"] },
    ],
    liabilityContent:
      "Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.",
    liabilityLinks:
      "Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.",
    copyright:
      "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.",
    labels: {
      liabilityContent: "Haftung für Inhalte",
      liabilityLinks: "Haftung für Links",
      copyright: "Urheberrecht",
    },
  },
  en: {
    heading: "Impressum (Legal Notice)",
    badge: "Legal",
    sections: [
      {
        title: "Information pursuant to § 5 TMG",
        lines: ["Ilias Martis", "Achalmstraße 41", "72622 Nürtingen", "Germany"],
      },
      { title: "Contact", lines: ["Telegram: @iliasmartis", "Email: info@martis.me"] },
      { title: "Responsible for content under § 55 para. 2 RStV", lines: ["Ilias Martis"] },
      { title: "Professional title", lines: ["Freelance Software Engineer"] },
      { title: "VAT ID pursuant to § 27 a UStG", lines: ["74302/20850"] },
    ],
    liabilityContent:
      "As a service provider I am responsible for my own content on these pages in accordance with § 7 (1) TMG and general laws. According to §§ 8 to 10 TMG, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the moment knowledge of a specific infringement is obtained. Upon becoming aware of such legal violations, I will remove this content immediately.",
    liabilityLinks:
      "My offer contains links to external third-party websites whose content I have no influence over. Therefore, I cannot assume any liability for these external contents. The respective provider or operator of the sites is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking; unlawful content was not recognizable at that time. A permanent content control of the linked pages is not reasonable without concrete evidence of a violation. If I become aware of legal violations, I will remove such links immediately.",
    copyright:
      "The content and works created by the site operator on these pages are subject to German copyright law. Duplication, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are permitted only for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected and such content is marked accordingly. Should you nevertheless become aware of a copyright infringement, please inform me. Upon notification, I will remove such content immediately.",
    labels: {
      liabilityContent: "Liability for content",
      liabilityLinks: "Liability for links",
      copyright: "Copyright",
    },
  },
};

export function ImpressumClient() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="min-h-screen bg-(--bg) text-white px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-(--muted)">{t.badge}</p>
          <h1 className="text-3xl md:text-4xl font-bold">{t.heading}</h1>
        </header>

        <section className="space-y-6">
          {t.sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="space-y-1 text-(--muted)">
                {section.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6 text-(--muted)">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">{t.labels.liabilityContent}</h2>
            <p className="leading-relaxed whitespace-pre-line">{t.liabilityContent}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">{t.labels.liabilityLinks}</h2>
            <p className="leading-relaxed whitespace-pre-line">{t.liabilityLinks}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">{t.labels.copyright}</h2>
            <p className="leading-relaxed whitespace-pre-line">{t.copyright}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
