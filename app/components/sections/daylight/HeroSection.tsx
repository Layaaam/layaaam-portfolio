"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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