"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function HeroMobileView() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-8 text-center">
            <div
                className={`transition-all duration-1000 ease-out ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
                <div className="mb-6 flex justify-center gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-300 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500" />
                </div>

                <h1 className="text-lg font-medium tracking-wide text-neutral-800">
                    Mobile view coming soon
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                    This site is best viewed on a larger screen for now.
                </p>
            </div>
        </div>
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