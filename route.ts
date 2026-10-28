import { NextResponse } from "next/server";
import { makeReference } from "@/lib/reference";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_PHOTOS = 8;
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_MEDIA = 10;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const TEXT_FIELDS = [
  "category", "mode", "brand", "model", "reference", "year", "mileage", "origin", "papers",
  "condition", "notes", "name", "phone", "email", "city", "handover",
] as const;

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "We couldn't read that form." }, { status: 400 });

  const data: Record<string, string> = {};
  for (const k of TEXT_FIELDS) {
    const v = form.get(k);
    if (typeof v === "string" && v.trim()) data[k] = v.trim().slice(0, 2000);
  }
  if (!data.brand || !data.model || !data.name || !data.phone) {
    return NextResponse.json({ error: "Some required details are missing." }, { status: 400 });
  }

  const photos = form
    .getAll("photos")
    .filter((p): p is File => p instanceof File && p.type.startsWith("image/") && p.size <= MAX_BYTES)
    .slice(0, MAX_PHOTOS);

  // Extra photos and videos from the "Upload photos or videos" button.
  const media = form
    .getAll("media")
    .filter(
      (m): m is File =>
        m instanceof File &&
        ((m.type.startsWith("image/") && m.size <= MAX_BYTES) ||
          (m.type.startsWith("video/") && m.size <= MAX_VIDEO_BYTES)),
    )
    .slice(0, MAX_MEDIA);

  const reference = makeReference("VAL");
  const db = supabaseAdmin();

  if (db) {
    const paths: string[] = [];
    for (const [i, photo] of [...photos, ...media].entries()) {
      const ext = photo.type.split("/")[1] || "jpg";
      const path = `${reference}/${i + 1}.${ext}`;
      const { error } = await db.storage.from("valuation-photos").upload(path, photo, { contentType: photo.type });
      if (!error) paths.push(path);
    }
    const { error } = await db.from("valuation_requests").insert({
      reference,
      category: data.category,
      mode: data.mode === "pawn" ? "pawn" : "sell",
      details: data,
      photo_paths: paths,
      phone: `+234${data.phone.replace(/\D/g, "").replace(/^0/, "")}`,
      status: "new",
    });
    if (error) return NextResponse.json({ error: "We couldn't save your request. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ reference });
}
