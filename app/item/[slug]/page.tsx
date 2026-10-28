import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import CertificatePanel from "@/components/CertificatePanel";
import Gallery from "@/components/Gallery";
import ManufacturerRef from "@/components/ManufacturerRef";
import ProductCard from "@/components/ProductCard";
import ReserveBox from "@/components/ReserveBox";
import VerifiedSeal from "@/components/VerifiedSeal";
import { getCategory, getItem, items } from "@/lib/catalogue";
import { formatDate, formatNaira, formatUsd } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

// Placeholder: ₦500,000 or 5% of the price, whichever is lower.
const depositFor = (price: number) => Math.min(500_000, Math.round(price * 0.05 / 10_000) * 10_000);

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getItem((await params).slug);
  if (!item) return {};
  return {
    title: `${item.brand} ${item.name}`,
    description: `${item.refLine}. Inspected ${formatDate(item.inspected)}, certificate ${item.cert}.`,
  };
}

const CONDITION_SCALE = ["Signs of wear", "Good", "Excellent", "Unworn"] as const;

export default async function ItemPage({ params }: Props) {
  const item = getItem((await params).slug);
  if (!item) notFound();
  const category = getCategory(item.category)!;
  const related = items.filter((i) => i.slug !== item.slug && (i.category === item.category)).slice(0, 4);
  const title = `${item.brand} ${item.name}`;
  const deposit = depositFor(item.price);

  return (
    <>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container stack-5">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/shop">Shop</Link> <span>/</span>
            <Link href={`/shop/${category.slug}`}>{category.name}</Link>
          </nav>
          <div className="pdp">
            <Gallery art={item.art} tone={item.tone} title={title} />
            <div className="buy-box">
              <span className="eyebrow">{item.brand}</span>
              <h1 className="h2">{item.name}</h1>
              <span className="ref">{item.refLine}</span>
              <div>
                <div className="price-lg">{formatNaira(item.price)}</div>
                <div className="small muted">{formatUsd(item.price)}</div>
              </div>
              <VerifiedSeal cert={item.cert} stamp />
              <dl className="fact-list">
                <div><dt>Condition</dt><dd>{item.condition}</dd></div>
                <div><dt>Box and papers</dt><dd>{item.boxPapers}</dd></div>
                <div><dt>Year</dt><dd>{item.year}</dd></div>
                <div><dt>Location</dt><dd>{item.location} showroom</dd></div>
              </dl>
              <ReserveBox slug={item.slug} kind="item" title={title} cert={item.cert} deposit={deposit} />
              <div className="promises">
                <div><CheckCircle2 size={16} strokeWidth={1.5} /> Full refund if ever proven not original</div>
                <div><CheckCircle2 size={16} strokeWidth={1.5} /> Insured delivery or collect in person</div>
                <div><CheckCircle2 size={16} strokeWidth={1.5} /> Inspected {formatDate(item.inspected)}</div>
              </div>
              <p className="small muted">Pay by bank transfer or card via Paystack.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div className="stack-4 reveal">
            <h2 className="h3">Our specialist&rsquo;s note</h2>
            <p className="text-col">{item.note}</p>
            {item.boxPapers !== "Full set" && (
              <p className="small muted">Not a full set: {item.boxPapers.toLowerCase()}. Priced accordingly.</p>
            )}
          </div>
          <div className="reveal">
            <h2 className="h3" style={{ marginBottom: 8 }}>Specification</h2>
            <table className="spec-table">
              <tbody>
                {item.specs.map(([k, v]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-6" style={{ gap: 32 }}>
          <div className="reveal"><CertificatePanel cert={item.cert} inspected={item.inspected} checks={item.checks} /></div>
          <div className="reveal"><ManufacturerRef m={item.manufacturer} /></div>
          <div className="stack-4 reveal" style={{ maxWidth: 760 }}>
            <h2 className="h3">Condition</h2>
            <div className="condition-scale">
              {CONDITION_SCALE.map((c) => (
                <div key={c} data-active={c === item.condition}>{c}</div>
              ))}
            </div>
            <ul className="checklist">
              {item.wear.map((w) => (
                <li key={w}><CheckCircle2 size={16} strokeWidth={1.5} /> {w}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container three-col reveal-stagger">
          <div className="stack-2">
            <h2 className="h4">Delivery</h2>
            <p className="small muted">Sealed, tracked and insured. Lagos and Abuja within 48 hours; elsewhere by arrangement.</p>
          </div>
          <div className="stack-2">
            <h2 className="h4">Viewing</h2>
            <p className="small muted">See it at our {item.location} showroom by appointment, or on a live video call.</p>
          </div>
          <div className="stack-2">
            <h2 className="h4">Returns</h2>
            <p className="small muted">Full refund if the item is ever proven not original. Other returns per our terms.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head"><div><h2 className="h2">You may also like</h2></div></div>
            <div className="grid-products grid-products--4">
              {related.map((r) => <ProductCard key={r.slug} item={r} />)}
            </div>
          </div>
        </section>
      )}

      <div className="sticky-buy">
        <div>
          <div className="price" style={{ fontSize: 18 }}>{formatNaira(item.price)}</div>
          <div className="ref" style={{ fontSize: 11 }}>{item.cert}</div>
        </div>
        <a href="#reserve" className="btn btn--primary">Reserve</a>
      </div>
    </>
  );
}
