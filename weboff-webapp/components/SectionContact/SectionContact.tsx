import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { Field } from "../UIComponents";
import { RichText } from "../RichText";
import { socialMedia } from "../socialMedia";

interface SectionContactProps {
  translations: {
    cta: string;
    contact: {
      title: string;
      desc: string;
      form: {
        name: string;
        email: string;
        task: string;
        placeholders: {
          name: string;
          email: string;
          task: string;
        };
        submit: string;
        success: string;
        error: string;
      };
      labels: {
        email: string;
        gh: string;
        li: string;
      };
    };
  };
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function SectionContact({ translations }: SectionContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "Request failed");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Failed to send contact request:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : null,
      );
    }
  };

  const { contact } = translations;

  return (
    <section id="contact" className="relative bg-(--bg-elev)">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {contact.title}
            </h2>
            <p className="mt-3 text-(--muted) max-w-xl">
              <RichText text={contact.desc} />
            </p>
            <ul className="mt-6 space-y-2 text-sm text-(--muted)">
              {socialMedia.map(({ name, url }) => {
                const Icon =
                  name === "Email"
                    ? Mail
                    : name === "GitHub"
                      ? Github
                      : name === "LinkedIn"
                        ? Linkedin
                        : name === "Telegram"
                          ? Send
                          : null;

                return (
                  <li key={name} className="flex items-center gap-2">
                    {Icon ? <Icon className="size-4" /> : null}
                    <a
                      href={url}
                      target={url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={url.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="hover:text-(--accent) transition-colors"
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl glass p-6 md:p-8"
          >
            <div className="grid gap-4">
              <Field
                label={contact.form.name}
                placeholder={contact.form.placeholders.name}
                name="name"
                value={form.name}
                onChange={handleChange("name")}
                required
                autoComplete="name"
              />
              <Field
                label={contact.form.email}
                placeholder={contact.form.placeholders.email}
                name="email"
                value={form.email}
                onChange={handleChange("email")}
                required
                type="email"
                autoComplete="email"
              />
              <Field
                label={contact.form.task}
                placeholder={contact.form.placeholders.task}
                name="message"
                value={form.message}
                onChange={handleChange("message")}
                textarea
                required
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex justify-center mt-2 cursor-pointer rounded-full px-5 py-3 bg-(--accent-2) hover:bg-(--accent) text-black transition items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={status === "loading"}
              >
                {status === "loading" ? "..." : contact.form.submit}
                <ArrowRight className="size-4" />
              </button>
              <div
                className="min-h-5"
                aria-live="polite"
                aria-atomic="true"
              >
                {status === "success" && (
                  <p className="text-sm text-(--accent-2)">
                    {contact.form.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400">
                    {errorMessage || contact.form.error}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
