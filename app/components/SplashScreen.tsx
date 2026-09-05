"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Safety net: if the video can't play or never fires `onEnded`
    // (e.g. autoplay blocked, corrupt file), don't trap the user forever.
    const fallback = setTimeout(() => setIsExiting(true), 8000);
    return () => clearTimeout(fallback);
  }, []);

  const handleEnded = () => setIsExiting(true);

  const handleTransitionEnd = () => {
    if (isExiting) setIsDone(true);
  };

  if (isDone) return null;

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 z-[100] bg-black transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
        isExiting ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <video
        ref={videoRef}
        src="/logo-reveal.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="h-full w-full object-cover"
      />
    </div>
  );
}