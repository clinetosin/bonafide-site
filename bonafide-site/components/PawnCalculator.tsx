"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/format";

// Placeholder terms from the strategy: 50% loan-to-value, ~6% per month.
// Pawn launches only once the Lagos money-lending licence is in place.
const LTV = 0.5;
const MONTHLY_FEE = 0.06;

export default function PawnCalculator() {
  const [value, setValue] = useState(10_000_000);
  const loan = Math.round((value * LTV) / 10_000) * 10_000;
  const fee = Math.round(loan * MONTHLY_FEE);

  return (
    <div className="calc">
      <label htmlFor="pawn-value" className="small" style={{ fontWeight: 600 }}>
        Your item is worth about <span className="price" style={{ fontSize: 16 }}>{formatNaira(value)}</span>
      </label>
      <input
        id="pawn-value"
        type="range"
        min={500_000}
        max={50_000_000}
        step={250_000}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="calc-out">
        <div>
          <span className="small muted">You could borrow</span>
          <b>{formatNaira(loan)}</b>
        </div>
        <div>
          <span className="small muted">Monthly fee</span>
          <b>{formatNaira(fee)}</b>
        </div>
      </div>
      <p className="small muted">
        Indicative only. Final terms follow inspection. Pawn opens once our money-lending
        licence is issued.
      </p>
    </div>
  );
}
