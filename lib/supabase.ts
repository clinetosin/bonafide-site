import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client using the service role key. Returns null until the
// environment is configured, so the site runs on sample data in the meantime.
let admin: SupabaseClient | null | undefined;

export function supabaseAdmin(): SupabaseClient | null {
  if (admin !== undefined) return admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  admin = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return admin;
}
