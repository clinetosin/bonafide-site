"use client";

import { useRef } from "react";

// Pointer-driven depth: the photo leans toward the cursor and a soft light
// follows it. Skipped on touch screens and for reduced-motion users.
export default function Tilt({ children, max = 7 }: { children: React.ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    const art = el.querySelector<HTMLElement>(".art");
    if (art) art.style.transform = `translate3d(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px, 0) scale(1.04)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const art = el.querySelector<HTMLElement>(".art");
    if (art) art.style.transform = "";
  }

  return (
    <div ref={ref} className="card-photo" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      <span className="sheen" />
    </div>
  );
}
