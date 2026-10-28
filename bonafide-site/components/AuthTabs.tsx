"use client";

import { useState } from "react";
import { CheckCircle2, Wrench } from "lucide-react";

const TABS = [
  {
    id: "watches",
    label: "Watches",
    checks: ["Serial and reference matched to papers", "Caseback opened, calibre confirmed", "Timing across six positions", "Dial, hands and bezel originality", "Service and loss register records"],
    tools: "Timing machine, loupe, caseback tools, manufacturer records",
  },
  {
    id: "jewellery",
    label: "Jewellery",
    checks: ["Gold and platinum purity by XRF", "Natural diamond confirmed", "Lab report inscription matched", "Hallmarks and serials photographed"],
    tools: "XRF analyser, diamond tester, 40× microscope, scale",
  },
  {
    id: "bags",
    label: "Bags",
    checks: ["Stitch count and technique", "Date stamp, microchip or serial", "Hardware engravings", "Leather, lining and heat stamps"],
    tools: "UV lamp, NFC reader, macro camera, reference library",
  },
  {
    id: "devices",
    label: "Phones & laptops",
    checks: ["IMEI or serial not blacklisted", "Activation lock removed", "Genuine parts in service history", "Battery health measured"],
    tools: "GSMA IMEI register, manufacturer coverage check, diagnostics",
  },
  {
    id: "cars",
    label: "Cars",
    checks: ["VIN matched on every plate", "Customs papers verified", "Mileage traced through records", "OBD scan, flood and accident check"],
    tools: "Lift, OBD scanner, paint depth gauge, partner workshop",
  },
];

export default function AuthTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;
  return (
    <div>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            className="chip"
            aria-selected={t.id === active}
            aria-pressed={t.id === active}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="split" role="tabpanel" key={tab.id} style={{ animation: "rise 360ms var(--ease-standard)" }}>
        <ul className="checklist">
          {tab.checks.map((c) => (
            <li key={c}>
              <CheckCircle2 size={18} strokeWidth={1.5} /> {c}
            </li>
          ))}
        </ul>
        <div className="panel" style={{ background: "var(--canvas)" }}>
          <span className="row small" style={{ fontWeight: 600 }}>
            <Wrench size={18} strokeWidth={1.5} color="var(--brass)" /> Tools we use
          </span>
          <p className="muted">{tab.tools}</p>
        </div>
      </div>
    </div>
  );
}
