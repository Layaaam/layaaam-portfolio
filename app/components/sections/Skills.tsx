import React, { useState, useEffect } from "react";

const techCategories = {
  "Programming Languages": [
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Java", icon: "openjdk", color: "#007396" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "PHP", icon: "php", color: "#777BB4" },
    { name: "Dart", icon: "dart", color: "#0175C2" },
    { name: "SQL", icon: "mysql", color: "#4479A1" },
  ],

  "Frameworks & Libraries": [
    { name: "Flutter", icon: "flutter", color: "#02569B" },
    { name: "Laravel", icon: "laravel", color: "#FF2D20" },
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Vue.js", icon: "vuedotjs", color: "#4FC08D" },
    { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
    { name: "Node.js", icon: "nodedotjs", color: "#339933" },
  ],

  "Databases & Backend Services": [
    { name: "MySQL", icon: "mysql", color: "#4479A1" },
    { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    { name: "SQLite", icon: "sqlite", color: "#003B57" },
    { name: "Firebase", icon: "firebase", color: "#FFCA28" },
    { name: "Supabase", icon: "supabase", color: "#3ECF8E" },
  ],

  "Tools & Development Environment": [
    { name: "Visual Studio Code", icon: "visualstudiocode", color: "#007ACC" },
    { name: "Android Studio", icon: "androidstudio", color: "#3DDC84" },
    { name: "Git", icon: "git", color: "#F05032" },
    { name: "GitHub", icon: "github", color: "#FFFFFF" },
    { name: "Figma", icon: "figma", color: "#F24E1E" },
    { name: "Adobe Photoshop", icon: "adobephotoshop", color: "#31A8FF" },
  ],
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

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
      className="relative min-h-screen py-20 bg-gradient-to-b from-black/60 to-black/80"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-white text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
            Skills & Technologies
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Tools and technologies I've learned and experienced throughout my
            journey.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {Object.entries(techCategories).map(
            ([category, techs], categoryIndex) => (
              <div
                key={category}
                className={`mb-16 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white/90">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {techs.map((tech, index) => (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300 hover:-translate-y-2"
                      style={{
                        animationDelay: `${categoryIndex * 100 + index * 50}ms`,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                          <div
                            className="w-10 h-10 transition-all duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: "white",
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
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            style={{ backgroundColor: tech.color }}
                          />
                        </div>

                        <div className="text-center">
                          <h4 className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors duration-300">
                            {tech.name}
                          </h4>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
