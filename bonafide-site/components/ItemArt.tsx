import type { ArtKind } from "@/lib/catalogue";

// Line-art stand-ins for item photography. Each item gets real studio photos
// of the actual piece before launch; these keep the layout honest until then.

type Side = "front" | "back" | "edge";

const INK = "#5d6461";

export default function ItemArt({
  kind,
  tone = "#d9d6cf",
  side = "front",
  className,
  title,
  time,
}: {
  kind: ArtKind;
  tone?: string;
  side?: Side;
  className?: string;
  title?: string;
  /** Sets the watch hands; defaults to the classic 10:10. */
  time?: Date;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke={INK}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {draw(kind, tone, side, time)}
    </svg>
  );
}

function draw(kind: ArtKind, tone: string, side: Side, time?: Date) {
  if (side === "edge") return silhouette(kind);
  switch (kind) {
    case "watch":
      return side === "front" ? (
        <>
          <path d="M78 10h44l6 42H72z" fill="#e4e5df" />
          <path d="M72 148h56l-6 42H78z" fill="#e4e5df" />
          {[18, 26, 34, 42, 158, 166, 174, 182].map((y) => (
            <path key={y} d={`M${y < 100 ? 76 : 74} ${y}h${y < 100 ? 48 : 52}`} strokeWidth={0.8} />
          ))}
          <rect x="146" y="92" width="10" height="16" rx="2" fill="#e4e5df" />
          <circle cx="100" cy="100" r="54" fill="#e9eae5" />
          <circle cx="100" cy="100" r="47" fill="#1e2321" stroke="#1e2321" />
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i * Math.PI) / 30;
            const r1 = i % 5 === 0 ? 43 : 45;
            return (
              <line
                key={i}
                x1={100 + Math.sin(a) * r1}
                y1={100 - Math.cos(a) * r1}
                x2={100 + Math.sin(a) * 47}
                y2={100 - Math.cos(a) * 47}
                stroke="#cfd2cc"
                strokeWidth={i % 5 === 0 ? 1.4 : 0.6}
              />
            );
          })}
          <circle cx="100" cy="100" r="40" fill={tone} stroke={tone} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <circle
                key={i}
                cx={100 + Math.sin(a) * 33}
                cy={100 - Math.cos(a) * 33}
                r={i % 3 === 0 ? 3.2 : 2.4}
                fill="#f3f1ea"
                stroke="none"
              />
            );
          })}
          <rect x="124" y="96" width="9" height="8" fill="#fff" stroke="none" />
          <Hands time={time} />
          <circle cx="100" cy="100" r="2.5" fill="#f3f1ea" stroke="none" />
        </>
      ) : (
        <>
          <path d="M78 10h44l6 42H72z" fill="#e4e5df" />
          <path d="M72 148h56l-6 42H78z" fill="#e4e5df" />
          <rect x="44" y="92" width="10" height="16" rx="2" fill="#e4e5df" />
          <circle cx="100" cy="100" r="54" fill="#dcddd7" />
          <circle cx="100" cy="100" r="44" fill="#e9eae5" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI) / 12;
            return (
              <line
                key={i}
                x1={100 + Math.sin(a) * 44}
                y1={100 - Math.cos(a) * 44}
                x2={100 + Math.sin(a) * 50}
                y2={100 - Math.cos(a) * 50}
                strokeWidth={0.8}
              />
            );
          })}
          <circle cx="100" cy="100" r="30" strokeDasharray="2 3" />
          <text
            x="100"
            y="104"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="9"
            fill={INK}
            stroke="none"
          >
            SERIAL ···
          </text>
        </>
      );
    case "ring":
      return side === "front" ? (
        <>
          <ellipse cx="100" cy="122" rx="56" ry="54" fill="none" stroke={tone} strokeWidth={10} />
          <ellipse cx="100" cy="122" rx="56" ry="54" />
          <ellipse cx="100" cy="122" rx="46" ry="44" />
          <path d="M80 66 L100 34 L120 66 Z" fill="#eef1f4" />
          <path d="M80 66h40M90 66l10-32 10 32M84 56l32 0" strokeWidth={0.8} />
          <path d="M100 20v-8M86 26l-5-6M114 26l5-6" stroke="#a8803f" />
        </>
      ) : (
        <>
          <ellipse cx="100" cy="110" rx="62" ry="58" fill="none" stroke={tone} strokeWidth={10} />
          <ellipse cx="100" cy="110" rx="62" ry="58" />
          <ellipse cx="100" cy="110" rx="52" ry="48" />
          <text
            x="100"
            y="170"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="9"
            fill={INK}
            stroke="none"
          >
            750 · HALLMARK
          </text>
        </>
      );
    case "necklace":
      return (
        <>
          <path d="M40 24 C 40 120, 160 120, 160 24" />
          {Array.from({ length: 7 }).map((_, i) => {
            const t = (i + 1) / 8;
            const x = 40 + 120 * t;
            const y = 24 + 280 * t * (1 - t) * 0.95;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 -10 Q 8 -8 10 0 Q 8 8 0 10 Q -8 8 -10 0 Q -8 -8 0 -10Z" fill={tone} />
                <circle r="4" fill="#f4f2ec" />
              </g>
            );
          })}
          {side === "back" && (
            <text
              x="100"
              y="180"
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill={INK}
              stroke="none"
            >
              CLASP · SERIAL
            </text>
          )}
        </>
      );
    case "bag":
      return (
        <>
          <path d="M70 70 C 70 30, 130 30, 130 70" strokeWidth={4} stroke={tone} />
          <path d="M70 70 C 70 30, 130 30, 130 70" />
          <path d="M34 72h132l10 104H24z" fill={tone} />
          {side === "front" ? (
            <>
              <path d="M34 72l20 48h92l20-48" fill={tone} stroke={INK} />
              <rect x="88" y="112" width="24" height="18" rx="2" fill="#d6b87f" />
              <circle cx="100" cy="121" r="3" />
              <path d="M30 92h140" strokeDasharray="2 2" stroke="#ffffff55" />
            </>
          ) : (
            <>
              <path d="M30 100h140M28 130h144" strokeDasharray="2 2" stroke="#ffffff55" />
              <text
                x="100"
                y="160"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                fill="#ffffffaa"
                stroke="none"
              >
                DATE STAMP
              </text>
            </>
          )}
        </>
      );
    case "phone":
      return side === "front" ? (
        <>
          <rect x="58" y="12" width="84" height="176" rx="16" fill={tone} />
          <rect x="63" y="17" width="74" height="166" rx="12" fill="#151817" />
          <rect x="88" y="23" width="24" height="7" rx="3.5" fill="#000" stroke="none" />
          <text
            x="100"
            y="90"
            textAnchor="middle"
            fontFamily="Hanken Grotesk, sans-serif"
            fontSize="22"
            fill="#eef0ec"
            stroke="none"
          >
            9:41
          </text>
        </>
      ) : (
        <>
          <rect x="58" y="12" width="84" height="176" rx="16" fill={tone} />
          <rect x="68" y="22" width="40" height="40" rx="10" fill="#00000022" />
          <circle cx="80" cy="34" r="7" fill="#1b1d1c" />
          <circle cx="96" cy="34" r="7" fill="#1b1d1c" />
          <circle cx="80" cy="50" r="7" fill="#1b1d1c" />
          <path d="M92 100c4-6 12-6 16 0" />
        </>
      );
    case "laptop":
      return (
        <>
          <rect x="34" y="42" width="132" height="90" rx="6" fill={side === "front" ? "#151817" : tone} stroke={tone} strokeWidth={4} />
          <path d="M18 140h164l-8 12H26z" fill={tone} />
          {side === "front" && <path d="M86 140h28" stroke="#00000044" />}
        </>
      );
    case "car":
      return (
        <>
          <path
            d="M14 128 L22 104 Q 30 92 48 90 L 70 70 Q 80 62 100 62 L 132 62 Q 146 62 156 74 L 170 90 Q 186 94 188 108 L 188 128 Z"
            fill={tone}
          />
          <path d="M74 74 L 92 70 L 96 90 L 62 90 Z" fill="#cfd8dc" />
          <path d="M102 68 L 130 68 Q 140 70 148 88 L 104 90 Z" fill="#cfd8dc" />
          <circle cx="54" cy="130" r="18" fill="#1e2321" />
          <circle cx="54" cy="130" r="8" fill="#9aa09d" />
          <circle cx="150" cy="130" r="18" fill="#1e2321" />
          <circle cx="150" cy="130" r="8" fill="#9aa09d" />
          <path d="M10 150h180" strokeWidth={0.8} />
        </>
      );
  }
}

function silhouette(kind: ArtKind) {
  const fill = "#cfd1cb";
  switch (kind) {
    case "watch":
      return <circle cx="100" cy="100" r="54" fill={fill} stroke="none" />;
    case "ring":
      return <ellipse cx="100" cy="122" rx="60" ry="58" fill="none" stroke={fill} strokeWidth={12} />;
    case "phone":
      return <rect x="58" y="12" width="84" height="176" rx="16" fill={fill} stroke="none" />;
    case "bag":
      return <path d="M34 72h132l10 104H24z" fill={fill} stroke="none" />;
    case "laptop":
      return <rect x="34" y="42" width="132" height="90" rx="6" fill={fill} stroke="none" />;
    default:
      return null;
  }
}

function Hands({ time }: { time?: Date }) {
  const h = time ? time.getHours() % 12 : 10;
  const m = time ? time.getMinutes() : 10;
  const sec = time ? time.getSeconds() : 30;
  const hourAngle = (h + m / 60) * 30;
  const minuteAngle = (m + sec / 60) * 6;
  const secondAngle = sec * 6;
  return (
    <>
      <path d="M100 100 L100 78" stroke="#f3f1ea" strokeWidth={3.2} transform={`rotate(${hourAngle} 100 100)`} />
      <path d="M100 100 L100 66" stroke="#f3f1ea" strokeWidth={2.2} transform={`rotate(${minuteAngle} 100 100)`} />
      <path d="M100 110 L100 62" stroke="#a8803f" strokeWidth={1} transform={`rotate(${secondAngle} 100 100)`} />
    </>
  );
}
