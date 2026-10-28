import type { Metadata } from "next";
import {
  Ban,
  ClipboardCheck,
  FileCheck2,
  Microscope,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import AuthTabs from "@/components/AuthTabs";
import VerifyForm from "@/components/VerifyForm";

export const metadata: Metadata = {
  title: "How we authenticate",
  description: "Every item is proven before it is listed: the five-stage Bonafide check, by category, and what we reject.",
};

const stages = [
  { Icon: PackageCheck, title: "Intake", what: "We log the item, photograph it from every side and seal it in a numbered bag in front of you.", checks: "ID of the seller, proof of ownership where available." },
  { Icon: Microscope, title: "Specialist inspection", what: "A category specialist examines it by hand with the right instruments.", checks: "Movements and timing, metal purity by XRF, stones, stitching, date codes, internal parts." },
  { Icon: ClipboardCheck, title: "Records check", what: "We check every identifier against the records we can reach.", checks: "Serials, IMEIs on the GSMA blacklist, VINs, warranty cards, dealer and service records, loss registers." },
  { Icon: FileCheck2, title: "Certificate issued", what: "A numbered certificate records each check and its evidence.", checks: "Published in our public lookup and printed on a card with a QR code." },
  { Icon: ShieldCheck, title: "Sealed and insured", what: "The item is stored in our vault, insured, until it is handed over.", checks: "Tamper-evident seal, insured transit, signed handover." },
];

const rejects = [
  { title: "Replicas and “super clones”", text: "However good. We return them to the seller and record the attempt." },
  { title: "Aftermarket parts sold as original", text: "Swapped dials, bezels, screens or diamonds set after the fact." },
  { title: "Stolen or blacklisted", text: "Items on loss registers and phones on IMEI blacklists. We report them to the police." },
  { title: "Cars without clean papers", text: "Missing customs papers, mismatched VINs or signs of flood damage." },
];

export default function AuthenticationPage() {
  return (
    <>
      <section className="section section--brand">
        <div className="container split" style={{ alignItems: "center" }}>
          <div className="stack-4">
            <span className="eyebrow">How we authenticate</span>
            <h1 className="h1">Every item is proven before it is listed</h1>
            <p className="lede">
              We do not sell anything we have not inspected ourselves. If we cannot prove an item
              is original, we do not buy it, list it or lend against it. Zero exceptions.
            </p>
          </div>
          <div className="parallax" style={{ justifySelf: "center", ["--drift-from" as string]: "24px", ["--drift-to" as string]: "-24px" }}>
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "1px solid var(--brass)",
                display: "grid",
                placeItems: "center",
                color: "var(--brass)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/bonafide-seal-reversed.svg" alt="" width={96} height={112} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The process</span>
              <h2 className="h2">Five stages, every item</h2>
            </div>
          </div>
          <div style={{ position: "relative" }}>
          <span className="timeline-progress" aria-hidden />
          <ol className="timeline">
            {stages.map(({ Icon, title, what, checks }, i) => (
              <li key={title} className="reveal">
                <span className="disc">{i + 1}</span>
                <div className="timeline-body">
                  <div className="doc-photo">
                    <Icon strokeWidth={1} />
                  </div>
                  <div className="stack-2">
                    <h3 className="h3">{title}</h3>
                    <p>{what}</p>
                    <p className="small muted">What we check: {checks}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">By category</span>
              <h2 className="h2">What we check, and with what</h2>
            </div>
          </div>
          <AuthTabs />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What we reject</span>
              <h2 className="h2">We turn these away</h2>
            </div>
          </div>
          <div className="reject-grid reveal-stagger">
            {rejects.map((r) => (
              <div key={r.title} className="reject">
                <Ban size={22} strokeWidth={1.5} />
                <h3 className="h4">{r.title}</h3>
                <p className="small muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container text-col stack-4">
          <span className="eyebrow">Public lookup</span>
          <h2 className="h2">Verify a certificate</h2>
          <p className="muted">Anyone can check a Bonafide certificate, with or without an account.</p>
          <VerifyForm />
        </div>
      </section>

      <section className="section" id="guarantee">
        <div className="container">
          <div className="panel text-col" style={{ borderColor: "var(--brass)" }}>
            <span className="eyebrow">The guarantee</span>
            <h2 className="h2">If it is ever proven not original, you get every naira back</h2>
            <ul className="checklist">
              <li><ShieldCheck size={18} strokeWidth={1.5} /> Applies to every item we sell, for as long as you own it.</li>
              <li><ShieldCheck size={18} strokeWidth={1.5} /> Proof from the manufacturer or an independent accredited lab is enough.</li>
              <li><ShieldCheck size={18} strokeWidth={1.5} /> We refund the full price paid, by bank transfer, within 7 days.</li>
            </ul>
            <p className="small muted">Placeholder terms: confirm with legal before launch.</p>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="who-checks">
        <div className="container split">
          <div className="stack-4">
            <span className="eyebrow">Who checks</span>
            <h2 className="h2">Specialists, named on every certificate</h2>
            <p className="muted">
              Watch, jewellery, bag and device specialists work from our Lagos lab. Cars are
              inspected by our partner workshop on a lift. Roles, experience and affiliations will
              be listed here once confirmed.
            </p>
          </div>
          <div className="stack-4">
            <span className="eyebrow">For pawn customers</span>
            <h3 className="h3">Your item stays yours</h3>
            <p className="muted">
              Pawned items are sealed in a bag carrying your reference and kept in an insured vault.
              Repay the loan and fee to collect it. Pawn opens once our Lagos State money-lending
              licence is issued.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
