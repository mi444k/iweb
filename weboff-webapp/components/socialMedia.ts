export interface SocialLink {
  name: string;
  title: string;
  url: string;
  icon: string;
}

export const socialMedia: SocialLink[] = [
    {
      name: "Telegram",
      title: "Telegram",
      url: "https://t.me/iliasmartis",
      icon: "/images/social-icons/SVG/Color/Telegram.svg",
    },
    {
      name: "GitHub",
      title: "GitHub",
      url: "https://github.com/mi444k",
      icon: "/images/social-icons/SVG/Color/Github.svg",
    },
    {
      name: "LinkedIn",
      title: "LinkedIn",
      url: "https://linkedin.com/in/iliasmartis",
      icon: "/images/social-icons/SVG/Color/Linkedin.svg",
    },
    {
      name: "Email",
      title: "ilias@martis.me",
      url: "mailto:ilias@martis.me?subject=Contact%20from%20Website",
      icon: "/images/social-icons/SVG/Color/Mail_ru.svg",
    },
  ];