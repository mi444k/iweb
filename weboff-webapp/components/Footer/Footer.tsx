"use client";

import { Globe2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Translation } from "@/types";
import { socialMedia } from "../socialMedia";

interface FooterProps {
  translations: {
    footer: Translation["footer"];
    nav: Translation["nav"];
  };
}

const SECTION_IDS = ["stack", "work", "services", "testimonials", "contact"] as const;

export default function Footer({ translations }: FooterProps) {
  const year = useMemo(() => new Date().getFullYear(), []);

  const navItems = SECTION_IDS.map((id) => ({
    id,
    label: translations.nav[id],
  }));

  const isExternalLink = (href: string) => href.startsWith("http");
  const isMailLink = (href: string) => href.startsWith("mailto:");
  const linkBaseClass = "text-sm text-(--muted) hover:text-(--accent) transition-colors duration-200";

  const renderLegalLink = (href: string, label: string) =>
    isExternalLink(href) ? (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBaseClass}
      >
        {label}
      </a>
    ) : (
      <Link key={href} href={href} className={linkBaseClass}>
        {label}
      </Link>
    );

  const renderContactValue = (href: string, value: string) =>
    isExternalLink(href) || isMailLink(href) ? (
      <a
        href={href}
        target={isExternalLink(href) ? "_blank" : undefined}
        rel={isExternalLink(href) ? "noopener noreferrer" : undefined}
        className="text-base text-white hover:text-(--accent) transition-colors duration-200"
      >
        {value}
      </a>
    ) : (
      <Link href={href} className="text-base text-white hover:text-(--accent) transition-colors duration-200">
        {value}
      </Link>
    );

  return (
    <footer className="border-t border-(--line)/60 bg-(--bg)">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Globe2 className="size-5 text-(--accent)" />
              <span className="font-semibold">{translations.footer.loc}</span>
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              {translations.footer.contactTitle}
            </h3>
            <ul className="space-y-3">
              {socialMedia.map(({ name, url }) => {
                const displayValue = url.startsWith("mailto:")
                  ? url.replace(/^mailto:/, "").replace(/\?.*$/, "")
                  : url.replace(/https?:\/\//, "");

                return (
                  <li key={name} className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-(--muted)/80">
                      {name}
                    </span>
                    {renderContactValue(url, displayValue)}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              {translations.footer.menuTitle}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="text-base text-white hover:text-(--accent) transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              {translations.footer.legalTitle}
            </h3>
            <p className="text-sm text-(--muted)">{translations.footer.rights(year)}</p>
            <div className="flex flex-col gap-2">
              {translations.footer.legalLinks.map((link) => renderLegalLink(link.href, link.label))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
