import React, { useState, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

const technologies = [
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "Java", icon: "openjdk", color: "#007396" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
  { name: "PHP", icon: "php", color: "#777BB4" },
  { name: "Dart", icon: "dart", color: "#0175C2" },

  { name: "Flutter", icon: "flutter", color: "#02569B" },
  { name: "Laravel", icon: "laravel", color: "#FF2D20" },
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "Vue.js", icon: "vuedotjs", color: "#4FC08D" },
  { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },

  { name: "MySQL", icon: "mysql", color: "#4479A1" },
  { name: "SQLite", icon: "sqlite", color: "#003B57" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  { name: "Firebase", icon: "firebase", color: "#FFCA28" },
  { name: "Supabase", icon: "supabase", color: "#3ECF8E" },

  { name: "VS Code", icon: "visualstudiocode", color: "#007ACC" },
  { name: "Android Studio", icon: "androidstudio", color: "#3DDC84" },
  { name: "Git", icon: "git", color: "#F05032" },
  { name: "GitHub", icon: "github", color: "#FFFFFF" },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-white text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-white via-green-100 to-green-400">
              About Me
            </span>
          </h2>

          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative flex justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
            <div className="relative">
              <div className="relative w-100 h-100 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-1 shadow-2xl shadow-green-500/50 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-end justify-center border-4 border-white/10">
                  <Image
                    src="/Liam_AboutMe.jpg"
                    alt="Liam Christian"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full blur-xl" />
            </div>
          </div>

          <div className="text-white space-y-6 mt-12 md:mt-0">
            <div className="space-y-3">
              <h3 className="text-green-400 text-lg font-semibold tracking-wide uppercase">
                GET TO KNOW ME
              </h3>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-clip-text text-white">Who is </span>
                <span className="bg-clip-text text-green-400">
                  Liam Christian
                </span>
                <span className="bg-clip-text text-white">?</span>
              </h1>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-500 to-transparent rounded-full" />
              <p className="text-white/90 leading-relaxed text-lg font-bold">
                A student and aspiring software developer with hands-on
                experience building web and mobile applications.
              </p>
              <br />
              <p className="text-white/90 leading-relaxed text-lg">
                I'm committed to learning and growing every single day, striving
                to create reliable, practical solutions that tackle real
                problems and deliver meaningful impact. I may still be on the
                journey, but I'm dedicated to getting better with every project
                and reaching my full potential.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="group">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 hover:border-green-500/40 transition-all">
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-600">
                    10+
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    Projects Completed
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 hover:border-green-500/40 transition-all">
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-600">
                    5+
                  </h3>
                  <p className="text-white/70 text-sm mt-1">Technologies</p>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 hover:border-green-500/40 transition-all">
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-600">
                    3+
                  </h3>
                  <p className="text-white/70 text-sm mt-1">Years Learning</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <Button
                variant="primary"
                href="/Papasin_LiamChristian_Resume.pdf"
                download
                icon={<Download className="w-5 h-5" />}
                iconPosition="left"
              >
                Download Resume
              </Button>

              <div className="flex items-center gap-1">
                <Image
                  src="/logo-white.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <p className="text-white font-bold text-m tracking-wide">
                  LIAM CHRISTIAN
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 overflow-hidden relative">
          <div className="flex gap-6 whitespace-nowrap">
            <div className="flex gap-6 animate-marquee">
              {technologies.map((tech, index) => (
                <div
                  key={`first-${index}`}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-2xl hover:bg-green-500/10 hover:border-green-500/40 transition-all group cursor-pointer"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: tech.color,
                      WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg)`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg)`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                    }}
                  />
                  <span className="text-white font-semibold text-lg">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-marquee" aria-hidden="true">
              {technologies.map((tech, index) => (
                <div
                  key={`second-${index}`}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-2xl hover:bg-green-500/10 hover:border-green-500/40 transition-all group cursor-pointer"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: tech.color,
                      WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg)`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg)`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                    }}
                  />
                  <span className="text-white font-semibold text-lg">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
