"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";

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
    window.open("/resume.pdf", "_blank");
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

        <nav className="hidden md:flex items-center gap-12">
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

        <div className="hidden md:flex items-center gap-3">
          <Button variant="secondary" onClick={resumeClick}>
            RESUME
          </Button>
          <Button variant="primary" icon={<SunIcon />}>
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

          <div className="flex flex-col gap-4 pt-8 w-full max-w-xs">
            <Button
              variant="secondary"
              href="#resume"
              className="w-full justify-center"
            >
              RESUME
            </Button>
            <Button
              variant="primary"
              icon={<SunIcon />}
              className="w-full justify-center"
            >
              DAYLIGHT
            </Button>
          </div>

          <div className="flex gap-4 pt-8">
            {["github", "linkedin", "twitter", "facebook"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-green-400 hover:border-green-400 transition-all"
                aria-label={platform}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
