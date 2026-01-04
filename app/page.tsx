"use client";

import Image from "next/image";
import Header from "./components/layouts/Header";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layouts/Footer";
import HeroSection from "./components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0">
          <Image
            src="/background.png"
            alt="Background"
            fill
            className="object-cover blur-[25px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        </div>

        <Header />
        <HeroSection />
      </main>

      <About />
      <Skills />
      <Projects />
      <Contact />
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
    </>
  );
}
