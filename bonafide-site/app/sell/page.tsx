import Link from "next/link";
import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import ValuationForm from "@/components/ValuationForm";
import { SELL_CATEGORIES } from "@/lib/sell";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sell or pawn with certainty",
  description: "Free, no-obligation valuation for watches, jewellery, bags, phones, laptops and cars. Offer within 24 hours on WhatsApp.",
};

type Props = { searchParams: Promise<{ category?: string; mode?: string }> };

const faqs = [
  ["How do you value?", "A specialist compares your photos with recent sales of the same reference in Nigeria and abroad, then adjusts for condition and paperwork. The final offer follows a physical inspection."],
  ["How am I paid?", "By bank transfer to an account in your name, the same day you accept our offer after inspection."],
  ["What if I don't accept?", "Nothing happens. The valuation is free and there is no obligation. If your item is with us, we return it the same way it came."],
  ["Is my item insured with you?", "Yes. From the moment we take it, it is logged, sealed in front of you and insured until it is returned or sold."],
];

export default async function SellPage({ searchParams }: Props) {
  const { category, mode } = await searchParams;

  return (
    <>
      <section className="section section--intro">
        <div className="container stack-4" style={{ maxWidth: 1280 }}>
          <h1 className="h1">Sell or pawn with certainty</h1>
          <p className="lede">
            Send a few photos and get a free, no-obligation valuation from a specialist, not an
            algorithm.
          </p>
          <ul className="facts">
            <li><Check size={18} strokeWidth={1.5} /> Free, no-obligation valuation</li>
            <li><Check size={18} strokeWidth={1.5} /> Offer within 24 hours on WhatsApp</li>
            <li><Check size={18} strokeWidth={1.5} /> Paid by bank transfer the same day you accept</li>
          </ul>
          <div className="chips chips--scroll" aria-label="What we buy">
            {SELL_CATEGORIES.map((c) => (
              <Link key={c.id} className="chip" aria-current={category === c.id ? "page" : undefined} href={`/sell?category=${c.id}${mode ? `&mode=${mode}` : ""}`}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 64 }}>
        {mode === "request" && (
          <div className="notice notice--info" style={{ marginBottom: 24, maxWidth: 680 }}>
            <Info size={18} strokeWidth={1.5} />
            <span>
              Looking for a specific piece?{" "}
              <a className="text-link" href={whatsappLink("Hello Bonafide, I'm looking for a specific piece: ")}>
                Tell us on WhatsApp
              </a>{" "}
              and we&rsquo;ll source and authenticate it for you.
            </span>
          </div>
        )}
        <div className="sell-layout">
          <ValuationForm key={`${category}-${mode}`} initialCategory={category} initialMode={mode} />
          <aside className="sell-aside panel stack-4">
            <h2 className="h4">What happens next</h2>
            <ol className="numbered">
              <li>A specialist reviews your photos.</li>
              <li>You get a price range on WhatsApp within 24 hours.</li>
              <li>We inspect it at a showroom or on an insured pickup.</li>
              <li>You accept and are paid by transfer the same day.</li>
            </ol>
            <p className="small muted">Your photos are only seen by our specialists.</p>
          </aside>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container text-col faq">
          <h2 className="h2" style={{ marginBottom: 16 }}>Questions sellers ask</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
