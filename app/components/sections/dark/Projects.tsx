"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface Project {
  id: number;
  title: string;
  shortTitle?: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  type: "web" | "mobile";
}

const projects: Project[] = [
  {
    id: 1,
    title: "MegaworldHomes",
    description:
      "A production-grade real estate marketing platform built solo as a freelance project, featuring a project-explorer landing page and fully-featured property microsites. Includes a scroll-driven, fully responsive UI with Intersection Observer animations, a cinematic splash screen, and a live client inquiry system powered by Resend.",
    image: "/project-images/MEGAWORLDHOMES-web.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 2,
    title: "PRDP Scale-Up Mindanao",
    description:
      "A public-facing web platform for the Philippine Rural Development Project's Scale-Up Mindanao initiative, focused on frontend design and implementation of the landing page. Features editable content management for mission updates, subproject information, reports, and gallery content, built to support the 5th World Bank WBI5m mission.",
    image: "/project-images/PRDP-web.png",
    tags: ["Laravel", "React", "TypeScript"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 3,
    title: "Metro Kidapawan Water District — Human Resource Information Management System",
    shortTitle: "MKWD HRIMS",
    description:
      "A full-stack Human Resource Information Management System built for Metro Kidapawan Water District, led as the Payroll Processing module developer. Covers a 5-step payroll pipeline from period setup and employee loading through computation, floor check, and post-and-finalize workflows.",
    image: "/project-images/MKWD-web.png",
    tags: ["Laravel", "React", "TypeScript", "Shadcn/ui"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 4,
    title: "BUKTRACK",
    description:
      "A capstone mobile and web-based bus information and tracking system designed to improve commuter awareness and public transport transparency in Bukidnon. Features real-time location tracking and map-based visualization.",
    image: "/project-images/BUKTRACK-mobile.png",
    tags: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    link: "#",
    github: "#",
    type: "mobile",
  },
  {
    id: 5,
    title: "TRANSYNC",
    description:
      "An administrative web application developed as an initial foundation for managing fleet operations in BUKTRACK. Built to meet academic requirements and serve as the starting point for our capstone project.",
    image: "/project-images/TRANSYNC-web.png",
    tags: ["Laravel", "PostgreSQL", "Blade", "Tailwind CSS", "Leaflet"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 6,
    title: "CMUPin",
    description:
      "A community-based disaster and climate information system that allows households to pin locations, update safety status, and receive alerts from administrators such as the Disaster Risk Reduction Office.",
    image: "/project-images/CMUPin-web.png",
    tags: [
      "Laravel",
      "React",
      "Inertia.js",
      "Leaflet",
      "USGS Earthquake API",
      "Openstreetmap",
      "CartoDB",
      "Esri",
      "OpenTopoMap",
      "PostgreSQL",
    ],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 7,
    title: "NASA APOD Viewer",
    description:
      "A mobile application that consumes NASA's Astronomy Picture of the Day (APOD) API. Built as an introductory project to understand API integration, asynchronous data fetching, and mobile UI development.",
    image: "/project-images/APOD-mobile.png",
    tags: ["Flutter", "Dart", "NASA APOD API"],
    link: "#",
    github: "#",
    type: "mobile",
  },
  {
    id: 8,
    title: "The Blazer Website",
    description:
      "A work-in-progress web platform designed for announcements and content distribution to around 3,000+ subscribers, with user access and administrative controls for content management.",
    image: "/project-images/BLAZER-web.png",
    tags: ["React", "Vite", "TypeScript", "Supabase"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 9,
    title: "Musica",
    description:
      "A native Android music player developed as a culmination of foundational programming courses, applying object-oriented programming concepts, core data structures and algorithms discussions such as queues, local data storage, and media handling.",
    image: "/project-images/MUSICA-mobile.png",
    tags: ["Android Studio", "Java", "SQLite"],
    link: "#",
    github: "#",
    type: "mobile",
  },
];

const N = projects.length;
const STEP_SVH = 85;
const CARD_ASPECT = 1.6;
const GAP_RATIO = 0.22; 
const OUT_SPEED = 1; 
const TILT_DEG = 16; 
const PERSPECTIVE_PX = 1200;
const SCALE_MIN = 0.9;
const PEEK_OPACITY = 0.7; 
const TITLE_FADE = 0.6; 
const BG_L_MIN = 0.07;
const BG_L_MAX = 0.32;
const SAT_MIN = 0.06;
const SAT_MAX = 0.3;
const DEFAULT_BG = "#0b0e13";
const DEFAULT_TINT = "#1b212c";

type Palette = { bg: string; tint: string };
const DEFAULT_PALETTE: Palette = { bg: DEFAULT_BG, tint: DEFAULT_TINT };

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function quantize(v: number, step = 24) {
  return Math.round(v / step) * step;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = 60 * (((g - b) / d) % 6);
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      default:
        h = 60 * ((r - g) / d + 4);
    }
  }
  if (h < 0) h += 360;
  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function lerpColor(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function cardFrame(d: number, pitch: number, reduced = false) {
  const ad = Math.abs(d);
  const c = Math.min(ad, 1);

  const ty = (d < 0 ? d * OUT_SPEED : d) * pitch;
  const scale = reduced ? 1 : 1 - (1 - SCALE_MIN) * c;
  const rotate = reduced ? 0 : TILT_DEG * clamp(d, -1, 1);
  const opacity =
    1 - (1 - PEEK_OPACITY) * c - PEEK_OPACITY * clamp((ad - 1) / 0.6, 0, 1);

  return { ty, scale, rotate, opacity: clamp(opacity, 0, 1), z: 100 - Math.round(ad * 10) };
}

export function titleFrame(d: number) {
  return {
    opacity: clamp(1 - Math.abs(d) / TITLE_FADE, 0, 1),
    ty: clamp(d, -1, 1) * 24,
  };
}

export function paletteFromStats(hue: number, domSat: number, avgLum: number): Palette {
  const L = BG_L_MIN + (BG_L_MAX - BG_L_MIN) * Math.pow(clamp(avgLum, 0, 1), 0.85);
  const s = clamp(domSat * 0.5, SAT_MIN, SAT_MAX);
  const tintL = clamp(L + 0.14, 0.2, 0.46);
  const tintS = clamp(domSat * 0.6, 0.08, 0.4);
  return { bg: hslToHex(hue, s, L), tint: hslToHex(hue, tintS, tintL) };
}

function extractPalette(src: string): Promise<Palette> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(DEFAULT_PALETTE);
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        type Bucket = { w: number; n: number; r: number; g: number; b: number };
        const buckets = new Map<string, Bucket>();
        let lumSum = 0;
        let px = 0;
        let allR = 0;
        let allG = 0;
        let allB = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (data[i + 3] < 200) continue;

          lumSum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          allR += r;
          allG += g;
          allB += b;
          px++;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          if (max > 235 && min > 215) continue;
          if (max < 22) continue;

          const key = `${quantize(r, 32)}-${quantize(g, 32)}-${quantize(b, 32)}`;
          const bucket = buckets.get(key) || { w: 0, n: 0, r: 0, g: 0, b: 0 };
          bucket.w += 1 + (4 * (max - min)) / 255;
          bucket.n++;
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          buckets.set(key, bucket);
        }

        if (px === 0) return resolve(DEFAULT_PALETTE);

        let best: Bucket | null = null;
        buckets.forEach((bucket) => {
          if (!best || bucket.w > best.w) best = bucket;
        });

        const pick = best as Bucket | null;
        const [h, s] = pick
          ? rgbToHsl(pick.r / pick.n, pick.g / pick.n, pick.b / pick.n)
          : rgbToHsl(allR / px, allG / px, allB / px);

        resolve(paletteFromStats(h, s, lumSum / px));
      } catch {
        resolve(DEFAULT_PALETTE);
      }
    };
    img.onerror = () => resolve(DEFAULT_PALETTE);
    img.src = src;
  });
}

const TITLE_SHADOW = "0 1px 3px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.55)";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [palette, setPalette] = useState<Palette[]>(() => projects.map(() => DEFAULT_PALETTE));

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleLeftRefs = useRef<(HTMLDivElement | null)[]>([]);

  const paletteRef = useRef(palette);
  const frameRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    projects.forEach((p, i) => {
      extractPalette(p.image).then((result) => {
        if (cancelled) return;
        setPalette((prev) => {
          if (prev[i].bg === result.bg && prev[i].tint === result.tint) return prev;
          const next = [...prev];
          next[i] = result;
          return next;
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const trackEl = trackRef.current;
    const stageEl = stageRef.current;
    if (!trackEl || !stageEl) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reduceMq.matches;
    let pitch = 0;
    let ticking = false;
    let lastIndex = -1;

    const measure = () => {
      const first = cardRefs.current[0];
      pitch = first ? first.offsetHeight * (1 + GAP_RATIO) : 0;
    };

    const applyFrame = () => {
      ticking = false;

      const rect = trackEl.getBoundingClientRect();
      const scrollable = trackEl.offsetHeight - stageEl.clientHeight;
      const step = scrollable / N;
      const p = (step > 0 ? clamp(-rect.top / step, 0, N) : 0) - 1;
      const pc = clamp(p, 0, N - 1); 

      for (let i = 0; i < N; i++) {
        const d = i - p;

        const card = cardRefs.current[i];
        if (card) {
          const f = cardFrame(d, pitch, reduced);
          card.style.transform =
            `translate3d(0, ${f.ty.toFixed(2)}px, 0) ` +
            `perspective(${PERSPECTIVE_PX}px) rotateX(${f.rotate.toFixed(2)}deg) ` +
            `scale(${f.scale.toFixed(4)})`;
          card.style.opacity = f.opacity.toFixed(3);
          card.style.zIndex = String(f.z);
          card.style.visibility = f.opacity <= 0.005 ? "hidden" : "visible";
        }

        const t = titleFrame(d);
        for (const title of [titleRefs.current[i], titleLeftRefs.current[i]]) {
          if (!title) continue;
          title.style.opacity = t.opacity.toFixed(3);
          title.style.transform = `translate3d(0, ${t.ty.toFixed(2)}px, 0)`;
        }
      }

      const colors = paletteRef.current;
      const lo = Math.floor(pc);
      const hi = Math.min(N - 1, lo + 1);
      trackEl.style.backgroundColor = lerpColor(colors[lo].bg, colors[hi].bg, smoothstep(pc - lo));

      const nearest = Math.round(pc);
      if (nearest !== lastIndex) {
        lastIndex = nearest;
        setActiveIndex(nearest);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyFrame);
      }
    };

    const onResize = () => {
      measure();
      applyFrame();
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      applyFrame();
    };

    frameRef.current = applyFrame;
    measure();
    applyFrame();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduceMq.addEventListener("change", onMotionChange);
    return () => {
      frameRef.current = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduceMq.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    paletteRef.current = palette;
    frameRef.current?.();
  }, [palette]);

  const active = projects[activeIndex];

  return (
    <section id="projects" aria-label="Featured projects" className="relative isolate">
      <div
        ref={trackRef}
        className="relative"
        style={{
          height: `calc(100svh + ${N * STEP_SVH}svh)`,
          backgroundColor: DEFAULT_BG,
        }}
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-svh overflow-hidden [--card-w:min(86vw,520px,80svh)] md:[--card-w:min(52vw,760px,80svh)]"
          style={
            {
              "--card-h": `calc(var(--card-w) / ${CARD_ASPECT})`,
              "--row-y": "calc(50% + var(--card-h) * 0.14)",
            } as CSSProperties
          }
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.07), transparent 60%), " +
                "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.35))",
            }}
          />

          <ol className="pointer-events-none absolute inset-0 z-10 m-0 list-none p-0">
            {projects.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-1/2 mx-auto overflow-hidden rounded-[28px] border border-white/15 shadow-2xl shadow-black/50 will-change-transform"
                style={{
                  width: "var(--card-w)",
                  height: `calc(var(--card-w) / ${CARD_ASPECT})`,
                  marginTop: `calc(var(--card-w) / ${-2 * CARD_ASPECT})`,
                  background: `linear-gradient(135deg, ${palette[i].tint}, ${palette[i].bg})`,
                  visibility: "hidden", 
                }}
              >
                {p.type === "mobile" ? (
                  <div className="flex h-full items-center justify-center p-4 md:p-6">
                    <img
                      src={p.image}
                      alt={p.title}
                      draggable={false}
                      className="h-full w-auto max-w-full rounded-2xl object-contain shadow-2xl shadow-black/40"
                    />
                  </div>
                ) : (
                  <img
                    src={p.image}
                    alt={p.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              </li>
            ))}
          </ol>

          <div className="pointer-events-none absolute inset-x-0 top-[max(5.5rem,11svh)] z-30 px-6 text-center">
            <h2
              className="text-3xl font-bold text-white md:text-5xl"
              style={{ textShadow: TITLE_SHADOW }}
            >
              Featured Projects
            </h2>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[var(--row-y)] z-20 h-12 -translate-x-1/2 -translate-y-1/2 min-[1280px]:hidden"
            style={{ width: "var(--card-w)" }}
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center justify-center px-4 text-center text-xl font-medium text-white md:text-3xl"
                style={{ opacity: i === 0 ? 1 : 0, textShadow: TITLE_SHADOW }}
              >
                <span className="truncate">{p.shortTitle ?? p.title}</span>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center justify-between px-5 md:bottom-auto md:top-[var(--row-y)] md:-translate-y-1/2 md:px-10">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="shrink-0 text-sm tabular-nums tracking-wide text-white/60">
                  {pad(activeIndex + 1)} / {pad(N)}
                </span>
                <div aria-hidden="true" className="relative hidden min-[1280px]:grid">
                  {projects.map((p, i) => (
                    <div
                      key={p.id}
                      ref={(el) => {
                        titleLeftRefs.current[i] = el;
                      }}
                      className={`w-max text-balance font-bold leading-[1.05] text-white ${
                        i === activeIndex ? "col-start-1 row-start-1" : "absolute left-0 top-0"
                      }`}
                      style={{
                        maxWidth: "calc((100vw - var(--card-w)) / 2 - 4.5rem)",
                        fontSize:
                          "clamp(1.25rem, min(2.1vw, calc(((100vw - var(--card-w)) / 2 - 4.5rem) / 9.5)), 2.5rem)",
                        overflowWrap: "anywhere",
                        opacity: i === 0 ? 1 : 0,
                        textShadow: TITLE_SHADOW,
                      }}
                    >
                      {(p.shortTitle ?? p.title).split(" ").map((word, w, words) => (
                        <Fragment key={w}>
                          <span className="whitespace-nowrap">{word}</span>
                          {w < words.length - 1 ? " " : null}
                        </Fragment>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={active.link ?? "#"}
                aria-label={`View project: ${active.title}`}
                className="pointer-events-auto shrink-0 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                View project
              </a>
            </div>

          <p className="sr-only" aria-live="polite">
            {active.title}
          </p>
        </div>
      </div>
    </section>
  );
}
