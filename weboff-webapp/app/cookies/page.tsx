import type { Metadata } from "next";
import { CookiesClient } from "./CookiesClient";

export const metadata: Metadata = {
  title: "Cookie Policy | Ilias Martis",
  description: "Cookie policy describing storage and consent for ilias martis personal site.",
  robots: { index: false, follow: false },
  alternates: {
    languages: {
      en: "/cookies/en",
      de: "/cookies",
    },
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
