import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import GlassSocialIcons from "../../ui/GlassSocialIcons";
import TextType from "../../ui/TextType";
import Button from "../../ui/Button";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Student",
    "Aspiring Software Developer",
    "Web Developer",
    "Mobile App Developer",
    "Problem-Solver",
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="relative z-10 flex min-h-screen items-center pt-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <GlassSocialIcons />

              <div>
                <p className="text-white/80 text-2xl mb-2 font-light">
                  Hello, I'm
                </p>
                <h1 className="text-white text-5xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-green-400">
                  Liam Christian
                </h1>
                <div className="h-1 w-full max-w-xl bg-gradient-to-r from-green-400 via-green-500 to-transparent rounded-full" />
              </div>

              <div className="h-8">
                <p className="text-white text-xl font-semibold">
                  <span className="text-green-400">► </span>{" "}
                  <span
                    key={currentRole}
                    className="inline-block animate-fade-in"
                  >
                    <TextType
                      as="span"
                      text={roles[currentRole]}
                      typingSpeed={100}
                      pauseDuration={3000}
                      showCursor={true}
                      cursorCharacter="|"
                    />
                  </span>
                </p>
              </div>

              <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                A software developer with hands-on experience delivering
                10+ academic and personal web and mobile projects and a
                background in student leadership. 

                </p>
              <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                I don't have everything figured out yet, but I build, I reflect, and I keep going.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Button
                  variant="primary"
                  onClick={() => scrollToSection("projects")}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  View Projects
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in Touch
                </Button>
              </div>
            </div>

            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      <div
        className={`absolute right-0 top-0 bottom-0 z-[5] hidden lg:flex items-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-400/20 to-transparent blur-3xl" />
          <Image
            src="/Liam.png"
            alt="Liam"
            width={1075}
            height={1075}
            className="object-contain h-screen w-auto relative z-10"
            priority
          />
        </div>
      </div>
    </>
  );
}
