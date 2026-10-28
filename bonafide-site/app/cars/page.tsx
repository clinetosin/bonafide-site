import Link from "next/link";
import type { Metadata } from "next";
import { Car, FileSearch, Gauge, Wrench } from "lucide-react";
import CarBrowser from "@/components/CarBrowser";
import { cars } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Inspected cars",
  description: "Buy and sell inspected cars in Lagos and Abuja: VIN, customs papers and mileage history verified.",
};

export default function CarsPage() {
  return (
    <>
      <section className="section section--intro">
        <div className="container split" style={{ alignItems: "end" }}>
          <div className="stack-4">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span>/</span> <span>Cars</span>
            </nav>
            <h1 className="h1">Cars, inspected before they&rsquo;re listed</h1>
            <p className="lede">
              Tokunbo and Nigerian-used cars with the VIN matched on every plate, customs papers
              checked and mileage history traced. Inspected on a lift by our partner workshop.
            </p>
            <div className="row">
              <a href="#listings" className="btn btn--primary">Browse cars</a>
              <Link href="/sell?category=cars" className="btn btn--outline">Sell your car</Link>
            </div>
          </div>
          <div className="panel"><ul className="facts">
            <li><FileSearch size={18} strokeWidth={1.5} /> VIN matched on dashboard, door pillar and chassis</li>
            <li><Car size={18} strokeWidth={1.5} /> Customs duty papers verified for every tokunbo</li>
            <li><Gauge size={18} strokeWidth={1.5} /> Mileage traced through service and import records</li>
            <li><Wrench size={18} strokeWidth={1.5} /> Mechanical, flood and accident check on a lift</li>
          </ul></div>
        </div>
      </section>
      <section className="container" id="listings" style={{ paddingBottom: 96 }}>
        <CarBrowser cars={cars} />
      </section>
    </>
  );
}
