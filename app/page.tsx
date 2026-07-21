"use client";

import Image from "next/image";
import { useTheme } from "./context/ThemeContext";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

// dark theme 
import HeroSectionDark from "./components/sections/dark/HeroSection";
import AboutDark from "./components/sections/dark/About";
import SkillsDark from "./components/sections/dark/Skills";
import ProjectsDark from "./components/sections/dark/Projects";
import ContactDark from "./components/sections/dark/Contact";

// daylight theme
import HeroSectionDaylight from "./components/sections/daylight/HeroSection";
import AboutDaylight from "./components/sections/daylight/AboutSection";
import SkillsDaylight from "./components/sections/daylight/Skills";
// import ProjectsDaylight from "./components/sections/daylight/Projects";
// import ContactDaylight from "./components/sections/daylight/Contact";

export default function Home() {
  const { theme, mounted } = useTheme();
  if (!mounted) return null;

  const isDaylight = theme === "daylight";

  return (
    <div className="overflow-x-hidden w-full">
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0 transition-opacity duration-500">
          {isDaylight ? (
            <>
              <div className="absolute inset-0 bg-[#e7e8ea]" />
              <div className="absolute inset-0 blur-[70px] opacity-60">
                <div className="absolute w-[520px] h-[520px] -top-36 -left-28 rounded-full bg-green-300/60" />
                <div className="absolute w-[460px] h-[460px] top-1/3 -right-40 rounded-full bg-slate-300/60" />
                <div className="absolute w-[400px] h-[400px] -bottom-40 left-1/4 rounded-full bg-emerald-200/60" />
              </div>
            </>
          ) : (
            <>
              <Image
                src="/background.png"
                alt="Background"
                fill
                className="object-cover blur-[25px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
            </>
          )}
        </div>

        <Header />
        {isDaylight ? <HeroSectionDaylight /> : <HeroSectionDark />}
      </main>

      {isDaylight ? (
        <>
          <AboutDaylight />
          {/* <SkillsDaylight /> */}
          {/* <ProjectsDaylight />
          <ContactDaylight /> */}
        </>
      ) : (
        <>
          <AboutDark />
          <SkillsDark />
          <ProjectsDark />
          <ContactDark />
        </>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}