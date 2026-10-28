"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { Car } from "@/lib/catalogue";
import CarCard from "./CarCard";

type Sort = "newest" | "price-asc" | "price-desc" | "mileage";

export default function CarBrowser({ cars }: { cars: Car[] }) {
  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");
  const [transmission, setTransmission] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort(), [cars]);

  const results = useMemo(() => {
    const list = cars.filter(
      (c) =>
        (!make || c.make === make) &&
        (!body || c.body === body) &&
        (!origin || c.origin === origin) &&
        (!location || c.location === location) &&
        (!transmission || c.transmission === transmission) &&
        (!maxPrice || c.price <= Number(maxPrice) * 1_000_000) &&
        (!minYear || c.year >= Number(minYear)) &&
        (!maxKm || c.mileageKm <= Number(maxKm)),
    );
    return list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "mileage") return a.mileageKm - b.mileageKm;
      return b.inspected.localeCompare(a.inspected);
    });
  }, [cars, make, body, origin, location, transmission, maxPrice, minYear, maxKm, sort]);

  const select = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void,
    options: (string | [string, string])[],
  ) => (
    <div className="field">
      <label htmlFor={id} className="small">{label}</label>
      <select id={id} className="select" value={value} onChange={(e) => set(e.target.value)}>
        <option value="">Any</option>
        {options.map((o) => {
          const [v, l] = Array.isArray(o) ? o : [o, o];
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </div>
  );

  return (
    <div className="stack-5">
      <div className="panel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {select("make", "Make", make, setMake, makes)}
        {select("body", "Body type", body, setBody, ["SUV", "Saloon", "Coupé", "Pickup"])}
        {select("origin", "Origin", origin, setOrigin, ["Tokunbo", "Nigerian-used"])}
        {select("trans", "Transmission", transmission, setTransmission, ["Automatic", "Manual"])}
        {select("loc", "Location", location, setLocation, ["Lagos", "Abuja"])}
        {select("price", "Max price", maxPrice, setMaxPrice, [["40", "₦40m"], ["80", "₦80m"], ["120", "₦120m"], ["200", "₦200m"]])}
        {select("year", "From year", minYear, setMinYear, ["2018", "2020", "2022", "2024"])}
        {select("km", "Max mileage", maxKm, setMaxKm, [["20000", "20,000 km"], ["50000", "50,000 km"], ["100000", "100,000 km"]])}
      </div>
      <div className="toolbar" style={{ marginBottom: 0 }}>
        <span className="small muted">{results.length} inspected car{results.length === 1 ? "" : "s"}</span>
        <label className="sr-only" htmlFor="car-sort">Sort</label>
        <select id="car-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="newest">Newest inspected</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="mileage">Lowest mileage</option>
        </select>
      </div>
      {results.length ? (
        <div className="grid-products grid-products--4">
          {results.map((c) => <CarCard key={c.slug} car={c} />)}
        </div>
      ) : (
        <div className="empty">
          <SearchX size={32} strokeWidth={1.5} />
          <p className="h4">No inspected cars match yet</p>
          <p className="small muted">Tell us what you want and we&rsquo;ll source and inspect one.</p>
        </div>
      )}
    </div>
  );
}
