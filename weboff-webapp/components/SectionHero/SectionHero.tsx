"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Wrench } from "lucide-react";
import { RichText } from "@/components/RichText";
import { TechLogosMarquee } from "@/components/TechLogosMarquee/TechLogosMarquee";
import { Lang } from "@/types";
import Image from "next/image";
import { socialMedia } from "../socialMedia";

interface SectionHeroProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  translations: {
    hero: {
      title1: string;
      title2: string;
      desc: string;
      btnPortfolio: string;
      btnServices: string;
      bullets: string[];
      badge: string;
      followLabel?: string;
    };
  };
}

export default function SectionHero({ translations }: SectionHeroProps) {
  const heroVideos = [
    "/video/heroAvatar_2.webm",
    "/video/heroAvatar_3.webm",
    "/video/heroAvatar_4.webm",
    "/video/heroAvatar_5.webm",
    "/video/heroAvatar_6.webm",
  ];

  const getRandomVideo = (exclude?: string) => {
    if (heroVideos.length === 0) {
      return undefined;
    }

    if (heroVideos.length === 1) {
      return heroVideos[0];
    }

    let candidate = heroVideos[Math.floor(Math.random() * heroVideos.length)];

    while (exclude && candidate === exclude) {
      candidate = heroVideos[Math.floor(Math.random() * heroVideos.length)];
    }

    return candidate;
  };

  const [currentVideo, setCurrentVideo] = useState(() => getRandomVideo());
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const followLabel = translations.hero.followLabel ?? "Follow me ->";

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const playPromise = videoRef.current.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        setIsVideoHidden(true);
      });
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    const nextVideo = getRandomVideo(currentVideo);
    if (!nextVideo || nextVideo === currentVideo) {
      const video = videoRef.current;
      if (!video) {
        return;
      }
      video.pause();
      if (Number.isFinite(video.duration)) {
        video.currentTime = video.duration;
      }
      return;
    }

    setCurrentVideo(nextVideo);
  };

  const handleVideoError = () => {
    const fallback = getRandomVideo(currentVideo);

    if (fallback && fallback !== currentVideo) {
      setCurrentVideo(fallback);
      return;
    }

    setIsVideoHidden(true);
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-end justify-end gap-4 max-[780px]:z-0 max-[640px]:-right-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative h-full aspect-square max-w-[420px] w-full"
          >
            <Image
              src="/images/heroAvatar.png"
              alt="Avatar"
              fill
              priority
              quality={100}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 60vw"
              className="absolute inset-0 h-full w-full object-contain max-[780px]:brightness-60"
            />
            {!isVideoHidden && currentVideo && (
              <video
                key={currentVideo}
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                onAbort={handleVideoError}
                onStalled={handleVideoError}
                className="absolute inset-0 h-full w-full object-contain max-[780px]:brightness-60"
                poster="/images/heroAvatar.webp"
              >
                <source src={currentVideo} type="video/webm" />
              </video>
            )}
          </motion.div>
          <div className="pointer-events-auto relative flex flex-col z-30 h-full justify-center items-center gap-4 px-4 py-8">
            <span
              className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              {followLabel}
            </span>
            <div className="h-12 w-px bg-white/30" aria-hidden />
            <ul className="flex flex-col gap-4">
              {socialMedia.map(({ name, url, icon }) => {
                if (!icon) {
                  return null;
                }

                const isExternal = !url.startsWith("mailto:");

                return (
                  <li key={name}>
                    <a
                      href={url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={name}
                      className="group flex h-16 w-16 items-center justify-center"
                    >
                      <Image
                        src={icon}
                        alt={name}
                        width={48}
                        height={48}
                        className="size-10 object-contain transition duration-200 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                      />
                      <span className="sr-only">{name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl/[1.2] font-extrabold font-mono"
            >
              <RichText text={translations.hero.title1} />
              <RichText
                text={translations.hero.title2}
                as="span"
                className="block text-(--accent-2)"
              />
            </motion.h1>
            <p className="mt-5 text-lg text-(--muted) max-w-xl">
              <RichText text={translations.hero.desc} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-2xl px-5 py-3 bg-(--brand] hover:bg-[--brand-2) transition inline-flex items-center gap-2"
              >
                {translations.hero.btnPortfolio}{" "}
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#services"
                className="rounded-2xl px-5 py-3 ring-soft hover:bg-(--bg-elev) transition inline-flex items-center gap-2"
              >
                {translations.hero.btnServices}
              </a>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-(--muted)">
              <li className="flex items-center gap-2">
                <Shield className="size-4" /> {translations.hero.bullets[0]}
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="size-4" /> {translations.hero.bullets[1]}
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="size-4" /> {translations.hero.bullets[2]}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TechLogosMarquee
        className="absolute bottom-0 left-0 w-screen z-30"
        fallbackText={translations.hero.badge}
      />
    </section>
  );
}
