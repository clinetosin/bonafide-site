"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import type { Item } from "@/lib/catalogue";
import ProductCard from "./ProductCard";

const PRICE_BANDS = [
  { id: "u5", label: "Under ₦5m", min: 0, max: 5_000_000 },
  { id: "5-15", label: "₦5m to ₦15m", min: 5_000_000, max: 15_000_000 },
  { id: "15-40", label: "₦15m to ₦40m", min: 15_000_000, max: 40_000_000 },
  { id: "o40", label: "Over ₦40m", min: 40_000_000, max: Infinity },
];
const CONDITIONS = ["Unworn", "Excellent", "Good", "Signs of wear"] as const;
const PAGE = 24;

type Sort = "newest" | "price-asc" | "price-desc";

export default function ShopBrowser({ items }: { items: Item[] }) {
  const [brands, setBrands] = useState<string[]>([]);
  const [band, setBand] = useState<string | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [fullSet, setFullSet] = useState(false);
  const [pawn, setPawn] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("newest");
  const [shown, setShown] = useState(PAGE);
  const [sheet, setSheet] = useState(false);

  const brandCounts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.brand, (m.get(i.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  const results = useMemo(() => {
    const b = PRICE_BANDS.find((p) => p.id === band);
    const list = items.filter(
      (i) =>
        (!brands.length || brands.includes(i.brand)) &&
        (!b || (i.price >= b.min && i.price < b.max)) &&
        (!conditions.length || conditions.includes(i.condition)) &&
        (!fullSet || i.boxPapers === "Full set") &&
        (!pawn || i.pawnEligible) &&
        (!location || i.location === location),
    );
    return list.sort((a, b2) => {
      if (sort === "price-asc") return a.price - b2.price;
      if (sort === "price-desc") return b2.price - a.price;
      return b2.inspected.localeCompare(a.inspected);
    });
  }, [items, brands, band, conditions, fullSet, pawn, location, sort]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const clear = () => {
    setBrands([]);
    setBand(null);
    setConditions([]);
    setFullSet(false);
    setPawn(false);
    setLocation(null);
  };

  const applied: { label: string; remove: () => void }[] = [
    ...brands.map((b) => ({ label: b, remove: () => toggle(brands, setBrands, b) })),
    ...conditions.map((c) => ({ label: c, remove: () => toggle(conditions, setConditions, c) })),
    ...(band ? [{ label: PRICE_BANDS.find((p) => p.id === band)!.label, remove: () => setBand(null) }] : []),
    ...(fullSet ? [{ label: "Box and papers", remove: () => setFullSet(false) }] : []),
    ...(pawn ? [{ label: "Pawn eligible", remove: () => setPawn(false) }] : []),
    ...(location ? [{ label: location, remove: () => setLocation(null) }] : []),
  ];

  const visible = results.slice(0, shown);

  return (
    <div className="shop-layout">
      {sheet && <div className="drawer-scrim hide-desktop" onClick={() => setSheet(false)} />}
      <aside className={`filters${sheet ? " filters--open" : ""}`} aria-label="Filters">
        <div className="row between filters-close">
          <span className="h4">Filter and sort</span>
          <button className="icon-btn" aria-label="Close filters" onClick={() => setSheet(false)}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div className="filter-group">
          <h3>Brand</h3>
          {brandCounts.map(([b, n]) => (
            <label key={b} className="checkbox small">
              <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, setBrands, b)} />
              <span>
                {b} <span className="muted">({n})</span>
              </span>
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h3>Price</h3>
          <div className="chips">
            {PRICE_BANDS.map((p) => (
              <button key={p.id} type="button" className="chip" aria-pressed={band === p.id} onClick={() => setBand(band === p.id ? null : p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <h3>Condition</h3>
          {CONDITIONS.map((c) => (
            <label key={c} className="checkbox small">
              <input type="checkbox" checked={conditions.includes(c)} onChange={() => toggle(conditions, setConditions, c)} />
              <span>{c}</span>
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h3>Paperwork and pawn</h3>
          <label className="checkbox small">
            <input type="checkbox" checked={fullSet} onChange={() => setFullSet(!fullSet)} />
            <span>Box and papers</span>
          </label>
          <label className="checkbox small">
            <input type="checkbox" checked={pawn} onChange={() => setPawn(!pawn)} />
            <span>Pawn eligible</span>
          </label>
        </div>
        <div className="filter-group">
          <h3>Location</h3>
          <div className="chips">
            {["Lagos", "Abuja"].map((l) => (
              <button key={l} type="button" className="chip" aria-pressed={location === l} onClick={() => setLocation(location === l ? null : l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn--primary btn--block mt-4 hide-desktop" onClick={() => setSheet(false)}>
          Show {results.length} pieces
        </button>
      </aside>

      <div>
        <div className="toolbar">
          <span className="small muted">
            {results.length} verified piece{results.length === 1 ? "" : "s"}
          </span>
          <div className="row">
            <button className="btn btn--outline filter-btn" style={{ minHeight: 40 }} onClick={() => setSheet(true)}>
              <SlidersHorizontal size={16} strokeWidth={1.5} /> Filter
            </button>
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="newest">Newest inspected</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </div>
        </div>
        {applied.length > 0 && (
          <div className="chips" style={{ marginBottom: 24 }}>
            {applied.map((a) => (
              <button key={a.label} className="chip" aria-pressed="true" onClick={a.remove}>
                {a.label} <X size={14} />
              </button>
            ))}
            <button className="chip" onClick={clear}>Clear all</button>
          </div>
        )}
        {results.length === 0 ? (
          <div className="empty">
            <SearchX size={32} strokeWidth={1.5} />
            <p className="h4">No verified pieces match these filters yet</p>
            <div className="row">
              <button className="btn btn--outline" onClick={clear}>Clear filters</button>
              <Link className="btn btn--secondary" href="/sell?mode=request">Request a piece</Link>
            </div>
          </div>
        ) : (
          <div className="grid-products">
            {visible.map((item, i) => (
              <GridEntry key={item.slug} index={i} item={item} />
            ))}
          </div>
        )}
        {shown < results.length && (
          <div className="center mt-6 stack-2" style={{ justifyItems: "center" }}>
            <span className="small muted">Showing {shown} of {results.length}</span>
            <button className="btn btn--outline" onClick={() => setShown(shown + PAGE)}>Load {PAGE} more</button>
          </div>
        )}
      </div>
    </div>
  );
}

function GridEntry({ item, index }: { item: Item; index: number }) {
  return (
    <>
      <ProductCard item={item} />
      {index === 8 && (
        <div className="sourcing">
          <div className="stack-2">
            <span className="h4">Can&rsquo;t find it?</span>
            <span className="small">Tell us what you&rsquo;re looking for and we&rsquo;ll source a verified one.</span>
          </div>
          <Link className="btn btn--primary" href="/sell?mode=request">Request a piece</Link>
        </div>
      )}
    </>
  );
}
