"use client";

import { useEffect, useRef, useState } from "react";
import ItemArt from "./ItemArt";
import { SealMark } from "./VerifiedSeal";

// The homepage "4D" moment: a layered scene with real depth (translateZ),
// tilting toward the pointer or the phone's motion, easing back as you
// scroll, and a watch that keeps Lagos time.
export default function Hero3D() {
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const tick = () =>
      setNow(new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = stage.current;
    const sc = scene.current;
    if (!el || !sc) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let scroll = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      sc.style.transform = `rotateX(${ty * 10 + scroll * 14}deg) rotateY(${tx * 14}deg) translateZ(${-scroll * 60}px)`;
      el.style.setProperty("--gx", `${50 + tx * 40}%`);
      el.style.setProperty("--gy", `${40 + ty * 40}%`);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = 0.5 - (e.clientY - r.top) / r.height;
      queue();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      queue();
    };
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      scroll = Math.min(1, Math.max(0, -r.top / r.height));
      queue();
    };
    const onTiltDevice = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-0.5, Math.min(0.5, e.gamma / 40));
      ty = Math.max(-0.5, Math.min(0.5, (45 - e.beta) / 60));
      queue();
    };

    el.addEventListener("pointermove", onPointer);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("deviceorientation", onTiltDevice);
    return () => {
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onTiltDevice);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-stage" ref={stage} aria-label="Featured: Rolex Submariner Date, certificate BF-26-004187" role="img">
      <div className="hero-glow" />
      <div className="hero-scene" ref={scene}>
        <div className="hero-layer hero-watch" style={{ transform: "translateZ(60px)" }}>
          <ItemArt kind="watch" tone="#1c2a2a" time={now} />
        </div>
        <div className="hero-layer hero-seal-layer" style={{ transform: "translateZ(140px)" }}>
          <span className="seal" style={{ background: "var(--surface)" }}>
            <span className="seal-disc" style={{ animation: "stamp 400ms var(--ease-standard) 600ms both" }}>
              <SealMark />
            </span>
            <span className="seal-text">
              <b>Bonafide verified</b>
              <span>BF-26-004187</span>
            </span>
          </span>
        </div>
        <div className="hero-layer hero-cert" style={{ transform: "translateZ(110px)" }}>
          <span className="eyebrow">Certificate</span>
          <span className="h4">Rolex Submariner Date</span>
          <span className="ref">Ref. 126610LN · Cal. 3235</span>
          <span className="ref">Serial matched · Timing +2 s/day</span>
        </div>
        <div className="hero-layer hero-time" style={{ transform: "translateZ(20px)" }}>
          LAGOS{" "}
          {now
            ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
            : "--:--:--"}
        </div>
      </div>
    </div>
  );
}
