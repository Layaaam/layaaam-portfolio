import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" style={{ paddingTop: "100px" }} className="ab-section">
            
            <div className="ab-grid">
                <div className="ab-card ab-raised">
                    <span className="ab-quote">&ldquo;</span>
                    <p>
                        I&apos;m Liam! A Full Stack Developer with a Cum Laude degree in
                        BS Information Technology, specializing in Software Development,
                        from Central Mindanao University. I like the
                        unglamorous middle of a project more than the launch, the part
                        where something&apos;s half-broken and you&apos;re figuring out
                        why.
                    </p>
                    <p>
                        I don't have everything figured out yet, but I build, I reflect, and I just keep going.
                    </p>

                    <div className="ab-sign">
                        <div className="ab-badge ab-raised-sm">
                            <Image
                                src="/logo.svg"
                                alt="Liam Christian logo"
                                width={28}
                                height={28}
                            />
                        </div>
                        <div className="ab-sign-text">
                            <b>Liam Christian</b>
                            Philippines
                        </div>
                    </div>


                </div>

                {/* ---------------- Timeline ---------------- */}
                <div className="ab-timeline">
                    <div className="ab-t-item ab-raised">
                        <div className="ab-t-node ab-raised-sm" />
                        <div className="ab-t-top">
                            <span className="ab-t-role">Full Stack Developer Intern</span>
                            <span className="ab-t-period ab-mono">Internship</span>
                        </div>
                        <div className="ab-t-org">OBX Solutions Technology Inc.</div>
                        <div className="ab-t-desc">
                            Built and shipped features across the stack in production
                            codebases — from database-backed APIs to the interfaces people
                            actually clicked on.
                        </div>
                        <div className="ab-t-tags">
                            <span className="ab-pressed">Laravel</span>
                            <span className="ab-pressed">React</span>
                            <span className="ab-pressed">TypeScript</span>
                            <span className="ab-pressed">Shadcn/ui</span>
                        </div>
                    </div>

                    <div className="ab-t-item ab-raised">
                        <div className="ab-t-node ab-raised-sm" />
                        <div className="ab-t-top">
                            <span className="ab-t-role">Freelance Frontend Developer</span>
                            <span className="ab-t-period ab-mono">Freelance</span>
                        </div>
                        <div className="ab-t-org">Megaworld Homes</div>
                        <div className="ab-t-desc">
                            Built landing pages with custom animations and SEO in mind —
                            learned to balance a client&apos;s brand with real performance
                            constraints.
                        </div>
                        <div className="ab-t-tags">
                            <span className="ab-pressed">Next.js</span>
                            <span className="ab-pressed">SEO</span>
                            <span className="ab-pressed">Animation</span>
                        </div>
                    </div>

                    <div className="ab-t-item ab-raised">
                        <div className="ab-t-node ab-raised-sm" />
                        <div className="ab-t-top">
                            <span className="ab-t-role">BS Information Technology</span>
                            <span className="ab-t-period ab-mono">2022 — 2026</span>
                        </div>
                        <div className="ab-t-org">Central Mindanao University - Cum Laude, GWA 1.546</div>
                        <div className="ab-t-desc">
                            Capstone: BUKTRACK, a real-time public bus tracking system for
                            PABAMA Corp built with Firebase and the Google Maps API,
                            evaluated with 102 respondents.
                        </div>
                        <div className="ab-t-tags">
                            <span className="ab-pressed">Firebase</span>
                            <span className="ab-pressed">Google Maps API</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");

        .ab-section {
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
          --radius: 26px;
          --radius-sm: 14px;

          max-width: 1240px;
          margin: 0 auto;
          padding: 140px 48px;
          font-family: "Inter", sans-serif;
          color: var(--ink);
        }

        .ab-mono {
          font-family: "JetBrains Mono", monospace;
          letter-spacing: 0.02em;
        }

        .ab-eyebrow {
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
        .ab-eyebrow::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-tint);
        }

        .ab-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }

        .ab-sub {
          color: var(--ink-muted);
          font-size: 1.05rem;
          max-width: 560px;
          line-height: 1.6;
          margin-bottom: 64px;
        }

        .ab-raised {
          background: var(--surface);
          box-shadow: 10px 10px 22px var(--shadow-dark),
            -10px -10px 22px var(--shadow-light);
        }
        .ab-pressed {
          background: var(--surface);
          box-shadow: inset 7px 7px 14px var(--shadow-dark),
            inset -7px -7px 14px var(--shadow-light);
        }
        .ab-raised-sm {
          box-shadow: 5px 5px 10px var(--shadow-dark),
            -5px -5px 10px var(--shadow-light);
        }

        .ab-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 64px;
          align-items: start;
        }

        .ab-card {
          border-radius: var(--radius);
          padding: 44px 40px;
          position: relative;
        }
        .ab-quote {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 4rem;
          color: var(--accent);
          line-height: 0.6;
          display: block;
          margin-bottom: 18px;
        }
        .ab-card p {
          font-size: 1.12rem;
          line-height: 1.7;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .ab-card p:last-of-type {
          margin-bottom: 0;
        }
        .ab-sign {
          margin-top: 28px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ab-badge {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          color: var(--accent-deep);
        }
        .ab-sign-text {
          font-size: 0.85rem;
          color: var(--ink-muted);
        }
        .ab-sign-text b {
          display: block;
          color: var(--ink);
          font-family: var(--font-space-grotesk);
          font-size: 0.98rem;
        }

        .ab-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 36px;
        }
        .ab-pill {
          border-radius: var(--radius-sm);
          padding: 18px 14px;
          text-align: center;
        }
        .ab-num {
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          font-size: 1.6rem;
          color: var(--ink);
        }
        .ab-lbl {
          font-family: "JetBrains Mono";
          font-size: 0.66rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-top: 4px;
        }

        .ab-timeline {
          position: relative;
          padding-left: 46px;
        }
        .ab-timeline::before {
          content: "";
          position: absolute;
          left: 17px;
          top: 6px;
          bottom: 6px;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            var(--shadow-dark) 0 6px,
            transparent 6px 12px
          );
        }
        .ab-t-item {
          position: relative;
          padding: 26px 28px;
          border-radius: 20px;
          margin-bottom: 22px;
        }
        .ab-t-item:last-child {
          margin-bottom: 0;
        }
        .ab-t-node {
          position: absolute;
          left: -46px;
          top: 28px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ab-t-node::after {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
        }
        .ab-t-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        .ab-t-role {
          font-family: var(--font-space-grotesk);
          font-weight: 600;
          font-size: 1.15rem;
        }
        .ab-t-period {
          font-family: "JetBrains Mono";
          font-size: 0.72rem;
          color: var(--ink-muted);
          background: var(--surface-2);
          padding: 5px 10px;
          border-radius: 8px;
        }
        .ab-t-org {
          font-size: 0.92rem;
          color: var(--accent-deep);
          font-weight: 500;
          margin-bottom: 10px;
        }
        .ab-t-desc {
          font-size: 0.94rem;
          color: var(--ink-muted);
          line-height: 1.6;
        }
        .ab-t-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 14px;
        }
        .ab-t-tags span {
          font-family: "JetBrains Mono";
          font-size: 0.68rem;
          padding: 5px 10px;
          border-radius: 8px;
          color: var(--ink-muted);
        }

        @media (max-width: 900px) {
          .ab-section {
            padding: 90px 24px;
          }
          .ab-grid {
            grid-template-columns: 1fr;
          }
          .ab-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
        </section>
    );
}