import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import CarCard from "@/components/CarCard";
import CertificatePanel from "@/components/CertificatePanel";
import Gallery from "@/components/Gallery";
import ManufacturerRef from "@/components/ManufacturerRef";
import ReserveBox from "@/components/ReserveBox";
import VerifiedSeal from "@/components/VerifiedSeal";
import { cars, getCar } from "@/lib/catalogue";
import { formatDate, formatKm, formatNaira, formatUsd } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = getCar((await params).slug);
  if (!car) return {};
  return { title: `${car.year} ${car.make} ${car.model} ${car.trim}` };
}

export default async function CarPage({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const title = `${car.year} ${car.make} ${car.model} ${car.trim}`;
  const others = cars.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container stack-5">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/cars">Cars</Link>
          </nav>
          <div className="pdp">
            <Gallery art="car" tone={car.tone} title={title} allowSpin={false} />
            <div className="buy-box">
              <span className="eyebrow">{car.make} · {car.origin}</span>
              <h1 className="h2">{car.year} {car.model} {car.trim}</h1>
              <span className="ref">VIN {car.vin} · {formatKm(car.mileageKm)}</span>
              <div>
                <div className="price-lg">{formatNaira(car.price)}</div>
                <div className="small muted">{formatUsd(car.price)}</div>
              </div>
              <VerifiedSeal cert={car.cert} stamp />
              <dl className="fact-list">
                <div><dt>Mileage</dt><dd>{formatKm(car.mileageKm)}</dd></div>
                <div><dt>Transmission</dt><dd>{car.transmission}</dd></div>
                <div><dt>Fuel</dt><dd>{car.fuel}</dd></div>
                <div><dt>Body</dt><dd>{car.body}</dd></div>
                <div><dt>Colour</dt><dd>{car.colour}</dd></div>
                <div><dt>Location</dt><dd>{car.location}</dd></div>
              </dl>
              <ReserveBox slug={car.slug} kind="car" title={title} cert={car.cert} deposit={1_000_000} />
              <p className="small muted">
                Balance paid through escrow and released when the papers are transferred to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div className="stack-4 reveal">
            <h2 className="h3">Our inspector&rsquo;s note</h2>
            <p className="text-col">{car.note}</p>
            <div className="notice notice--info">
              <CheckCircle2 size={18} strokeWidth={1.5} />
              <span>{car.customs}</span>
            </div>
          </div>
          <div className="stack-4 reveal">
            <h2 className="h3">Mileage history</h2>
            <table className="spec-table">
              <tbody>
                {car.mileageHistory.map((m) => (
                  <tr key={m.date}>
                    <th scope="row">{formatDate(m.date)}<br /><span className="small">{m.source}</span></th>
                    <td>{formatKm(m.km)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-5" style={{ gap: 32 }}>
          <div className="reveal">
            <CertificatePanel title="Inspection report" cert={car.cert} inspected={car.inspected} checks={car.mechanical} />
          </div>
          <div className="reveal"><ManufacturerRef m={car.manufacturer} /></div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head"><div><h2 className="h2">More inspected cars</h2></div></div>
          <div className="grid-products">
            {others.map((c) => <CarCard key={c.slug} car={c} />)}
          </div>
        </div>
      </section>

      <div className="sticky-buy">
        <div>
          <div className="price" style={{ fontSize: 18 }}>{formatNaira(car.price)}</div>
          <div className="ref" style={{ fontSize: 11 }}>{car.cert}</div>
        </div>
        <a href="#reserve" className="btn btn--primary">Reserve</a>
      </div>
    </>
  );
}
