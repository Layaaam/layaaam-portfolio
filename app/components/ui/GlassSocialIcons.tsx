import Image from "next/image";

interface SocialIcon {
  id: string;
  icon: (iconSize: number) => React.ReactNode;
  href?: string;
  label: string;
  color?: string;
}

type GlassVariant = "dark" | "light" | "neumorphic";

interface GlassSocialIconsProps {
  buttonSize?: number;
  iconSize?: number;
  logoSize?: number;
  gap?: number;
  variant?: GlassVariant;
}

const createSocialIcons = (
  logoSize: number,
  iconSize: number,
  logoSrc: string
): SocialIcon[] => [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "#",
    icon: () => (
      <Image
        src={logoSrc}
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
    color: "#1877F2",
    icon: (size: number) => (
      <svg
        className="relative z-10 drop-shadow-sm"
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
    color: "#EA4335",
    icon: (size: number) => (
      <span
        className="relative z-10 drop-shadow-sm"
        style={{
          display: "block",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "currentColor",
          WebkitMaskImage:
            "url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg)",
          maskImage:
            "url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
        aria-hidden
      />
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/liam-christian-papasin-74940b362",
    color: "#0A66C2",
    icon: (size: number) => (
      <svg
        className="relative z-10 drop-shadow-sm"
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const variantStyles: Record<
  GlassVariant,
  {
    button: string;
    overlayTop: string;
    overlayBottom: string;
    iconColor: string;
    logoSrc: string;
    useBrandColor: boolean;
  }
> = {
  dark: {
    button:
      "bg-white/[0.01] border border-white/30 hover:bg-white/[0.15] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.2)]",
    overlayTop: "from-white/80 via-transparent to-transparent",
    overlayBottom: "from-black/20 to-transparent",
    iconColor: "text-white",
    logoSrc: "/logo-white.svg",
    useBrandColor: false,
  },
  light: {
    button: "bg-transparent border border-black/[0.08] hover:bg-black/[0.04]",
    overlayTop: "from-transparent via-transparent to-transparent",
    overlayBottom: "from-transparent to-transparent",
    iconColor: "text-[#16171a]",
    logoSrc: "/logo.svg",
    useBrandColor: false,
  },
  neumorphic: {
    // Matches the raised/pressed soft-UI system already used across the
    // daylight theme (Skills cards, Contact panel chips, etc.).
    button:
      "bg-[#eceef0] shadow-[5px_5px_10px_#babcc2,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_6px_#babcc2,-3px_-3px_6px_#ffffff]",
    overlayTop: "from-transparent via-transparent to-transparent",
    overlayBottom: "from-transparent to-transparent",
    iconColor: "text-[#16171a]",
    logoSrc: "/logo.svg",
    useBrandColor: true,
  },
};

export default function GlassSocialIcons({
  buttonSize = 48,
  iconSize = 24,
  logoSize = 40,
  gap = 16,
  variant = "dark",
}: GlassSocialIconsProps) {
  const styles = variantStyles[variant];
  const socialIcons = createSocialIcons(logoSize, iconSize, styles.logoSrc);

  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {socialIcons.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target={
            social.id === "portfolio" || social.id === "email"
              ? undefined
              : "_blank"
          }
          rel={
            social.id === "portfolio" || social.id === "email"
              ? undefined
              : "noopener noreferrer"
          }
          onClick={(e) => {
            if (social.id === "portfolio") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else if (social.id === "email") {
              e.preventDefault();
              window.open(
                "https://mail.google.com/mail/?view=cm&to=papasin.liamchristian@gmail.com",
                "_blank"
              );
            }
          }}
          aria-label={social.label}
          className={`group relative rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 ${
            variant === "neumorphic" ? "" : "backdrop-blur-[4px]"
          } ${styles.iconColor} ${styles.button}`}
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            color:
              styles.useBrandColor && social.color ? social.color : undefined,
          }}
        >
          {variant !== "neumorphic" && (
            <>
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${styles.overlayTop} opacity-20`}
                style={{ transform: "rotate(-45deg)" }}
              />
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-t ${styles.overlayBottom} opacity-20`}
              />
            </>
          )}
          {social.icon(iconSize)}
        </a>
      ))}
    </div>
  );
}