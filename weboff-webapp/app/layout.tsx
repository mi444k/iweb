import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider, HeaderWrapper, FooterWrapper, GoToTop, CookieBanner } from "@/components";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://martis.me";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ilias Martis — Software Engineer | Backend, Web, Telegram Bots",
  description:
    "Professional software engineer specializing in Python, Node.js, Go, Next.js, Docker. MVP development, Telegram bots, optimization & refactoring.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Python",
    "Node.js",
    "Go",
    "Next.js",
    "Telegram Bots",
    "MVP Development",
  ],
  authors: [{ name: "Ilias Martis" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Ilias Martis — Software Engineer",
    description:
      "Clean engineering. Clear outcomes. Backend, Telegram bots, Web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-mono bg-black`}>
        <a href="#main-content" className="skip-link">
          Пропустить к содержимому
        </a>
        <LanguageProvider>
          <HeaderWrapper />
          {children}
          <FooterWrapper />
          <GoToTop />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
