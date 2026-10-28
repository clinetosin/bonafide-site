import { NextResponse } from "next/server";
import { getCar, getItem } from "@/lib/catalogue";
import { initializeTransaction, paystackConfigured } from "@/lib/paystack";
import { makeReference } from "@/lib/reference";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { slug, kind, email, phone } = body ?? {};
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof phone !== "string" || !/^\+234\d{10}$/.test(phone.replace(/\s/g, ""))) {
    return NextResponse.json({ error: "Enter a 10-digit Nigerian WhatsApp number." }, { status: 400 });
  }

  // Deposit is decided on the server, never trusted from the browser.
  const item = kind === "car" ? undefined : getItem(slug);
  const car = kind === "car" ? getCar(slug) : undefined;
  if (!item && !car) return NextResponse.json({ error: "We couldn't find that listing." }, { status: 404 });
  const price = item?.price ?? car!.price;
  const deposit = car ? 1_000_000 : Math.min(500_000, Math.round((price * 0.05) / 10_000) * 10_000);
  const title = item ? `${item.brand} ${item.name}` : `${car!.year} ${car!.make} ${car!.model}`;
  const reference = makeReference("RSV");

  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from("reservations").insert({
      reference,
      listing_slug: slug,
      listing_kind: kind === "car" ? "car" : "item",
      email,
      phone: phone.replace(/\s/g, ""),
      deposit_naira: deposit,
      status: "pending",
    });
    if (error) return NextResponse.json({ error: "Could not save the reservation." }, { status: 500 });
  }

  if (!paystackConfigured()) {
    return NextResponse.json({
      reference,
      message: `Demo mode: Paystack isn't connected yet. Reference ${reference} would open checkout for the deposit.`,
    });
  }

  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const tx = await initializeTransaction({
      email,
      amountNaira: deposit,
      reference,
      callbackUrl: `${site}/${kind === "car" ? "cars" : "item"}/${slug}?reserved=${reference}`,
      metadata: { slug, kind, title, phone },
    });
    return NextResponse.json({ reference, authorizationUrl: tx.authorization_url });
  } catch {
    return NextResponse.json({ error: "Payment could not be started. Please try again." }, { status: 502 });
  }
}
