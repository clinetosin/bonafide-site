import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paystack";
import { supabaseAdmin } from "@/lib/supabase";

// Paystack calls this after a payment. Set the URL in the Paystack dashboard.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyWebhookSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  const event = JSON.parse(raw);
  if (event.event === "charge.success") {
    const db = supabaseAdmin();
    await db
      ?.from("reservations")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("reference", event.data.reference);
  }
  return NextResponse.json({ ok: true });
}
