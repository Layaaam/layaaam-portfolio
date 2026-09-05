"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function HeroMobileView() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-[#eef0f1]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/daylight-background-mobile.png"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Header */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-6">
                <span className="font-[family-name:var(--font-inter)] text-3xl italic text-neutral-800">
                    L
                </span>
                <button
                    aria-label="Open menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
                >
                    <span className="flex flex-col gap-[5px]">
                        <span className="h-[2px] w-4 bg-neutral-800" />
                        <span className="h-[2px] w-4 bg-neutral-800" />
                        <span className="h-[2px] w-4 bg-neutral-800" />
                    </span>
                </button>
            </div>

            <div
                className={`relative z-10 h-full w-full transition-all duration-1000 ease-out ${
                    mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
            >
                {/* FULL STACK */}
                <h1
                    className="absolute left-[29%] top-[17vh] z-30 font-extrabold leading-[0.9] tracking-tight text-neutral-900"
                    style={{ fontSize: "9.5vw" }}
                >
                    FULL STACK
                </h1>

                {/* DEVELOPER — vertical banner, layered behind/in front of the photo */}
                <div className="absolute right-0 top-0 z-0 h-full w-[15vh] flex items-center justify-center" aria-hidden>
                    <div
                        className="whitespace-nowrap rotate-90 font-extrabold leading-none tracking-tight text-neutral-900"
                        style={{ fontSize: "14vh", textShadow: "4px 4px 14px rgba(0,0,0,0.35)" }}
                    >
                        DEVELOPER
                    </div>
                </div>
                <div className="absolute right-0 top-0 z-20 h-full w-[15vh] flex items-center justify-center" aria-hidden>
                    <div
                        className="whitespace-nowrap rotate-90 font-extrabold leading-none tracking-tight text-transparent"
                        style={{ fontSize: "14vh", WebkitTextStroke: "1.5px #000000" }}
                    >
                        DEVELOPER
                    </div>
                </div>

                {/* Photo */}
                <div className="absolute left-1/2 top-[19vh] z-10 h-[54vh] w-[82vw] -translate-x-1/2">
                    <Image
                        src="/Liam-Grayish.png"
                        alt="Liam Christian"
                        fill
                        priority
                        className="object-contain object-top"
                    />
                </div>

                {/* Quote */}
                <p className="absolute left-6 top-[76vh] z-30 max-w-[62%] font-[family-name:var(--font-inter)] text-[3.6vw] italic leading-snug text-neutral-700">
                    &ldquo;I don&apos;t have everything figured out yet, but I build, I
                    reflect and I just keep going&rdquo;
                </p>

                {/* CTAs */}
                <div className="absolute inset-x-6 top-[87vh] z-30 flex gap-3">
                    <a
                        href="#projects"
                        className="flex-1 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-neutral-900 shadow-sm"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="flex-1 rounded-full bg-neutral-400/40 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        const check = () => setIsMobile(window.innerWidth < 768);
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (isMobile) {
        return <HeroMobileView />;
    }

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#eef0f1]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/daylight-background.png"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
            </div>

            <div className={`absolute inset-0 z-10 transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
            >
                <div style={{ position: "absolute", left: "13.5vh", top: "21vh" }}>
                    <p
                        className="font-[family-name:var(--font-inter)] font-light text-neutral-500"
                        style={{ fontSize: "3vh" }}
                    >
                        Hi! I&apos;m
                    </p>
                    <h1
                        className="font-bold leading-tight text-neutral-900"
                        style={{ fontSize: "6vh" }}
                    >
                        Liam Christian
                    </h1>
                </div>

                <p
                    className="max-w-md text-right font-[family-name:var(--font-inter)] italic leading-relaxed text-neutral-800"
                    style={{
                        position: "absolute",
                        right: "12vh",
                        top: "22.5vh",
                        fontSize: "2.5  vh",
                    }}
                >
                    I don&apos;t have everything figured out yet, but I build, I
                    reflect and I just keep going...
                </p>

                <h2 className="absolute font-extrabold tracking-tight text-black"
                    style={{
                        fontSize: "13vh",
                        top: "42.5vh",
                        right: "12vh",
                        textShadow: "8px 8px 20px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    FULL STACK
                </h2>

                <div className="absolute inset-x-0 bottom-0 h-[58vh]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-0 select-none whitespace-nowrap text-center font-extrabold leading-none tracking-tight text-neutral-900"
                        style={{
                            fontSize: "36vh",
                            color: "#000000",
                            textShadow: "8px 8px 20px rgba(0, 0, 0, 0.50)",
                        }}
                    >
                        DEVELOPER
                    </div>

                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-20 select-none whitespace-nowrap text-center font-extrabold leading-none tracking-tight"
                        style={{
                            fontSize: "36vh",
                            WebkitTextStroke: ".5vh #000000",
                            color: "transparent",
                        }}
                    >
                        DEVELOPER
                    </div>

                    <div className="absolute bottom-0 left-1/2 z-10 h-[90vh] w-auto -translate-x-1/2">
                        <Image
                            src="/Liam-Grayish.png"
                            alt="Liam Christian"
                            width={900}
                            height={1200}
                            priority
                            className="h-full w-auto object-contain object-bottom"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}