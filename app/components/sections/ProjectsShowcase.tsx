"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, RefObject } from "react";
import { createPortal } from "react-dom";

interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: "Ongoing";
  technologies: Technology[];
  type: "web" | "mobile";
}

interface Technology {
  name: string;
  icon: string;
  color: string;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

const technology = {
  nextjs: { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
  react: { name: "React", icon: "react", color: "#61DAFB" },
  reactNative: { name: "React Native", icon: "react", color: "#61DAFB" },
  typescript: { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  tailwind: { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
  resend: { name: "Resend", icon: "resend", color: "#FFFFFF" },
  vercel: { name: "Vercel", icon: "vercel", color: "#FFFFFF" },
  figma: { name: "Figma (design)", icon: "figma", color: "#F24E1E" },
  laravel: { name: "Laravel", icon: "laravel", color: "#FF2D20" },
  shadcn: { name: "Shadcn/ui", icon: "shadcnui", color: "#FFFFFF" },
  postgresql: { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  flutter: { name: "Flutter", icon: "flutter", color: "#02569B" },
  dart: { name: "Dart", icon: "dart", color: "#0175C2" },
  firebase: { name: "Firebase", icon: "firebase", color: "#FFCA28" },
  googleMaps: { name: "Google Maps API", icon: "googlemaps", color: "#4285F4" },
  vite: { name: "Vite", icon: "vite", color: "#646CFF" },
  supabase: { name: "Supabase", icon: "supabase", color: "#3ECF8E" },
} satisfies Record<string, Technology>;

const projects: Project[] = [
  {
    id: "megaworld-homes",
    title: "Megaworld Homes",
    description:
      "A multi-property real estate marketing platform that helps prospective buyers explore Megaworld residential developments across Luzon, review property information, and submit inquiries through dedicated project microsites.",
    image: "/project-images/MEGAWORLDHOMES-web.png",
    liveUrl: "https://megaworldhomes.com",
    technologies: [
      technology.nextjs,
      technology.react,
      technology.typescript,
      technology.tailwind,
      technology.resend,
      technology.vercel,
      technology.figma,
    ],
    type: "web",
  },
  {
    id: "mkwd-hrims",
    title: "Metro Kidapawan Water District - Information Management System",
    shortTitle: "MKWD HRIMS",
    description:
      "An integrated operations platform that centralizes human resources, attendance, payroll, document tracking, and inventory workflows for government offices. Its configurable structure allows public-sector organizations to adapt the system to their own processes.",
    image: "/project-images/MKWD-web.png",
    liveUrl: "https://hris.obxsolution.com",
    technologies: [
      technology.laravel,
      technology.react,
      technology.typescript,
      technology.shadcn,
      technology.postgresql,
    ],
    type: "web",
  },
  {
    id: "prdp-scale-up-mindanao",
    title: "PRDP Scale-Up Mindanao",
    description:
      "A public information platform for the Philippine Rural Development Project's Mindanao Cluster, presenting regional initiatives, subprojects, mission updates, reports, and media in one accessible website.",
    image: "/project-images/PRDP-web.png",
    liveUrl: "https://prdpmin.online",
    technologies: [
      technology.laravel,
      technology.react,
      technology.typescript,
      technology.shadcn,
    ],
    type: "web",
  },
  {
    id: "buktrack",
    title: "BUKTRACK",
    description:
      "A mobile and web transportation platform that connects commuters, bus conductors, and administrators through live vehicle tracking, route information, and map-based operational visibility.",
    image: "/project-images/BUKTRACK-mobile.png",
    liveUrl: "https://buktrack.web.app",
    technologies: [
      technology.flutter,
      technology.dart,
      technology.firebase,
      technology.googleMaps,
    ],
    type: "mobile",
  },
  {
    id: "the-blazer",
    title: "The Blazer",
    description:
      "An announcement and content-publishing platform built to distribute updates to more than 3,000 subscribers, with public access and administrative tools for managing published content.",
    image: "/project-images/BLAZER-web.png",
    liveUrl: "https://blazer-opal.vercel.app",
    githubUrl: "https://github.com/Layaaam/blazer",
    technologies: [
      technology.react,
      technology.vite,
      technology.typescript,
      technology.supabase,
    ],
    type: "web",
  },
  {
    id: "wildcats-2026",
    title: "Wildcats 2026",
    description:
      "A team and event website for CMU Palaro's Wildcats delegation, representing the College of Engineering and the College of Information Sciences and Computing.",
    image: "/project-images/WILDCATS-web.png",
    liveUrl: "https://wildcats2026.online",
    technologies: [technology.react, technology.vercel],
    type: "web",
  },
  {
    id: "tuki",
    title: "Tuki",
    description:
      "A gamified mobile learning application that helps older adults practice everyday digital skills, become more confident with technology, and recognize scams and misinformation in a safe environment.",
    image: "/project-images/TUKI-mobile.png",
    githubUrl: "https://github.com/Layaaam/tuki",
    status: "Ongoing",
    technologies: [technology.reactNative],
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
const EMPTY_SUBSCRIBE = () => () => undefined;

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

interface DetailOverlayProps {
  project: Project;
  palette: Palette;
  origin: Bounds;
  viewport: Viewport;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  dialogRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

function getDetailTarget(viewport: Viewport): Bounds {
  const desktop = viewport.width >= 1024;
  const width = desktop
    ? Math.min(viewport.width * 0.44, 640, viewport.height * 0.72 * CARD_ASPECT)
    : Math.min(viewport.width - 32, 560, viewport.height * 0.38 * CARD_ASPECT);
  const height = width / CARD_ASPECT;
  const left = desktop
    ? Math.max(40, (viewport.width - 1400) / 2)
    : (viewport.width - width) / 2;
  const top = desktop ? (viewport.height - height) / 2 : Math.max(76, viewport.height * 0.09);

  return { left, top, width, height };
}

function ProjectArtwork({ project }: { project: Project }) {
  return project.type === "mobile" ? (
    <div className="relative flex h-full items-center justify-center p-4 md:p-6">
      <div className="relative h-full w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1023px) 90vw, 44vw"
          draggable={false}
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  ) : (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 1023px) 90vw, 52vw"
      draggable={false}
      className="object-cover object-top"
    />
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d="M16 10H4m5-5-5 5 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailOverlay({
  project,
  palette,
  origin,
  viewport,
  closeButtonRef,
  dialogRef,
  onClose,
}: DetailOverlayProps) {
  const reducedMotion = useReducedMotion();
  const target = useMemo(() => getDetailTarget(viewport), [viewport]);
  const desktop = viewport.width >= 1024;
  const gap = viewport.width >= 1280 ? 72 : 40;
  const panelLeft = desktop ? target.left + target.width + gap : 20;
  const panelTop = desktop ? Math.max(92, viewport.height * 0.16) : target.top + target.height + 20;
  const panelRight = desktop ? Math.max(40, (viewport.width - 1400) / 2) : 20;
  const duration = reducedMotion ? 0.14 : 0.68;
  const cardTransition = reducedMotion
    ? { duration }
    : { duration, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const cardInitial = reducedMotion ? { ...target, opacity: 0 } : { ...origin, opacity: 1 };
  const cardExit = reducedMotion ? { ...target, opacity: 0 } : { ...origin, opacity: 1 };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-detail-${project.id}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-hidden text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.12 : 0.28 }}
        style={{
          backgroundColor: palette.bg,
          backgroundImage:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.09), transparent 50%), radial-gradient(ellipse at 70% 50%, transparent 45%, rgba(0,0,0,0.4))",
        }}
      />

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 md:left-8 md:top-8"
      >
        <BackIcon />
        Back to projects
      </button>

      <motion.div
        className="fixed overflow-hidden rounded-[28px] border border-white/15 shadow-2xl shadow-black/60"
        style={{ background: `linear-gradient(135deg, ${palette.tint}, ${palette.bg})` }}
        initial={cardInitial}
        animate={{ ...target, opacity: 1 }}
        exit={cardExit}
        transition={cardTransition}
      >
        <ProjectArtwork project={project} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      </motion.div>

      <motion.div
        className="fixed overflow-y-auto pr-1"
        style={{
          left: panelLeft,
          right: panelRight,
          top: panelTop,
          bottom: desktop ? Math.max(64, viewport.height * 0.13) : 20,
        }}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, x: desktop ? 42 : 0, y: desktop ? 0 : 28 }
        }
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, x: desktop ? 26 : 0, y: desktop ? 0 : 18 }
        }
        transition={{
          duration: reducedMotion ? 0.12 : 0.45,
          delay: reducedMotion ? 0 : 0.18,
          ease: "easeOut",
        }}
      >
        <div className="flex min-h-full flex-col justify-center py-3 lg:py-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Featured project
            </span>
            {project.status && (
              <span className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                {project.status}
              </span>
            )}
          </div>

          <h3
            id={`project-detail-${project.id}`}
            className="max-w-2xl text-balance text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ textShadow: TITLE_SHADOW }}
          >
            {project.title}
          </h3>

          <div className="mt-8 max-w-2xl border-l border-white/20 pl-5 sm:pl-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              What is it?
            </p>
            <p className="mt-3 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {project.description}
            </p>
          </div>

          <div className="mt-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Technologies
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
              {project.technologies.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="block h-3.5 w-3.5 shrink-0 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                    style={{
                      backgroundColor: item.color,
                      maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${item.icon}.svg)`,
                      WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${item.icon}.svg)`,
                    }}
                  />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Visit live site
                <ArrowIcon />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                View repository
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [palette, setPalette] = useState<Palette[]>(() => projects.map(() => DEFAULT_PALETTE));
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailOrigin, setDetailOrigin] = useState<Bounds | null>(null);
  const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleLeftRefs = useRef<(HTMLDivElement | null)[]>([]);

  const paletteRef = useRef(palette);
  const frameRef = useRef<(() => void) | null>(null);
  const detailOpenRef = useRef(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const portalReady = useSyncExternalStore(EMPTY_SUBSCRIBE, () => true, () => false);

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
      if (detailOpenRef.current) return;

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
      if (detailOpenRef.current || ticking) return;
      ticking = true;
      requestAnimationFrame(applyFrame);
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

  useEffect(() => {
    if (detailIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("resize", updateViewport);
    };
  }, [detailIndex]);

  const closeDetail = useCallback(() => {
    setDetailVisible(false);
  }, []);

  useEffect(() => {
    if (detailIndex === null || !detailVisible) return;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDetail();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDetail, detailIndex, detailVisible]);

  const openDetail = useCallback((index: number, trigger: HTMLElement) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rectangle = card.getBoundingClientRect();
    detailOpenRef.current = true;
    lastFocusedRef.current = trigger;
    card.style.visibility = "hidden";
    setDetailOrigin({
      left: rectangle.left,
      top: rectangle.top,
      width: rectangle.width,
      height: rectangle.height,
    });
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    setDetailIndex(index);
    setDetailVisible(true);
  }, []);

  const finishDetailClose = useCallback(() => {
    detailOpenRef.current = false;
    setDetailIndex(null);
    setDetailOrigin(null);
    requestAnimationFrame(() => {
      frameRef.current?.();
      lastFocusedRef.current?.focus();
    });
  }, []);

  const active = projects[activeIndex];
  const detailProject = detailIndex === null ? null : projects[detailIndex];

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
                <ProjectArtwork project={p} />
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

          <div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-30 flex items-center justify-between px-5 md:bottom-auto md:top-[var(--row-y)] md:-translate-y-1/2 md:px-10">
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
              <button
                type="button"
                onClick={(event) => openDetail(activeIndex, event.currentTarget)}
                aria-label={`View project: ${active.title}`}
                className="pointer-events-auto shrink-0 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                View project
              </button>
            </div>

          <p className="sr-only" aria-live="polite">
            {active.title}
          </p>
        </div>
      </div>

      {portalReady && detailProject && detailOrigin &&
        createPortal(
          <AnimatePresence onExitComplete={finishDetailClose}>
            {detailVisible && (
              <DetailOverlay
                key={detailProject.id}
                project={detailProject}
                palette={palette[detailIndex ?? 0]}
                origin={detailOrigin}
                viewport={viewport}
                closeButtonRef={closeButtonRef}
                dialogRef={dialogRef}
                onClose={closeDetail}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
