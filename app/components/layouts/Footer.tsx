"use client";

import Image from "next/image";
import GlassSocialIcons from "../ui/GlassSocialIcons";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDaylight = theme === "daylight";

  const footerLinks = {
    navigation: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const textColorClass = isDaylight ? "text-neutral-900" : "text-white";
  const textMutedHover = isDaylight
    ? "hover:text-green-600"
    : "hover:text-green-500";

  return (
    <footer
      className={`relative border-t transition-colors duration-500 ${isDaylight
          ? "bg-white/90 border-black/5"
          : "bg-black/90 border-white/10"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Image
                src={isDaylight ? "/logo.svg" : "/logo-white.svg"}
                alt="Logo"
                width={50}
                height={50}
              />
              <div className="text-left">
                <h2
                  className={`font-bold text-xl tracking-tight transition-colors duration-300 ${textColorClass}`}
                >
                  LIAM CHRISTIAN
                </h2>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-8">
            {footerLinks.navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors text-sm font-medium uppercase tracking-wider ${textColorClass} ${textMutedHover}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center">
            <GlassSocialIcons />
          </div>

          <p
            className={`text-sm leading-relaxed space-y-1 transition-colors duration-300 ${isDaylight ? "text-neutral-600" : "text-white/60"
              }`}
          >
            The cycle continues — if you want in on it, let's connect.
          </p>

          <div
            className={`pt-8 border-t w-full transition-colors duration-300 ${isDaylight ? "border-black/10" : "border-gray-700"
              }`}
          >
            <p
              className={`text-xs transition-colors duration-300 ${isDaylight ? "text-neutral-500" : "text-gray-400"
                }`}
            >
              © {currentYear} Liam Christian B. Papasin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}