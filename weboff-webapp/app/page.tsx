import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Ilias Martis — Software Engineer | Backend, Web, Telegram Bots",
  description:
    "Professional software engineer specializing in Python, Node.js, Go, Next.js, Docker. MVP development, Telegram bots, optimization & refactoring.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ilias Martis — Software Engineer",
    description: "Clean engineering. Clear outcomes. Backend, Telegram bots, Web.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilias Martis — Software Engineer",
    description: "Backend, Telegram bots, Web. Clean engineering. Clear outcomes.",
  },
};

export default function Home() {
  return <HomeClient />;
}
