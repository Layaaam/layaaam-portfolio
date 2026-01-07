import Image from "next/image";

interface SocialIcon {
  id: string;
  icon: (iconSize: number) => React.ReactNode;
  href?: string;
  label: string;
}

interface GlassSocialIconsProps {
  buttonSize?: number;
  iconSize?: number;
  logoSize?: number;
  gap?: number;
}

const createSocialIcons = (
  logoSize: number,
  iconSize: number
): SocialIcon[] => [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "#",
    icon: () => (
      <Image
        src="/logo-white.svg"
        alt="Portfolio Logo"
        width={logoSize}
        height={logoSize}
        className="relative z-10 drop-shadow-sm"
      />
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1FZWw2bhxv/",
    icon: (size: number) => (
      <svg
        className="text-white relative z-10 drop-shadow-sm"
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:papasin.liamchristian@gmail.com",
    icon: (size: number) => (
      <svg
        className="text-white relative z-10 drop-shadow-sm"
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "www.linkedin.com/in/liam-christian-74940b362",
    icon: (size: number) => (
      <svg
        className="text-white relative z-10 drop-shadow-sm"
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function GlassSocialIcons({
  buttonSize = 48,
  iconSize = 24,
  logoSize = 40,
  gap = 16,
}: GlassSocialIconsProps) {
  const socialIcons = createSocialIcons(logoSize, iconSize);

  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {socialIcons.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="group relative rounded-full backdrop-blur-[4px] bg-white/1 border border-white/30 flex items-center justify-center hover:bg-white/[0.15] transition-all duration-300 hover:scale-105 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.2)]"
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-20"
            style={{ transform: "rotate(-45deg)" }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-20" />
          {social.icon(iconSize)}
        </a>
      ))}
    </div>
  );
}
