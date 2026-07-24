"use client";

import { useEffect, useState } from "react";

const filters = [
  { label: "ALL", value: "all" },
  { label: "FRONTEND", value: "frontend" },
  { label: "BACKEND", value: "backend" },
  { label: "TOOLS", value: "tools" },
] as const;

const skills = [
  { name: "React", cat: "frontend", icon: "react", color: "#61DAFB", pct: 92 },
  { name: "Next.js", cat: "frontend", icon: "nextdotjs", color: "#16171a", pct: 85 },
  { name: "Vue.js", cat: "frontend", icon: "vuedotjs", color: "#4FC08D", pct: 70 },
  { name: "Tailwind CSS", cat: "frontend", icon: "tailwindcss", color: "#06B6D4", pct: 90 },
  { name: "Flutter", cat: "frontend", icon: "flutter", color: "#02569B", pct: 88 },
  { name: "JavaScript", cat: "frontend", icon: "javascript", color: "#F7DF1E", pct: 90 },
  { name: "Node.js", cat: "backend", icon: "nodedotjs", color: "#339933", pct: 80 },
  { name: "Laravel", cat: "backend", icon: "laravel", color: "#FF2D20", pct: 90 },
  { name: "PHP", cat: "backend", icon: "php", color: "#777BB4", pct: 82 },
  { name: "Python", cat: "backend", icon: "python", color: "#3776AB", pct: 75 },
  { name: "MySQL", cat: "backend", icon: "mysql", color: "#4479A1", pct: 85 },
  { name: "Firebase", cat: "backend", icon: "firebase", color: "#FFCA28", pct: 88 },
  { name: "Git", cat: "tools", icon: "git", color: "#F05032", pct: 90 },
  { name: "GitHub", cat: "tools", icon: "github", color: "#16171a", pct: 90 },
  { name: "Figma", cat: "tools", icon: "figma", color: "#F24E1E", pct: 75 },
  {
    name: "Android Studio",
    cat: "tools",
    icon: "androidstudio",
    color: "#3DDC84",
    pct: 78,
  },
] as const;

type SkillFilter = (typeof filters)[number]["value"];

const CIRCUMFERENCE = 283;

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("all");
  const [animatedIn, setAnimatedIn] = useState(false);

  const visibleSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.cat === activeFilter);

  useEffect(() => {
    setAnimatedIn(false);
    const timeout = setTimeout(() => setAnimatedIn(true), 80);
    return () => clearTimeout(timeout);
  }, [activeFilter]);

  return (
    <section id="skills" className="sk-section">
      <div className="sk-eyebrow">02 - Skills</div>
      <h2 className="sk-title">The stack, dialed in.</h2>
      <p className="sk-sub">
        Not a list of logos - a quick read on the tools I reach for when I am
        building, debugging, and shipping.
      </p>

      <div className="sk-filter-row" aria-label="Skill filters">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              className={`sk-chip ${isActive ? "sk-pressed active" : "sk-raised-sm"}`}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={isActive}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="sk-dial-grid">
        {visibleSkills.map((skill) => {
          const offset = animatedIn
            ? CIRCUMFERENCE - (skill.pct / 100) * CIRCUMFERENCE
            : CIRCUMFERENCE;

          return (
            <article className="sk-dial-card sk-raised" key={skill.name}>
              <div className="sk-dial-wrap">
                <svg width="104" height="104" viewBox="0 0 104 104" aria-hidden>
                  <circle className="sk-dial-track" cx="52" cy="52" r="45" />
                  <circle
                    className="sk-dial-fill"
                    cx="52"
                    cy="52"
                    r="45"
                    style={{ strokeDashoffset: offset }}
                  />
                </svg>
                <div className="sk-logo-shell sk-pressed">
                  <span
                    className="sk-logo"
                    style={
                      {
                        "--skill-color": skill.color,
                        "--skill-icon": `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.icon}.svg)`,
                      } as React.CSSProperties
                    }
                    aria-hidden
                  />
                </div>
              </div>
              <div className="sk-dial-name">{skill.name}</div>
              <div className="sk-dial-cat sk-mono">{skill.cat}</div>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .sk-section {
          /* Fixes the stacking-context bug: page.tsx has a fixed-position
             background layer. Without an explicit position here, this
             plain section gets painted BEFORE (i.e. underneath) that
             positioned layer in the browser's paint order, regardless of
             DOM order — so it was invisible even though it rendered fine. */
          position: relative;
          z-index: 1;

          --bg: #e7e8ea;
          --surface: #eceef0;
          --surface-2: #e2e4e7;
          --shadow-dark: #babcc2;
          --shadow-light: #ffffff;
          --ink: #16171a;
          --ink-muted: #6b6d74;
          --ink-faint: #9a9ca3;
          --accent: #6f8f76;
          --accent-deep: #4c6650;
          --accent-tint: #dde5df;

          max-width: 1240px;
          margin: 0 auto;
          padding: 60px 48px 140px;
          color: var(--ink);
          font-family: var(--font-inter), sans-serif;
        }

        .sk-mono {
          font-family: "JetBrains Mono", monospace;
          letter-spacing: 0.02em;
        }

        .sk-eyebrow {
          font-family: "JetBrains Mono", monospace;
          font-size: 12.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-deep);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
        }
        .sk-eyebrow::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-tint);
        }

        .sk-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          line-height: 1.05;
          margin-bottom: 18px;
        }

        .sk-sub {
          color: var(--ink-muted);
          font-size: 1.05rem;
          max-width: 560px;
          line-height: 1.6;
          margin-bottom: 64px;
        }

        .sk-raised {
          background: var(--surface);
          box-shadow: 10px 10px 22px var(--shadow-dark),
            -10px -10px 22px var(--shadow-light);
        }
        .sk-pressed {
          background: var(--surface);
          box-shadow: inset 7px 7px 14px var(--shadow-dark),
            inset -7px -7px 14px var(--shadow-light);
        }
        .sk-raised-sm {
          box-shadow: 5px 5px 10px var(--shadow-dark),
            -5px -5px 10px var(--shadow-light);
        }

        .sk-filter-row {
          display: flex;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .sk-chip {
          border: 0;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          letter-spacing: 0.03em;
          padding: 11px 20px;
          border-radius: 30px;
          cursor: pointer;
          color: var(--ink-muted);
          transition: color 0.25s ease, transform 0.25s ease,
            box-shadow 0.25s ease;
          user-select: none;
        }
        .sk-chip:hover {
          transform: translateY(-1px);
          color: var(--accent-deep);
        }
        .sk-chip.active {
          color: var(--accent-deep);
          font-weight: 500;
        }

        .sk-dial-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }

        .sk-dial-card {
          border-radius: 22px;
          padding: 28px 18px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .sk-dial-card:hover {
          transform: translateY(-4px);
        }

        .sk-dial-wrap {
          position: relative;
          width: 104px;
          height: 104px;
          margin-bottom: 16px;
          display: grid;
          place-items: center;
        }
        .sk-dial-wrap svg {
          position: absolute;
          inset: 0;
          transform: rotate(-90deg);
        }
        .sk-dial-track {
          fill: none;
          stroke: var(--shadow-dark);
          stroke-width: 8;
          opacity: 0.5;
        }
        .sk-dial-fill {
          fill: none;
          stroke: var(--accent);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 283;
          transition: stroke-dashoffset 1.4s cubic-bezier(0.3, 0.8, 0.3, 1);
        }

        .sk-logo-shell {
          position: relative;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          display: grid;
          place-items: center;
        }
        .sk-logo {
          width: 34px;
          height: 34px;
          display: block;
          background: var(--skill-color);
          -webkit-mask-image: var(--skill-icon);
          mask-image: var(--skill-icon);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-size: contain;
          mask-size: contain;
        }

        .sk-dial-name {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .sk-dial-cat {
          font-size: 0.62rem;
          color: var(--ink-faint);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        @media (max-width: 900px) {
          .sk-section {
            padding: 60px 24px 90px;
          }
          .sk-dial-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 460px) {
          .sk-dial-grid {
            grid-template-columns: 1fr;
          }
          .sk-chip {
            flex: 1 1 calc(50% - 6px);
          }
        }
      `}</style>
    </section>
  );
}