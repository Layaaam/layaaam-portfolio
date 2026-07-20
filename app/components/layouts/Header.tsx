"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import GlassSocialIcons from "../ui/GlassSocialIcons";

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-6 lg:px-12 transition-all duration-300 font-[family-name:var(--font-inter)] ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-black/20 backdrop-blur-sm border-b-2 border-white/20"
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            className={`transition-transform duration-300 ${
              scrolled ? "scale-90" : "scale-100"
            }`}
          >
            <Image src="/logo-white.svg" alt="Logo" width={50} height={50} />
          </div>
          <span className="text-xs font-bold tracking-wider text-white hidden sm:block">
            LIAM CHRISTIAN
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-xs font-semibold tracking-wider text-white hover:text-green-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* TODO: add animation and new daylight layout here for the portfolio. Currently the vibes sit well with dark mode. Do one for light or daylight mode */}
        <div className="hidden md:flex items-center gap-3"> 
          <Button
            variant="primary"
            icon={<SunIcon />}
            iconPosition="left"
            size="sm"
            // onClick={}
          >
            DAYLIGHT
          </Button>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className="relative h-full flex flex-col justify-center items-center p-8 space-y-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-bold text-white hover:text-green-400 transition-all transform hover:scale-110"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </button>
          ))}

          {/* TODO: Resume button is fully functional. Daylight Button is still on the design phase and no development implementaion yet.
                    Soonest
           */}
          {/* <div className="flex flex-col gap-4 pt-8 w-full max-w-xs">
            <Button
              variant="secondary"
              onClick={resumeClick}
              className="w-full justify-center"
            >
              RESUME
            </Button>
            <Button
              variant="primary"
              icon={<SunIcon />}
              iconPosition="left"
              className="w-full justify-center"
            >
              DAYLIGHT
            </Button>
          </div> */}

          <div className="flex gap-4 pt-8">
            <GlassSocialIcons/>
          </div>
        </div>
      </div>
    </>
  );
}
