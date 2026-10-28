import { ExternalLink } from "lucide-react";
import type { Manufacturer } from "@/lib/catalogue";

// Links to the maker's official page so buyers can compare the specification.
// Official imagery only appears here, and only with the brand's permission.
export default function ManufacturerRef({ m }: { m: Manufacturer }) {
  return (
    <section className="maker-ref" aria-labelledby="maker-title">
      <span className="eyebrow">Manufacturer reference</span>
      <h3 id="maker-title" className="h4">
        Compare with the official specification
      </h3>
      <dl>
        <dt>Brand</dt>
        <dd>{m.brand}</dd>
        <dt>Model</dt>
        <dd>{m.model}</dd>
        <dt>Reference</dt>
        <dd className="ref" style={{ color: "var(--ink)" }}>{m.reference}</dd>
      </dl>
      <a className="text-link" href={m.url} target="_blank" rel="noopener noreferrer">
        View on {m.brand}&rsquo;s official site <ExternalLink size={16} strokeWidth={1.5} />
      </a>
      <p className="small muted">
        Photos in the gallery are of this exact item, taken in our studio. Bonafide is not
        affiliated with {m.brand}.
      </p>
    </section>
  );
}
