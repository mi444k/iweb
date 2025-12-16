import React from "react";
import Image from "next/image";

interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-xs ring-soft bg-(--bg-elev)">
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
      {label}
    </span>
  );
}

interface TechStatProps {
  kpi: string;
  label: string;
}

export function TechStat({ kpi, label }: TechStatProps) {
  return (
    <div className="rounded-2xl p-4 bg-(--bg-elev) ring-soft">
      <div className="text-2xl font-semibold text-(--brand-3)">{kpi}</div>
      <div className="text-sm text-(--muted)">{label}</div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export function Feature({ icon, title, text }: FeatureProps) {
  return (
    <div className="rounded-3xl card p-6">
      <div className="size-9 rounded-xl bg-(--brand)/20 grid place-items-center ring-soft">
        {icon}
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-2 text-sm text-(--muted)">{text}</p>
    </div>
  );
}

interface StackCardProps {
  title: string;
  items: string[];
  note?: string;
}

export function StackCard({ title, items, note }: StackCardProps) {
  return (
    <div className="rounded-3xl card p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-(--muted)">{note}</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="text-xs text-(--muted) rounded-xl px-2.5 py-1 ring-soft bg-(--bg-elev)"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  skills: { id: number; name: string }[];
  media: {
    attributes: { url: string; formats?: { small?: { url: string } } };
  }[];
}

export function ProjectCard({
  title,
  description,
  skills,
  media,
}: ProjectCardProps) {
  const imageUrl =
    media?.[0]?.attributes?.formats?.small?.url || media?.[0]?.attributes?.url;
  const placeholderBg = "bg-(--bg-elev)/60";
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  return (
    <div className="rounded-3xl overflow-hidden card w-full h-full flex flex-col">
      <div className={`aspect-video ${imageUrl ? "relative" : placeholderBg}`}>
        {imageUrl && (
          <Image
            src={`${strapiUrl}${imageUrl}`}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="space-y-2">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-(--muted) line-clamp-3">{description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="text-xs text-(--muted) rounded-xl px-2.5 py-1 ring-soft bg-(--bg-elev)"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  points: string[];
}

export function ServiceCard({ title, points }: ServiceCardProps) {
  return (
    <div className="rounded-3xl p-6 glass">
      <h3 className="font-medium">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-(--muted)">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 size-1.5 rounded-full bg-(--brand-3)"></span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

type BaseFieldProps = {
  label: string;
};

type InputFieldProps = BaseFieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    textarea?: false;
  };

type TextareaFieldProps = BaseFieldProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textarea: true;
  };

type FieldProps = InputFieldProps | TextareaFieldProps;

export function Field({
  label,
  textarea,
  className,
  ...rest
}: FieldProps) {
  const baseClasses =
    "rounded-2xl ring-soft px-4 py-3 placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--brand-2)";

  return (
    <label className="grid gap-1">
      <span className="text-xs text-(--muted)">{label}</span>
      {textarea ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`min-h-28 ${baseClasses} ${className || ""}`.trim()}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`${baseClasses} ${className || ""}`.trim()}
        />
      )}
    </label>
  );
}
