import React, { useState, useEffect } from "react";
import { Code, Database, Layout, Smartphone } from "lucide-react";

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

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout className="w-6 h-6" />,
    skills: [
      { name: "React & Next.js", level: 85 },
      { name: "Vue.js", level: 75 },
      { name: "HTML/CSS", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "Laravel/PHP", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6" />,
    skills: [
      { name: "Flutter", level: 80 },
      { name: "Dart", level: 80 },
      { name: "React Native", level: 65 },
      { name: "Android (Java)", level: 70 },
    ],
  },
  {
    title: "Programming Languages",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "JavaScript/TypeScript", level: 85 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "PHP", level: 80 },
      { name: "Dart", level: 80 },
    ],
  },
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 bg-gradient-to-b from-black/60 to-black/80"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-white text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
            Skills & Expertise
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Proficient in modern technologies and frameworks
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-to-r from-green-400 to-green-500 text-black shadow-lg shadow-green-500/50 scale-105"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:border-green-400/30"
                }`}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          <div
            className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold text-lg">{skill.name}</h3>
                  <span className="text-green-400 font-bold text-sm px-3 py-1 bg-green-400/10 rounded-full">
                    {skill.level}%
                  </span>
                </div>
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-white/10 p-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-white text-2xl font-bold mb-6 text-center">
              Technologies & Tools
            </h3>
            <div className="flex gap-6 overflow-hidden">
              <div className="flex gap-6 animate-marquee">
                {technologies.map((tech, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 group flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    <div
                      className="w-8 h-8 flex-shrink-0"
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
                    <span className="text-white font-semibold whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 animate-marquee" aria-hidden="true">
                {technologies.map((tech, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 group flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    <div
                      className="w-8 h-8 flex-shrink-0"
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
                    <span className="text-white font-semibold whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
