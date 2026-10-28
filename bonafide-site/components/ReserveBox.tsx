"use client";

import { useState } from "react";
import { Lock, MessageCircle } from "lucide-react";
import { formatNaira, whatsappLink } from "@/lib/format";

export default function ReserveBox({
  slug,
  kind,
  title,
  cert,
  deposit,
}: {
  slug: string;
  kind: "item" | "car";
  title: string;
  cert: string;
  deposit: number;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "error">("idle");
  const [message, setMessage] = useState("");

  async function reserve(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setMessage("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, kind, email, phone: `+234${phone.replace(/^0/, "")}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }
      setState("idle");
      setMessage(data.message);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const wa = whatsappLink(`Hello Bonafide, I'm interested in the ${title} (certificate ${cert}).`);

  return (
    <div className="stack-3" id="reserve">
      {!open ? (
        <button className="btn btn--primary btn--lg btn--block" onClick={() => setOpen(true)}>
          Reserve with a {formatNaira(deposit)} deposit
        </button>
      ) : (
        <form className="panel" style={{ padding: 16 }} onSubmit={reserve}>
          <p className="small">
            We hold the item for 72 hours while a specialist arranges payment of the balance and
            delivery. The deposit is refunded in full if you change your mind.
          </p>
          <div className="field">
            <label htmlFor="r-email">Email for your receipt</label>
            <input id="r-email" className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="r-phone">WhatsApp number</label>
            <div className="prefix-input">
              <span>+234</span>
              <input id="r-phone" inputMode="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel-national" placeholder="803 000 0000" />
            </div>
          </div>
          <button className="btn btn--primary btn--block" disabled={state === "busy"}>
            <Lock size={16} strokeWidth={1.5} />
            {state === "busy" ? "Opening Paystack…" : `Pay ${formatNaira(deposit)} deposit`}
          </button>
          {message && (
            <p className={state === "error" ? "error-text" : "small"} role="status">
              {message}
            </p>
          )}
        </form>
      )}
      <a className="btn btn--outline btn--block" href={wa} target="_blank" rel="noopener noreferrer">
        Book a viewing
      </a>
      <a className="text-link" href={wa} target="_blank" rel="noopener noreferrer" style={{ justifySelf: "start" }}>
        <MessageCircle size={16} strokeWidth={1.5} /> Ask a specialist on WhatsApp
      </a>
    </div>
  );
}
