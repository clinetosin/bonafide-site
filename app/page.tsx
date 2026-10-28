import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  Microscope,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Hero3D from "@/components/Hero3D";
import ProductCard from "@/components/ProductCard";
import CarCard from "@/components/CarCard";
import ItemArt from "@/components/ItemArt";
import PawnCalculator from "@/components/PawnCalculator";
import VerifyForm from "@/components/VerifyForm";
import { cars, categories, items, newestFirst } from "@/lib/catalogue";
import { CONTACT } from "@/lib/contact";

const steps = [
  { Icon: PackageCheck, title: "Intake", text: "Logged, photographed and sealed in front of you." },
  { Icon: Microscope, title: "Specialist inspection", text: "Movement, metal, stitching or parts examined by hand." },
  { Icon: ClipboardCheck, title: "Records check", text: "Serials, IMEIs and VINs checked against registers." },
  { Icon: FileCheck2, title: "Certificate issued", text: "A numbered certificate anyone can look up." },
  { Icon: ShieldCheck, title: "Sealed and insured", text: "Stored in our vault and insured until handover." },
];

export default function Home() {
  const newest = newestFirst(items).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="motto">Luxury Redefined</span>
              <span className="eyebrow">Lagos · Abuja · Ships nationwide</span>
              <h1 className="display">
                Only originals. <em className="serif-italic">Proven</em>, not promised.
              </h1>
              <p className="lede">
                Every watch, jewel, bag, device and car we sell is inspected in our lab and
                issued a numbered certificate you can check yourself.
              </p>
              <div className="hero-actions">
                <Link href="/shop" className="btn btn--primary btn--lg">
                  Shop verified pieces
                </Link>
                <Link href="/sell" className="btn btn--outline btn--lg">
                  Sell or pawn an item
                </Link>
              </div>
            </div>
            <Hero3D />
          </div>
          <div className="trust-bar reveal-stagger">
            <div>
              <BadgeCheck size={20} strokeWidth={1.5} />
              <span><b>Inspected in-house</b>No item listed without a certificate</span>
            </div>
            <div>
              <RotateCcw size={20} strokeWidth={1.5} />
              <span><b>Full refund guarantee</b>If it is ever proven not original</span>
            </div>
            <div>
              <Banknote size={20} strokeWidth={1.5} />
              <span><b>Paid within 24 hours</b>When you sell to us</span>
            </div>
            <div>
              <Truck size={20} strokeWidth={1.5} />
              <span><b>Insured delivery</b>Lagos, Abuja and nationwide</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Shop by category</h2>
            </div>
            <Link href="/shop" className="text-link">
              All categories
            </Link>
          </div>
          <div className="cat-scroller reveal-stagger">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="cat-card">
                <div className="well">
                  <ItemArt kind={c.art} />
                </div>
                <h3>{c.name}</h3>
                <p className="small muted">{c.intro}</p>
              </Link>
            ))}
            <Link href="/cars" className="cat-card">
              <div className="well">
                <ItemArt kind="car" tone="#e9e9e4" />
              </div>
              <h3>Cars</h3>
              <p className="small muted">VIN, customs papers and mileage history verified.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Inspected this week</span>
              <h2 className="h2">Newly authenticated</h2>
            </div>
          </div>
          <div className="grid-products grid-products--4 reveal-stagger">
            {newest.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="center mt-6">
            <Link href="/shop" className="btn btn--outline">
              View all verified pieces
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--brand">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The Bonafide check</span>
              <h2 className="h2">How authentication works</h2>
            </div>
            <Link href="/authentication" className="text-link hide-mobile">
              See every check we run <ArrowRight size={16} />
            </Link>
          </div>
          <div className="step-rail" aria-hidden />
          <ol className="steps reveal-stagger" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="step">
                <div className="step-photo">
                  <Icon strokeWidth={1} />
                </div>
                <div>
                  <span className="step-num">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/authentication" className="text-link mt-6 hide-desktop" style={{ display: "inline-flex" }}>
            See every check we run <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container split reveal-stagger">
          <div className="panel">
            <span className="eyebrow">Sell</span>
            <h2 className="h2">Sell for a fixed offer</h2>
            <ul className="facts">
              <li><CalendarClock size={18} strokeWidth={1.5} /> Offer on WhatsApp within 24 hours of your photos</li>
              <li><Banknote size={18} strokeWidth={1.5} /> Paid by bank transfer the day you accept</li>
              <li><Building2 size={18} strokeWidth={1.5} /> Drop off in Lagos or Abuja, or we collect, insured</li>
            </ul>
            <Link href="/sell" className="btn btn--primary" style={{ justifySelf: "start" }}>
              Get a free valuation
            </Link>
          </div>
          <div className="panel">
            <span className="eyebrow">Pawn</span>
            <h2 className="h2">Borrow against it, keep ownership</h2>
            <PawnCalculator />
            <Link href="/sell?mode=pawn" className="btn btn--secondary" style={{ justifySelf: "start" }}>
              Check how much you can borrow
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Inspected on a lift</span>
              <h2 className="h2">Cars, verified the same way</h2>
            </div>
            <Link href="/cars" className="text-link">
              All cars
            </Link>
          </div>
          <div className="grid-products grid-products--4 reveal-stagger">
            {cars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "center" }}>
          <div className="stack-4 reveal">
            <span className="eyebrow">Public lookup</span>
            <h2 className="h2">Verify a certificate</h2>
            <p className="lede">
              Bought from us, or from someone who did? Enter the number on the card or scan its
              QR code. No account needed.
            </p>
            <VerifyForm />
          </div>
          <div className="parallax" style={{ ["--drift-from" as string]: "30px", ["--drift-to" as string]: "-30px" }}>
            <div className="cert-card">
              <div className="row between">
                <span className="eyebrow">Bonafide certificate</span>
                <span className="seal-disc" style={{ width: 34, height: 34 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="m8.8 12.2 2.2 2.2 4.2-4.6" /><circle cx="12" cy="12" r="9" /></svg>
                </span>
              </div>
              <div className="stack-2">
                <span style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: "30px" }}>
                  Rolex Submariner Date
                </span>
                <span className="ref">BF-26-004187 · 14 Oct 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="showrooms">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Visit a showroom</h2>
            </div>
          </div>
          <div className="showrooms reveal-stagger">
            {[
              { city: "Abuja", addr: CONTACT.address },
              { city: "Lagos", addr: "Lagos showroom opening soon. Viewings by appointment." },
            ].map((s) => (
              <div key={s.city} className="showroom">
                <div className="ph">Showroom photo</div>
                <div className="body">
                  <h3 className="h3">{s.city}</h3>
                  <p className="muted">{s.addr}</p>
                  <p className="small muted">Mon to Sat, 10:00 to 18:00 · Viewings by appointment</p>
                  <a className="text-link" href={`https://wa.me/${CONTACT.phoneIntl}`}>
                    Book a visit
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="small muted mt-5">
            Specialists in watches, jewellery, bags and devices. Bonafide Tech Services Ltd, RC
            0000000.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container trust-cards reveal-stagger">
          <div className="trust-card">
            <Microscope size={24} strokeWidth={1.5} />
            <h3 className="h4">In-house inspection</h3>
            <p className="muted">
              Our own specialists check every item. We do not list on a seller&rsquo;s word.
            </p>
          </div>
          <div className="trust-card" id="guarantee">
            <RotateCcw size={24} strokeWidth={1.5} />
            <h3 className="h4">Full refund guarantee</h3>
            <p className="muted">
              If an item we sold is ever proven not original, we refund the full price.
            </p>
          </div>
          <div className="trust-card">
            <Truck size={24} strokeWidth={1.5} />
            <h3 className="h4">Insured delivery</h3>
            <p className="muted">Sealed, tracked and insured to your door, or collect in person.</p>
          </div>
        </div>
      </section>
    </>
  );
}
