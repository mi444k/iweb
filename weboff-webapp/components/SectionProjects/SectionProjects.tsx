"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api-client";
import { Project } from "@/types";

import { SelectedProjects } from "../SelectedProjects/SelectedProjects";

interface SectionWhyProps {
  translations: {
    work: {
      title: string;
    };
    discuss: string;
  };
}

export default function SectionProjects({ translations }: SectionWhyProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <SelectedProjects
          projects={projects}
          title={translations.work.title}
          discussLink={
            <a
              href="#contact"
              className="text-sm text-(--accent-2) hover:underline"
            >
              {translations.discuss}
            </a>
          }
        />
      </div>
    </section>
  );
}
