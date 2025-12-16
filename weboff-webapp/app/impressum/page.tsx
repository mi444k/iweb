import type { Metadata } from "next";
import { ImpressumClient } from "./ImpressumClient";

export const metadata: Metadata = {
  title: "Impressum | Legal Notice | Ilias Martis",
  description: "Impressum / Legal notice with disclosures per § 5 TMG.",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return <ImpressumClient />;
}
