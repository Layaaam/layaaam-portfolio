"use client";

import { useEffect, useRef, useState } from "react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const filters = [
  { label: "ALL", value: "all" },
  { label: "LANGUAGES", value: "languages" },
  { label: "FRAMEWORKS", value: "frameworks" },
  { label: "DATABASES", value: "databases" },
  { label: "TOOLS", value: "tools" },
] as const;

const skills = [
  { name: "Python", cat: "languages", icon: "python", color: "#3776AB" },
  { name: "Java", cat: "languages", icon: "openjdk", color: "#007396" },
  { name: "JavaScript", cat: "languages", icon: "javascript", color: "#F7DF1E" },
  { name: "PHP", cat: "languages", icon: "php", color: "#777BB4" },
  { name: "Dart", cat: "languages", icon: "dart", color: "#0175C2" },
  { name: "SQL", cat: "languages", icon: "mysql", color: "#4479A1" },

  { name: "Flutter", cat: "frameworks", icon: "flutter", color: "#02569B" },
  { name: "Laravel", cat: "frameworks", icon: "laravel", color: "#FF2D20" },
  { name: "React", cat: "frameworks", icon: "react", color: "#61DAFB" },
  { name: "Vue.js", cat: "frameworks", icon: "vuedotjs", color: "#4FC08D" },
  { name: "Next.js", cat: "frameworks", icon: "nextdotjs", color: "#16171a" },
  { name: "Node.js", cat: "frameworks", icon: "nodedotjs", color: "#339933" },

  { name: "MySQL", cat: "databases", icon: "mysql", color: "#4479A1" },
  { name: "PostgreSQL", cat: "databases", icon: "postgresql", color: "#4169E1" },
  { name: "SQLite", cat: "databases", icon: "sqlite", color: "#003B57" },
  { name: "Firebase", cat: "databases", icon: "firebase", color: "#FFCA28" },
  { name: "Supabase", cat: "databases", icon: "supabase", color: "#3ECF8E" },

  { name: "Visual Studio Code", cat: "tools", icon: "visualstudiocode", color: "#007ACC" },
  { name: "Android Studio", cat: "tools", icon: "androidstudio", color: "#3DDC84" },
  { name: "Git", cat: "tools", icon: "git", color: "#F05032" },
  { name: "GitHub", cat: "tools", icon: "github", color: "#16171a" },
  { name: "Figma", cat: "tools", icon: "figma", color: "#F24E1E" },
  { name: "Adobe Photoshop", cat: "tools", icon: "adobephotoshop", color: "#31A8FF" },
] as const;

type SkillFilter = (typeof filters)[number]["value"];

const RAISED = "bg-[var(--surface)] shadow-[10px_10px_22px_var(--shadow-dark),-10px_-10px_22px_var(--shadow-light)]";
const RAISED_SM = "shadow-[5px_5px_10px_var(--shadow-dark),-5px_-5px_10px_var(--shadow-light)]";
const PRESSED = "bg-[var(--surface)] shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light)]";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("all");
  const { ref: headingRef, visible: headingVisible } = useReveal<HTMLDivElement>();

  const visibleSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.cat === activeFilter);

  return (
    <section
      id="skills"
      className={`relative z-[1] mx-auto max-w-[1240px] px-12 pt-[60px] pb-[140px]
        text-[var(--ink)] font-[family-name:var(--font-inter)]
        [--bg:#e7e8ea] [--surface:#eceef0] [--surface-2:#e2e4e7]
        [--shadow-dark:#babcc2] [--shadow-light:#ffffff] [--ink:#16171a]
        [--ink-muted:#6b6d74] [--ink-faint:#9a9ca3] [--accent:#6f8f76]
        [--accent-deep:#4c6650] [--accent-tint:#dde5df]
        max-[900px]:px-6 max-[900px]:pt-[60px] max-[900px]:pb-[90px]`}
    >
      <div
        ref={headingRef}
        className={`transition-all duration-700 ease-out ${headingVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
      >
        <h2 className="mb-[18px] font-[family-name:var(--font-space-grotesk)] text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-[1.05]">
          The stack, dialed in.
        </h2>
        <p className="mb-16 max-w-[560px] text-[1.05rem] leading-relaxed text-[var(--ink-muted)]">
          Not a list of logos - a quick read on the tools I reach for when I am
          building, debugging, and shipping.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap gap-3" aria-label="Skill filters">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={isActive}
              className={`select-none rounded-full border-0 px-5 py-[11px] font-[family-name:var(--font-space-grotesk)] text-[0.75rem]
                tracking-[0.03em] text-[var(--ink-muted)] transition-[color,transform,box-shadow] duration-[250ms]
                hover:-translate-y-px hover:text-[var(--accent-deep)]
                max-[460px]:[flex:1_1_calc(50%-6px)]
                ${isActive ? `${PRESSED} font-medium text-[var(--accent-deep)]` : RAISED_SM}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div
        key={activeFilter}
        className="grid grid-cols-4 gap-[26px] max-[900px]:grid-cols-2 max-[460px]:grid-cols-1"
      >
        {visibleSkills.map((skill, i) => (
          <article
            key={skill.name}
            style={{ animationDelay: `${i * 35}ms` }}
            className={`${RAISED} flex origin-center flex-col items-center rounded-[22px] px-[18px] pb-[22px] pt-7 text-center
              group opacity-0 [animation:fadeInUp_0.5s_ease_forwards]
              transition-transform duration-[250ms] hover:-translate-y-1`}
          >
            <div
              className={`${PRESSED} relative mb-4 grid h-[78px] w-[78px] place-items-center rounded-full`}
            >
              <span
                aria-hidden
                className="block h-[38px] w-[38px] transition-transform duration-300 group-hover:scale-110 [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]"
                style={{
                  backgroundColor: skill.color,
                  maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.icon}.svg)`,
                  WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.icon}.svg)`,
                }}
              />
            </div>
            <div className="mb-0.5 font-[family-name:var(--font-space-grotesk)] text-[0.95rem] font-semibold">
              {skill.name}
            </div>
            <div className="font-[family-name:var(--font-space-grotesk)] text-[0.62rem] uppercase tracking-[0.06em] text-[var(--ink-faint)]">
              {skill.cat}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}