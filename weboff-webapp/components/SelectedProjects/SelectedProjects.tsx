// components/SelectedProjects.tsx

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Project } from "@/types"; // Types are imported from shared definitions
import { ProjectCard } from "@/components/UIComponents"; // Imported from UIComponents
import styles from "./SelectedProjects.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icon example; any icons can be used

interface SelectedProjectsProps {
  projects: Project[];
  title: string;
  discussLink: React.ReactNode;
}

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({
  projects,
  title,
  discussLink,
}) => {
  const [items, setItems] = useState<Project[]>(projects);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check whether scrolling left/right is possible
  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Determine if scrolling left is available
      setCanScrollLeft(scrollLeft > 0);
      // Determine if scrolling right is available (with 1px tolerance)
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
      setIsOverflowing(scrollWidth > clientWidth);
    }
  }, []);

  useEffect(() => {
    setItems(projects);
  }, [projects]);

  // Track scroll and resize events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check on mount
    checkScrollability();

    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    // Cleanup
    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, projects]); // Re-run if the project list changes

  // Slow continuous autoplay with loop; pauses on hover
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || items.length <= 1) return;

    let animationId: number | null = null;
    const speed = 1.2; // pixels per frame (~70px/sec at 60fps)

    const step = () => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;

      if (scrollWidth <= clientWidth + 1 || isHovered) {
        animationId = requestAnimationFrame(step);
        return;
      }

      const nextPos = scrollLeft + speed;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(el).columnGap || "0");
      const firstWidth = firstChild
        ? firstChild.getBoundingClientRect().width + gap
        : 0;

      if (firstChild && nextPos >= firstWidth) {
        // Rotate first item to the end and keep position seamless
        el.scrollLeft = nextPos - firstWidth;
        setItems((prev) => {
          if (prev.length <= 1) return prev;
          const [head, ...rest] = prev;
          return [...rest, head];
        });
      } else {
        el.scrollLeft = nextPos;
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isHovered, items.length]);

  // Scroll helper
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // Scroll by roughly one viewport width (90%) for better UX
      const scrollAmount = container.clientWidth * 0.9;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <div className={styles.controls}>
          {discussLink}
          {isOverflowing && (
            <div className={styles.arrowContainer}>
              <button
                className={styles.arrowButton}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Прокрутить влево"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={styles.arrowButton}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Прокрутить вправо"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.scrollArea} mt-8`}
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {items.map((project) => (
          <div key={project.id} className={styles.snapItem}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};
