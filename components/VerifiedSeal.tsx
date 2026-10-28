import Link from "next/link";

export function SealMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6.5" strokeDasharray="1 1.6" />
      <path d="m8.8 12.2 2.2 2.2 4.2-4.6" />
    </svg>
  );
}

export default function VerifiedSeal({ cert, stamp = false }: { cert: string; stamp?: boolean }) {
  return (
    <Link href={`/verify?cert=${cert}`} className={`seal${stamp ? " seal--stamp" : ""}`}>
      <span className="seal-disc">
        <SealMark />
      </span>
      <span className="seal-text">
        <b>Bonafide verified</b>
        <span>{cert}</span>
      </span>
    </Link>
  );
}
