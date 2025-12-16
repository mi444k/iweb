"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./TechLogosMarquee.module.css";
import { fetchTechLogos } from "@/lib/api-client";

interface TechLogosMarqueeProps {
  fallbackText: string;
  className?: string;
}

interface TechLogo {
  file: string;
  label: string;
}

const toLabel = (filename: string) =>
  filename
    .replace(/\.svg$/i, "")
    .replace(/_/g, " ")
    .trim();

export function TechLogosMarquee({ fallbackText, className }: TechLogosMarqueeProps) {
  const [logos, setLogos] = useState<TechLogo[]>([]);
  const [hasAttempted, setHasAttempted] = useState(false);
  const placeholderItems = Array.from({ length: 8 }, (_, index) => index);

  useEffect(() => {
    let mounted = true;

    fetchTechLogos()
      .then((files) => {
        if (!mounted) return;
        setLogos(
          files.map((file) => ({
            file,
            label: toLabel(file),
          }))
        );
      })
      .catch((error) => {
        console.error("Failed to load tech logos:", error);
      })
      .finally(() => {
        if (mounted) {
          setHasAttempted(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!logos.length && !hasAttempted) {
    return (
      <div className={`left-0 bottom-0 w-full bg-(--accent) text-black py-2 ${className}`}>
        <div className={`group ${styles.wrapper}`} role="presentation" aria-hidden>
          <div className={`${styles.track} ${styles.trackStatic}`}>
            {placeholderItems.map((item) => (
              <div key={`placeholder-${item}`} className={`${styles.item} ${styles.placeholderItem}`}>
                <span className={styles.placeholderBar} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!logos.length) {
    return (
      <div className="w-full text-center text-black text-2xl md:text-3xl font-extrabold">
        {fallbackText}
      </div>
    );
  }

  const duplicated = [...logos, ...logos];

  return (
    <div className={`left-0 bottom-0 w-full bg-(--accent) text-black py-2 ${className}`}>
      <div className={`group ${styles.wrapper}`} role="list" aria-label="Techs">
        <div className={styles.track}>
          {duplicated.map((logo, index) => (
            <div
              key={`${logo.file}-${index}`}
              className={styles.item}
              tabIndex={0}
              aria-label={logo.label}
              role="listitem"
            >
              <Image
                src={`/images/techs/${logo.file}`}
                alt={logo.label}
                width={120}
                height={56}
                className={styles.image}
                draggable={false}
                loading={index < logos.length ? "eager" : "lazy"}
                sizes="(min-width: 768px) 120px, 96px"
                priority={index === 0}
              />
              <span className={styles.label} aria-hidden>
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
