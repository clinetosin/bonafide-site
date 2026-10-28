import { CheckCircle2 } from "lucide-react";
import type { Check } from "@/lib/catalogue";
import { formatDate } from "@/lib/format";
import VerifiedSeal from "./VerifiedSeal";

export default function CertificatePanel({
  title = "Authentication report",
  cert,
  inspected,
  checks,
}: {
  title?: string;
  cert: string;
  inspected: string;
  checks: Check[];
}) {
  return (
    <section className="cert-panel" aria-labelledby="cert-title">
      <header>
        <div className="stack-2">
          <span className="eyebrow">Bonafide certificate</span>
          <h2 id="cert-title" className="h2">{title}</h2>
          <span className="ref">
            {cert} · Inspected {formatDate(inspected)}
          </span>
        </div>
        <VerifiedSeal cert={cert} stamp />
      </header>
      <ul>
        {checks.map((c) => (
          <li key={c.label}>
            <CheckCircle2 size={20} strokeWidth={1.5} aria-label="Passed" />
            <div>
              <b style={{ fontWeight: 600 }}>{c.label}</b>
              <p className="small muted">{c.evidence}</p>
            </div>
          </li>
        ))}
      </ul>
      <footer>
        <span>Inspected by a Bonafide specialist, Lagos lab</span>
        <a className="text-link" href={`/verify?cert=${cert}`}>
          Check this certificate
        </a>
      </footer>
    </section>
  );
}
