"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { i18n } from "@/lib/i18n";

const SCROLL_THRESHOLD = 0.1;

export function GoToTop() {
	const { lang, mounted } = useLanguage();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!mounted) {
			return;
		}

		const handleScroll = () => {
			const doc = document.documentElement;
			const scrollable = doc.scrollHeight - window.innerHeight;

			if (scrollable <= 0) {
				setVisible(false);
				return;
			}

			const ratio = (window.scrollY || doc.scrollTop) / scrollable;
			setVisible(ratio >= SCROLL_THRESHOLD);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [mounted]);

	if (!mounted) {
		return null;
	}

	const label = i18n[lang].backToTop;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					type="button"
					aria-label={label}
					title={label}
					onClick={scrollToTop}
					className="fixed bottom-16 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-(--accent-2) text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition hover:bg-[--brand-2] cursor-pointer"
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 20 }}
				>
					<ArrowUp className="size-5" />
					<span className="sr-only">{label}</span>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
