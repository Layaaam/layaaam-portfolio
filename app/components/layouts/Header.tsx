"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import GlassSocialIcons from "../ui/GlassSocialIcons";
import { useTheme } from "../../context/ThemeContext";

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="3" fill="currentColor" />
    <path
      d="M8 1V2M8 14V15M15 8H14M2 8H1M12.5 3.5L11.8 4.2M4.2 11.8L3.5 12.5M12.5 12.5L11.8 11.8M4.2 4.2L3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 8.7A5.5 5.5 0 0 1 7.3 2.5a5.5 5.5 0 1 0 6.2 6.2Z"
      fill="currentColor"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDaylight = theme === "daylight";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const resumeClick = () => {
    window.open("/Papasin_LiamChristian_Resume.pdf", "_blank");
  };

  const navLinks = [
    { label: "ABOUT", href: "about" },
    { label: "SKILLS", href: "skills" },
    { label: "PROJECTS", href: "projects" },
    { label: "CONTACT", href: "contact" },
  ];

  const textColorClass = isDaylight ? "text-neutral-900" : "text-white";
  const textMutedHover = isDaylight
    ? "hover:text-green-600"
    : "hover:text-green-400";
  const underlineColor = isDaylight ? "bg-green-600" : "bg-green-400";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 lg:px-12 transition-all duration-500 font-[family-name:var(--font-inter)] ${isDaylight
            ? "backdrop-blur-md border-b border-black/5"
            : "backdrop-blur-md border-b border-white/10"
          }`}
        style={{
          backgroundColor: isDaylight
            ? scrolled
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.55)"
            : scrolled
              ? "rgba(10,10,10,0.75)"
              : "rgba(10,10,10,0.4)",
          boxShadow: isDaylight
            ? "0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)"
            : "0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            className={`transition-transform duration-300 ${scrolled ? "scale-90" : "scale-100"
              }`}
          >
            <Image
              src={isDaylight ? "/logo.svg" : "/logo-white.svg"}
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
          <span
            className={`text-xs font-bold tracking-wider hidden sm:block transition-colors duration-300 ${textColorClass}`}
          >
            LIAM CHRISTIAN
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className={`text-xs font-semibold tracking-wider transition-colors relative group ${textColorClass} ${textMutedHover}`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${underlineColor}`}
              />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant={isDaylight ? "primary" : "light"}
            icon={isDaylight ? <MoonIcon /> : <SunIcon />}
            iconPosition="left"
            size="sm"
            onClick={toggleTheme}
          >
            {isDaylight ? "NIGHT" : "DAYLIGHT"}
          </Button>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${textColorClass} ${isDaylight ? "hover:bg-black/5" : "hover:bg-white/10"
            }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`absolute inset-0 backdrop-blur-xl ${isDaylight ? "bg-white/90" : "bg-black/90"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className="relative h-full flex flex-col justify-center items-center p-8 space-y-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className={`text-2xl font-bold transition-all transform hover:scale-110 ${textColorClass} ${textMutedHover}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </button>
          ))}

          <div className="flex flex-col gap-4 pt-8 w-full max-w-xs">
            <Button
              variant="secondary"
              onClick={resumeClick}
              className="w-full justify-center"
            >
              RESUME
            </Button>
            <Button
              variant={isDaylight ? "primary" : "light"}
              icon={isDaylight ? <MoonIcon /> : <SunIcon />}
              iconPosition="left"
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-center"
            >
              {isDaylight ? "NIGHT" : "DAYLIGHT"}
            </Button>
          </div>

          <div className="flex gap-4 pt-8">
            <GlassSocialIcons />
          </div>
        </div>
      </div>
    </>
  );
}