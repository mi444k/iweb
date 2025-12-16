import type { Metadata } from "next";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Ilias Martis",
  description: "Privacy policy for ilias martis personal site.",
  robots: { index: false, follow: false },
  alternates: {
    languages: {
      en: "/privacy/en",
      de: "/privacy",
    },
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
