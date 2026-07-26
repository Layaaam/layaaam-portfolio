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

const logLines = [
  "mapping out the architecture",
  "wiring up the api",
  "chasing a stray bug",
  "polishing the little details",
  "deciding this is good enough to ship",
] as const;

function useTypedLine(lines: readonly string[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const current = lines[lineIndex];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          38
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), 1100);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 900);
      return () => clearTimeout(t);
    }

    if (text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), 20);
      return () => clearTimeout(t);
    }
    setLineIndex((i) => (i + 1) % lines.length);
    setPhase("typing");
  }, [text, phase, lineIndex, lines]);

  return text;
}

const RAISED =
  "bg-[var(--surface)] shadow-[10px_10px_22px_var(--shadow-dark),-10px_-10px_22px_var(--shadow-light)]";

export default function Projects() {
  const typed = useTypedLine(logLines);
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="projects"
      className="relative z-[1] mx-auto max-w-[1240px] px-12 pb-[140px] pt-[60px]
        font-[family-name:var(--font-inter)] text-[var(--ink)]
        [--bg:#e7e8ea] [--surface:#eceef0] [--surface-2:#e2e4e7]
        [--shadow-dark:#babcc2] [--shadow-light:#ffffff] [--ink:#16171a]
        [--ink-muted:#6b6d74] [--ink-faint:#9a9ca3] [--accent:#6f8f76]
        [--accent-deep:#4c6650] [--accent-tint:#dde5df]
        max-[900px]:px-6 max-[900px]:pb-[90px]"
    >
      <div
        ref={revealRef}
        className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
      >
        <div className="mb-[22px] flex items-center gap-[10px] font-[family-name:var(--font-space-grotesk)] text-[12.5px] uppercase tracking-[0.16em] text-[var(--accent-deep)]">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
          </span>
          STATUS: IN PROGRESS
        </div>

        <h2 className="mb-[18px] font-[family-name:var(--font-space-grotesk)] text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.01em]">
          Projects — the highlight reel
          <br />
          is still rendering.
        </h2>
        <p className="mb-12 max-w-[560px] text-[1.05rem] leading-relaxed text-[var(--ink-muted)]">
          This is the part where something&apos;s half-broken and I&apos;m
          figuring out why. Case studies are being written up properly instead
          of dropped here half-finished.
        </p>
      </div>

      <div
        style={{ transitionDelay: visible ? "150ms" : "0ms" }}
        className={`${RAISED} max-w-[640px] overflow-hidden rounded-[22px] transition-all duration-700 ease-out max-[900px]:max-w-full ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
      >
        <div className="flex items-center gap-2 border-b border-[var(--shadow-dark)] px-5 py-4">
          <span className="h-[10px] w-[10px] rounded-full bg-[#e0645c] opacity-85" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#e0b04c] opacity-85" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#5fae6d] opacity-85" />
          <span className="ml-[10px] font-[family-name:var(--font-space-grotesk)] text-[0.7rem] uppercase tracking-[0.06em] text-[var(--ink-faint)]">
            projects.log
          </span>
        </div>
        <div className="flex min-h-[26px] items-baseline px-6 py-[26px] pb-[30px] font-[family-name:var(--font-space-grotesk)] text-[0.92rem] text-[var(--ink)] max-[460px]:px-[18px] max-[460px]:py-[22px] max-[460px]:pb-[26px] max-[460px]:text-[0.85rem]">
          <span className="mr-[10px] flex-shrink-0 text-[var(--accent-deep)]">$</span>
          <span className="whitespace-pre">{typed}</span>
          <span
            aria-hidden
            className="relative top-[3.5px] ml-[3px] h-[1.1em] w-2 flex-shrink-0 animate-[blink_1s_step-end_infinite] bg-[var(--accent-deep)] motion-reduce:animate-none"
          />
        </div>
      </div>

      <div
        style={{ transitionDelay: visible ? "250ms" : "0ms" }}
        className={`mt-6 font-[family-name:var(--font-space-grotesk)] text-[0.78rem] text-[var(--ink-faint)] transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
      >
        Want the details now instead of later? Ask directly — happy to walk
        through what I&apos;ve built.
      </div>
    </section>
  );
}