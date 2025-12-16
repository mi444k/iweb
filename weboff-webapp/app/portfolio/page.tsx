import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio | Ilias Martis — Software Engineer",
  description: "Detailed portfolio of projects: Backend, Telegram bots, Web applications, and more.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Ilias Martis — Software Engineer",
    description: "Detailed portfolio of projects: Backend, Telegram bots, Web applications, and more.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Ilias Martis — Software Engineer",
    description: "Detailed portfolio of projects: Backend, Telegram bots, Web applications, and more.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen text-[var(--text)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Portfolio</h1>
        <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl">
          Detailed case studies and project descriptions coming soon...
        </p>
        
        <div className="mt-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[var(--brand-3)] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
