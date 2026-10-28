"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Rotate3d, ScanSearch } from "lucide-react";
import type { ArtKind } from "@/lib/catalogue";
import type { Photo } from "@/lib/photos";
import ItemArt from "./ItemArt";

type Shot = { label: string; kind: "studio-front" | "studio-back" | "detail" | "inspection" };

const SHOTS: Shot[] = [
  { label: "Front", kind: "studio-front" },
  { label: "Back", kind: "studio-back" },
  { label: "Detail", kind: "detail" },
  { label: "Serial under loupe", kind: "inspection" },
  { label: "Movement / interior", kind: "inspection" },
];

export default function Gallery({
  art,
  tone,
  title,
  spinFrames,
  allowSpin = true,
  photo,
}: {
  allowSpin?: boolean;
  art: ArtKind;
  tone: string;
  title: string;
  /** Real 360° turntable frames (24 to 36 images) once photographed. */
  spinFrames?: string[];
  /** Illustrative photo of the model, shown as the front shot. */
  photo?: Photo;
}) {
  const [active, setActive] = useState(0);
  const [spin, setSpin] = useState(false);
  const shot = SHOTS[active];
  const showPhoto = !spin && photo && shot.kind === "studio-front";

  return (
    <div className="gallery">
      <div className={`gallery-main${art === "car" ? " gallery-main--wide" : ""}`}>
        {spin ? (
          <Spinner art={art} tone={tone} title={title} frames={spinFrames} />
        ) : (
          showPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="gallery-photo" src={photo.src} alt={photo.alt} />
          ) : (
            <StillView shot={shot} art={art} tone={tone} title={title} />
          )
        )}
        {allowSpin && <div className="gallery-tools">
          <button
            type="button"
            className="view-360-btn"
            aria-pressed={spin}
            onClick={() => setSpin((s) => !s)}
          >
            <Rotate3d size={16} strokeWidth={1.5} />
            {spin ? "Photos" : "360° view"}
          </button>
        </div>}
        {showPhoto && (
          <div className="gallery-caption gallery-caption--photo">
            <span>Illustrative photo of this model</span>
            <a href={photo.page} target="_blank" rel="noopener noreferrer">
              {photo.credit} / Unsplash
            </a>
          </div>
        )}
        {!spin && !showPhoto && (
          <div className="gallery-caption">
            <span className="ref" style={{ color: "var(--photo-ink)" }}>
              {shot.kind === "inspection" ? "INSPECTION · " : ""}
              {shot.label}
            </span>
            <span>Studio photos of this exact item to come</span>
          </div>
        )}
      </div>
      <div className="thumbs" role="tablist" aria-label="Photos">
        {SHOTS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            className="thumb"
            aria-current={!spin && i === active}
            aria-label={s.label}
            onClick={() => {
              setActive(i);
              setSpin(false);
            }}
          >
            {s.kind === "studio-front" && photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="thumb-photo" src={photo.src} alt="" loading="lazy" />
            ) : s.kind === "inspection" ? (
              <ScanSearch size={22} strokeWidth={1.5} color="#5d6461" />
            ) : (
              <ItemArt kind={art} tone={tone} side={s.kind === "studio-back" ? "back" : "front"} />
            )}
            {s.kind === "inspection" && <span className="mono-label">INSPECTION</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function StillView({ shot, art, tone, title }: { shot: Shot; art: ArtKind; tone: string; title: string }) {
  if (shot.kind === "inspection") {
    return (
      <div className="doc-photo" style={{ position: "absolute", inset: 0, aspectRatio: "auto", borderRadius: 0 }}>
        <ScanSearch strokeWidth={1} />
      </div>
    );
  }
  return (
    <div className="art-wrap">
      <ItemArt
        kind={art}
        tone={tone}
        side={shot.kind === "studio-back" ? "back" : "front"}
        title={`${title}, ${shot.label.toLowerCase()}`}
        className={shot.kind === "detail" ? "detail-zoom" : undefined}
      />
      {shot.kind === "detail" && (
        <style>{`.detail-zoom{transform:scale(2) translate(4%,6%)}`}</style>
      )}
    </div>
  );
}

// Drag to turn, pinch or use +/- to zoom. Until real turntable frames exist,
// the line art is rendered as a solid with front, back and edge layers.
function Spinner({ art, tone, title, frames }: { art: ArtKind; tone: string; title: string; frames?: string[] }) {
  const [angle, setAngle] = useState(-24);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; a: number } | null>(null);
  const touched = useRef(false);

  // A slow turn until the visitor takes over.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      if (!touched.current) setAngle((a) => a + (t - last) * 0.03);
      last = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    touched.current = true;
    drag.current = { x: e.clientX, a: angle };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setAngle(drag.current.a + (e.clientX - drag.current.x) * 0.6);
  };
  const onUp = () => (drag.current = null);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setAngle((a) => a - 15);
    if (e.key === "ArrowRight") setAngle((a) => a + 15);
    touched.current = true;
  };

  const norm = ((angle % 360) + 360) % 360;
  // Stacked silhouettes give the piece real thickness when seen edge-on.
  const layers = Array.from({ length: 15 }, (_, i) => (i - 7) * 2);

  return (
    <div
      className="art-wrap"
      style={{ cursor: drag.current ? "grabbing" : "grab", touchAction: "pan-y" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onWheel={(e) => setZoom((z) => Math.min(2.5, Math.max(1, z - e.deltaY * 0.002)))}
      onKeyDown={onKey}
      tabIndex={0}
      role="slider"
      aria-label={`${title}, 360 degree view`}
      aria-valuemin={0}
      aria-valuemax={359}
      aria-valuenow={Math.round(norm)}
    >
      {frames && frames.length > 0 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frames[Math.floor((norm / 360) * frames.length) % frames.length]}
          alt=""
          draggable={false}
          style={{ transform: `scale(${zoom})`, width: "100%" }}
        />
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            transformStyle: "preserve-3d",
            transform: `scale(${zoom}) rotateX(-8deg) rotateY(${angle}deg)`,
          }}
        >
          {layers.map((z) => (
            <div key={z} style={{ position: "absolute", inset: 0, transform: `translateZ(${z}px)` }}>
              <ItemArt kind={art} side="edge" />
            </div>
          ))}
          <div style={{ position: "absolute", inset: 0, transform: "translateZ(15px)", backfaceVisibility: "hidden" }}>
            <ItemArt kind={art} tone={tone} side="front" />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotateY(180deg) translateZ(15px)",
              backfaceVisibility: "hidden",
            }}
          >
            <ItemArt kind={art} tone={tone} side="back" />
          </div>
        </div>
      )}
      <div className="spin-track" aria-hidden>
        <i style={{ left: `calc(${(norm / 360) * 100}% - 4px)` }} />
      </div>
      <div className="gallery-caption">
        <span className="spin-hint">
          <Rotate3d size={14} strokeWidth={1.5} /> Drag to turn
        </span>
        <span className="row" style={{ gap: 6 }} onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" className="view-360-btn" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, z - 0.25))}>
            <Minus size={14} />
          </button>
          <button type="button" className="view-360-btn" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}>
            <Plus size={14} />
          </button>
        </span>
      </div>
    </div>
  );
}
