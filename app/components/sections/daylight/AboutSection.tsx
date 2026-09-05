"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

const RAISED = "bg-[var(--surface)] shadow-[10px_10px_22px_var(--shadow-dark),-10px_-10px_22px_var(--shadow-light)]";
const RAISED_SM = "shadow-[5px_5px_10px_var(--shadow-dark),-5px_-5px_10px_var(--shadow-light)]";
const PRESSED = "bg-[var(--surface)] shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light)]";

export default function AboutSection() {
  const { ref: headingRef, visible: headingVisible } = useReveal<HTMLDivElement>();
  const { ref: gridRef, visible: gridVisible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      className="relative z-[1] mx-auto max-w-[1240px] px-12 pb-[140px] pt-[140px]
        font-[family-name:'Inter'] text-[var(--ink)]
        [--bg:#e7e8ea] [--surface:#eceef0] [--surface-2:#e2e4e7]
        [--shadow-dark:#babcc2] [--shadow-light:#ffffff] [--ink:#16171a]
        [--ink-muted:#6b6d74] [--ink-faint:#9a9ca3] [--accent:#6f8f76]
        [--accent-deep:#4c6650] [--accent-tint:#dde5df] [--radius:26px] [--radius-sm:14px]
        max-[900px]:px-6 max-[900px]:py-[90px]"
    >
      <div
        ref={headingRef}
        className={`transition-all duration-700 ease-out ${
          headingVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2 className="mb-[18px] font-[family-name:var(--font-space-grotesk)] text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.01em]">
          Not everything&apos;s
          <br />
          figured out. It still ships.
        </h2>
        <p className="mb-16 max-w-[560px] text-[1.05rem] leading-relaxed text-[var(--ink-muted)]">
          A quick look at how I got here, and the roles that shaped how I build.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-[0.85fr_1.15fr] items-start gap-16 max-[900px]:grid-cols-1"
      >
        <div
          className={`${RAISED} relative rounded-[var(--radius)] px-10 py-11 transition-all duration-700 ease-out ${
            gridVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="mb-[18px] block font-[family-name:var(--font-space-grotesk)] text-[4rem] leading-[0.6] text-[var(--accent)]">
            &ldquo;
          </span>
          <p className="mb-5 text-[1.12rem] leading-[1.7] text-[var(--ink)]">
            I&apos;m Liam! A Full Stack Developer with a Cum Laude degree in
            BS Information Technology, specializing in Software Development,
            from Central Mindanao University. I like the unglamorous middle
            of a project more than the launch, the part where
            something&apos;s half-broken and you&apos;re figuring out why.
          </p>
          <p className="text-[1.12rem] leading-[1.7] text-[var(--ink)]">
            I don&apos;t have everything figured out yet, but I build, I
            reflect, and I just keep going.
          </p>

          <div className="mt-7 flex items-center gap-[14px]">
            <div
              className={`${RAISED_SM} flex h-[46px] w-[46px] items-center justify-center rounded-[14px] font-[family-name:var(--font-space-grotesk)] font-bold text-[var(--accent-deep)]`}
            >
              <Image
                src="/logo.svg"
                alt="Liam Christian logo"
                width={28}
                height={28}
              />
            </div>
            <div className="text-[0.85rem] text-[var(--ink-muted)]">
              <b className="block font-[family-name:var(--font-space-grotesk)] text-[0.98rem] text-[var(--ink)]">
                Liam Christian
              </b>
              Philippines
            </div>
          </div>
        </div>

        <div className="relative pl-[46px]">
          <div
            className="absolute bottom-[6px] left-[17px] top-[6px] w-[2px]"
            style={{
              background:
                "repeating-linear-gradient(to bottom, var(--shadow-dark) 0 6px, transparent 6px 12px)",
            }}
          />

          {[
            {
              role: "Full Stack Developer Intern",
              period: "Internship",
              org: "OBX Solutions Technology Inc.",
              desc: "Built and shipped features across the stack in production codebases — from database-backed APIs to the interfaces people actually clicked on.",
              tags: ["Laravel", "React", "TypeScript", "Shadcn/ui"],
            },
            {
              role: "Freelance Frontend Developer",
              period: "Freelance",
              org: "Megaworld Homes",
              desc: "Built landing pages with custom animations and SEO in mind — learned to balance a client's brand with real performance constraints.",
              tags: ["Next.js", "SEO", "Animation"],
            },
            {
              role: "BS Information Technology",
              period: "2022 — 2026",
              org: "Central Mindanao University - Cum Laude, GWA 1.546",
              desc: "Capstone: BUKTRACK, a real-time public bus tracking system for PABAMA Corp built with Firebase and the Google Maps API, evaluated with 102 respondents.",
              tags: ["Firebase", "Google Maps API"],
            },
          ].map((item, i, arr) => (
            <div
              key={item.role}
              style={{ transitionDelay: gridVisible ? `${150 + i * 130}ms` : "0ms" }}
              className={`${RAISED} relative rounded-[20px] px-7 py-[26px] transition-all duration-700 ease-out ${
                gridVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } ${i === arr.length - 1 ? "" : "mb-[22px]"}`}
            >
              <div
                className={`${RAISED_SM} absolute -left-[46px] top-7 flex h-[34px] w-[34px] items-center justify-center rounded-full after:h-[10px] after:w-[10px] after:rounded-full after:bg-[var(--accent)] after:content-['']`}
              />
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[family-name:var(--font-space-grotesk)] text-[1.15rem] font-semibold">
                  {item.role}
                </span>
                <span className="rounded-lg bg-[var(--surface-2)] px-[10px] py-[5px] font-[family-name:var(--font-space-grotesk)] text-[0.72rem] text-[var(--ink-muted)]">
                  {item.period}
                </span>
              </div>
              <div className="mb-[10px] text-[0.92rem] font-medium text-[var(--accent-deep)]">
                {item.org}
              </div>
              <div className="text-[0.94rem] leading-[1.6] text-[var(--ink-muted)]">
                {item.desc}
              </div>
              <div className="mt-[14px] flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${PRESSED} rounded-lg px-[10px] py-[5px] font-[family-name:var(--font-space-grotesk)] text-[0.68rem] text-[var(--ink-muted)]`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}