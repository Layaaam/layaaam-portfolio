"use client";

import { useEffect, useRef, useState } from "react";
import GlassSocialIcons from "../../ui/GlassSocialIcons";

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

const reasons = ["Full-time", "Freelance", "Just saying hi"] as const;

type Status = "idle" | "sending" | "success" | "error";

const RAISED =
  "bg-[var(--surface)] shadow-[10px_10px_22px_var(--shadow-dark),-10px_-10px_22px_var(--shadow-light)]";
const RAISED_SM =
  "shadow-[5px_5px_10px_var(--shadow-dark),-5px_-5px_10px_var(--shadow-light)]";
const PRESSED =
  "bg-[var(--surface)] shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light)]";

export default function Contact() {
  const [activeReason, setActiveReason] = useState<(typeof reasons)[number]>(
    reasons[0]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { ref: cardRef, visible } = useReveal<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: activeReason,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      setStatus("success");
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setActiveReason(reasons[0]);
        setStatus("idle");
      }, 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const buttonLabel = {
    idle: "Send message →",
    sending: "Sending…",
    success: "Message sent ✓",
    error: "Failed — try again",
  }[status];

  const buttonColor =
    status === "error" ? "text-[var(--error)]" : "text-[var(--accent-deep)]";

  return (
    <section
      id="contact"
      className={`relative z-[1] mx-auto max-w-[1240px] px-12 pb-[160px] pt-[60px]
        font-[family-name:var(--font-inter)] text-[var(--ink)]
        [--bg:#e7e8ea] [--surface:#eceef0] [--surface-2:#e2e4e7]
        [--shadow-dark:#babcc2] [--shadow-light:#ffffff] [--ink:#16171a]
        [--ink-muted:#6b6d74] [--ink-faint:#9a9ca3] [--accent:#6f8f76]
        [--accent-deep:#4c6650] [--accent-tint:#dde5df] [--error:#b3564c]
        max-[900px]:px-6 max-[900px]:pb-[100px]`}
    >
      <div
        ref={cardRef}
        className={`${RAISED} grid grid-cols-[0.9fr_1.1fr] gap-14 rounded-[30px] p-[54px]
          transition-all duration-700 ease-out
          max-[900px]:grid-cols-1 max-[900px]:p-9
          ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div
          style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <h2 className="mb-[18px] font-[family-name:var(--font-space-grotesk)] text-[2.2rem] font-bold leading-[1.15]">
            Building something?
            <br />
            Let&apos;s talk it through.
          </h2>
          <p className="mb-8 max-w-[380px] leading-[1.7] text-[var(--ink-muted)]">
            Open to full-time roles, freelance builds, or just a good
            technical conversation. Usually replies within a day.
          </p>

          <div
            className="mb-8 flex flex-wrap gap-[10px]"
            role="group"
            aria-label="Reason for contact"
          >
            {reasons.map((reason) => {
              const isActive = activeReason === reason;
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setActiveReason(reason)}
                  aria-pressed={isActive}
                  disabled={status === "sending"}
                  className={`rounded-xl border-0 px-4 py-[10px] font-[family-name:'JetBrains_Mono'] text-[0.72rem]
                    text-[var(--ink-muted)] transition-colors duration-200
                    disabled:cursor-not-allowed disabled:opacity-60
                    ${isActive ? `${PRESSED} font-medium text-[var(--accent-deep)]` : "cursor-pointer"}`}
                >
                  {reason}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="font-[family-name:var(--font-space-grotesk)] text-[1.05rem] font-bold uppercase tracking-[0.01em] text-[var(--ink)]">
              Connect on Social Media
            </div>
            <GlassSocialIcons
              buttonSize={72}
              iconSize={30}
              logoSize={34}
              gap={18}
              variant="neumorphic"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ transitionDelay: visible ? "180ms" : "0ms" }}
          className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <div className="mb-5">
            <label
              htmlFor="ct-name"
              className="mb-[10px] block font-[family-name:'JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.06em] text-[var(--ink-faint)]"
            >
              Name
            </label>
            <input
              id="ct-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === "sending"}
              className={`${PRESSED} w-full rounded-2xl border-none px-[18px] py-4 font-[family-name:var(--font-inter)] text-[0.95rem]
                text-[var(--ink)] outline-none transition-shadow duration-300 placeholder:text-[var(--ink-faint)] focus:shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light),0_0_0_2px_var(--accent)] disabled:opacity-60`}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="ct-email"
              className="mb-[10px] block font-[family-name:'JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.06em] text-[var(--ink-faint)]"
            >
              Email
            </label>
            <input
              id="ct-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "sending"}
              className={`${PRESSED} w-full rounded-2xl border-none px-[18px] py-4 font-[family-name:var(--font-inter)] text-[0.95rem]
                text-[var(--ink)] outline-none transition-shadow duration-300 placeholder:text-[var(--ink-faint)] focus:shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light),0_0_0_2px_var(--accent)] disabled:opacity-60`}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="ct-message"
              className="mb-[10px] block font-[family-name:'JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.06em] text-[var(--ink-faint)]"
            >
              Message
            </label>
            <textarea
              id="ct-message"
              placeholder="What are you building?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={status === "sending"}
              className={`${PRESSED} min-h-[110px] w-full resize-none rounded-2xl border-none px-[18px] py-4 font-[family-name:var(--font-inter)]
                text-[0.95rem] text-[var(--ink)] outline-none transition-shadow duration-300 placeholder:text-[var(--ink-faint)] focus:shadow-[inset_7px_7px_14px_var(--shadow-dark),inset_-7px_-7px_14px_var(--shadow-light),0_0_0_2px_var(--accent)] disabled:opacity-60`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`${RAISED_SM} flex w-full items-center justify-center gap-[10px] rounded-2xl border-none px-[34px] py-[17px]
              font-[family-name:var(--font-space-grotesk)] text-[0.95rem] font-semibold
              transition-transform duration-150 hover:-translate-y-[2px] active:scale-[0.97]
              disabled:cursor-not-allowed disabled:hover:translate-y-0 ${buttonColor}`}
          >
            {buttonLabel}
          </button>

          {status === "error" && (
            <p
              role="alert"
              className="mt-3 animate-[fadeInUp_0.35s_ease-out] font-[family-name:'JetBrains_Mono'] text-[0.8rem] text-[var(--error)]"
            >
              {errorMsg || "Couldn't send that. Please try again."}
            </p>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}