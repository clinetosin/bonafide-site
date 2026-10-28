import crypto from "node:crypto";

// Human-friendly references, e.g. VAL-26-7F3K9Q
export function makeReference(prefix: string) {
  const yy = String(new Date().getFullYear()).slice(2);
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(6);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `${prefix}-${yy}-${code}`;
}
