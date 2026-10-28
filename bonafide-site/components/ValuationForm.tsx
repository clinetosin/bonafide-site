"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Camera, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/format";
import { SELL_CATEGORIES } from "@/lib/sell";


const SHOTS: Record<string, string[]> = {
  watches: ["Dial, straight on", "Caseback", "Clasp", "Box and papers"],
  jewellery: ["Whole piece", "Hallmark close-up", "Stones close-up", "Certificate or receipt"],
  bags: ["Front", "Date stamp or chip", "Hardware close-up", "Interior"],
  phones: ["Front, powered on", "Back", "Settings > About (IMEI)", "Battery health"],
  laptops: ["Open, powered on", "Lid", "About this Mac / system info", "Underside serial"],
  electronics: ["Front", "Back", "Serial label", "Box"],
  cars: ["Front three-quarter", "Rear three-quarter", "Dashboard with mileage", "VIN plate"],
  other: ["Front", "Back", "Any marks or serials", "Receipt"],
};

type Mode = "sell" | "pawn";

const STEPS = ["Item", "Photos", "Your details", "Offer"];

export default function ValuationForm({
  initialCategory,
  initialMode,
}: {
  initialCategory?: string;
  initialMode?: string;
}) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(
    SELL_CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory! : "watches",
  );
  const [mode, setMode] = useState<Mode>(initialMode === "pawn" ? "pawn" : "sell");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null, null]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const isCar = category === "cars";

  // Keep the visitor's progress on this device in case the connection drops.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bf-valuation");
      if (saved) {
        const s = JSON.parse(saved);
        if (s.fields) setFields(s.fields);
        if (!initialCategory && s.category) setCategory(s.category);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("bf-valuation", JSON.stringify({ fields, category }));
    } catch {}
  }, [fields, category]);

  const previews = useMemo(() => photos.map((f) => (f ? URL.createObjectURL(f) : null)), [photos]);
  useEffect(() => () => previews.forEach((p) => p && URL.revokeObjectURL(p)), [previews]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!fields.brand) e.brand = isCar ? "Enter the make, for example Toyota." : "Enter the brand, for example Rolex.";
      if (!fields.model) e.model = "Enter the model so we can price it.";
      if (isCar && !fields.mileage) e.mileage = "Enter the mileage shown on the dashboard.";
      if (!fields.condition) e.condition = "Choose the closest condition.";
    }
    if (step === 1 && photos.filter(Boolean).length < 2) {
      e.photos = "Add at least two photos. Four gets you a firmer offer.";
    }
    if (step === 2) {
      if (!fields.name) e.name = "Enter your name.";
      if (!/^\d{10}$/.test((fields.phone || "").replace(/\D/g, "").replace(/^0/, "")))
        e.phone = "Enter a 10-digit Nigerian number, for example 803 000 0000.";
      if (!fields.city) e.city = "Choose a city.";
      if (fields.owner !== "yes") e.owner = "Please confirm the item is yours to sell.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate()) return;
    if (step < 2) return setStep(step + 1);
    setBusy(true);
    const body = new FormData();
    body.set("category", category);
    body.set("mode", mode);
    Object.entries(fields).forEach(([k, v]) => body.set(k, v));
    photos.forEach((p, i) => p && body.append("photos", p, `slot-${i + 1}-${p.name}`));
    try {
      const res = await fetch("/api/valuation", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReference(data.reference);
      setStep(3);
      localStorage.removeItem("bf-valuation");
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "We couldn't send that. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <span className="error-text" id={`${k}-err`}>
        <AlertCircle size={16} strokeWidth={1.5} /> {errors[k]}
      </span>
    ) : null;

  return (
    <div className="form-card">
      <ol className="stepper" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} data-state={i < step ? "done" : i === step ? "current" : "todo"} aria-current={i === step ? "step" : undefined}>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="stack-5">
          <h2 className="h3">Tell us about the item</h2>
          <fieldset className="field">
            <legend>What would you like to do?</legend>
            <div className="radio-cards">
              <label className="radio-card">
                <input type="radio" name="mode" checked={mode === "sell"} onChange={() => setMode("sell")} />
                <b>Sell it</b>
                <small>A fixed offer, paid by transfer</small>
              </label>
              <label className="radio-card">
                <input type="radio" name="mode" checked={mode === "pawn"} onChange={() => setMode("pawn")} />
                <b>Pawn it</b>
                <small>Borrow against it, keep ownership</small>
              </label>
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="v-cat">Category</label>
            <select id="v-cat" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {SELL_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="v-brand">{isCar ? "Make" : "Brand"}</label>
            <input id="v-brand" className="input" value={fields.brand || ""} onChange={set("brand")} placeholder={isCar ? "Toyota" : "Rolex"} aria-describedby="brand-err" />
            {err("brand")}
          </div>
          <div className="field">
            <label htmlFor="v-model">Model</label>
            <input id="v-model" className="input" value={fields.model || ""} onChange={set("model")} placeholder={isCar ? "Land Cruiser 300 VX" : "Submariner Date"} aria-describedby="model-err" />
            {err("model")}
          </div>
          {isCar ? (
            <>
              <div className="radio-cards">
                <div className="field">
                  <label htmlFor="v-year">Year</label>
                  <input id="v-year" className="input" inputMode="numeric" value={fields.year || ""} onChange={set("year")} placeholder="2021" />
                </div>
                <div className="field">
                  <label htmlFor="v-mileage">Mileage (km)</label>
                  <input id="v-mileage" className="input" inputMode="numeric" value={fields.mileage || ""} onChange={set("mileage")} placeholder="45000" aria-describedby="mileage-err" />
                </div>
              </div>
              {err("mileage")}
              <div className="field">
                <label htmlFor="v-vin">VIN (optional)</label>
                <input id="v-vin" className="input input--mono" value={fields.reference || ""} onChange={set("reference")} placeholder="17 characters" />
                <span className="hint">On the dashboard by the windscreen, or the driver&rsquo;s door pillar.</span>
              </div>
              <fieldset className="field">
                <legend>Tokunbo or Nigerian-used?</legend>
                <div className="radio-cards">
                  {["Tokunbo", "Nigerian-used"].map((o) => (
                    <label key={o} className="radio-card">
                      <input type="radio" name="origin" checked={fields.origin === o} onChange={() => setFields((f) => ({ ...f, origin: o }))} />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="field">
                <legend>Customs papers</legend>
                <div className="radio-cards">
                  {["All papers", "Some", "None"].map((o) => (
                    <label key={o} className="radio-card">
                      <input type="radio" name="papers" checked={fields.papers === o} onChange={() => setFields((f) => ({ ...f, papers: o }))} />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          ) : (
            <>
              <div className="field">
                <label htmlFor="v-ref">Reference or serial (optional)</label>
                <input id="v-ref" className="input input--mono" value={fields.reference || ""} onChange={set("reference")} placeholder="126610LN" />
                <span className="hint">On the papers, the caseback, the inside of the bag or under Settings.</span>
              </div>
              <div className="field">
                <label htmlFor="v-year">Year bought (optional)</label>
                <input id="v-year" className="input" inputMode="numeric" value={fields.year || ""} onChange={set("year")} placeholder="2022" />
              </div>
              <fieldset className="field">
                <legend>Box and papers</legend>
                <div className="radio-cards">
                  {["Yes", "Some", "No"].map((o) => (
                    <label key={o} className="radio-card">
                      <input type="radio" name="papers" checked={fields.papers === o} onChange={() => setFields((f) => ({ ...f, papers: o }))} />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          <fieldset className="field" aria-describedby="condition-err">
            <legend>Condition</legend>
            <div className="radio-cards radio-cards--4">
              {["Unworn", "Excellent", "Good", "Signs of wear"].map((o) => (
                <label key={o} className="radio-card">
                  <input type="radio" name="condition" checked={fields.condition === o} onChange={() => setFields((f) => ({ ...f, condition: o }))} />
                  {o}
                </label>
              ))}
            </div>
            {err("condition")}
          </fieldset>
        </div>
      )}

      {step === 1 && (
        <div className="stack-5">
          <h2 className="h3">Add photos</h2>
          <p className="muted">
            Daylight, no filters. Our specialists use these to price it; nobody else sees them.
          </p>
          <div className="shot-list">
            {SHOTS[category].map((label, i) => (
              <label
                key={label}
                className="shot"
                data-filled={!!photos[i]}
                style={previews[i] ? { backgroundImage: `url(${previews[i]})` } : undefined}
              >
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotos((p) => p.map((x, j) => (j === i ? file : x)));
                  }}
                />
                <span>
                  <Camera size={18} strokeWidth={1.5} style={{ margin: "0 auto 6px" }} />
                  {label}
                </span>
              </label>
            ))}
          </div>
          {err("photos")}
          <div className="field">
            <label htmlFor="v-notes">Anything we should know? (optional)</label>
            <textarea id="v-notes" className="textarea" value={fields.notes || ""} onChange={set("notes")} placeholder="Service history, receipts, any marks" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="stack-5">
          <h2 className="h3">Your details</h2>
          <div className="field">
            <label htmlFor="v-name">Full name</label>
            <input id="v-name" className="input" autoComplete="name" value={fields.name || ""} onChange={set("name")} />
            {err("name")}
          </div>
          <div className="field">
            <label htmlFor="v-phone">WhatsApp number</label>
            <div className="prefix-input">
              <span>+234</span>
              <input id="v-phone" inputMode="tel" autoComplete="tel-national" value={fields.phone || ""} onChange={set("phone")} placeholder="803 000 0000" />
            </div>
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor="v-email">Email (optional)</label>
            <input id="v-email" className="input" type="email" autoComplete="email" value={fields.email || ""} onChange={set("email")} />
          </div>
          <div className="field">
            <label htmlFor="v-city">City</label>
            <select id="v-city" className="select" value={fields.city || ""} onChange={set("city")}>
              <option value="">Choose</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
              <option>Elsewhere in Nigeria</option>
              <option>Outside Nigeria</option>
            </select>
            {err("city")}
          </div>
          <fieldset className="field">
            <legend>How would you like to hand it over?</legend>
            <div className="stack-2">
              {[
                ["Showroom drop-off", "Lagos or Abuja, by appointment"],
                [isCar ? "Inspection at your location" : "Insured pickup", "Lagos or Abuja"],
                ["Video call first", "Talk to a specialist before deciding"],
              ].map(([o, d]) => (
                <label key={o} className="radio-card">
                  <input type="radio" name="handover" checked={fields.handover === o} onChange={() => setFields((f) => ({ ...f, handover: o }))} />
                  <b>{o}</b>
                  <small>{d}</small>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="checkbox">
            <input type="checkbox" checked={fields.owner === "yes"} onChange={(e) => setFields((f) => ({ ...f, owner: e.target.checked ? "yes" : "" }))} />
            <span className="small">
              This {isCar ? "car" : "item"} is mine to sell, and to my knowledge it is original and not
              stolen. I understand Bonafide checks ID and reports stolen goods.
            </span>
          </label>
          {err("owner")}
          {err("submit")}
        </div>
      )}

      {step === 3 && reference && (
        <div className="stack-5">
          <span className="eyebrow">Request received</span>
          <h2 className="h2">We&rsquo;ll be in touch on WhatsApp</h2>
          <p>
            Your reference is <span className="ref" style={{ color: "var(--ink)", fontSize: 15 }}>{reference}</span>
          </p>
          <ol className="numbered">
            <li>A specialist reviews your photos, usually within 2 working hours.</li>
            <li>We send a {mode === "pawn" ? "loan offer" : "price range"} on WhatsApp within 24 hours.</li>
            <li>If you accept, we arrange {isCar ? "an inspection" : "drop-off or insured pickup"}, then pay by bank transfer.</li>
          </ol>
          <a className="btn btn--primary" href={whatsappLink(`Hello Bonafide, my valuation reference is ${reference}.`)} target="_blank" rel="noopener noreferrer" style={{ justifySelf: "start" }}>
            <MessageCircle size={18} strokeWidth={1.5} /> Message us on WhatsApp
          </a>
        </div>
      )}

      {step < 3 && (
        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn--outline" onClick={() => setStep(step - 1)}>Back</button>
          ) : (
            <span />
          )}
          <button type="button" className="btn btn--primary" onClick={next} disabled={busy}>
            {step === 2 ? (busy ? "Sending…" : "Send for valuation") : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}
