import { CONTACT } from "./contact";
// Placeholder rate for the diaspora reference price. Replace with a daily rate feed.
export const NGN_PER_USD = 1550;

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });
const dollars = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatNaira(amount: number) {
  return `₦${naira.format(amount)}`;
}

export function formatUsd(amount: number) {
  // Round to the nearest $100 so the reference never looks like a quote.
  const usd = Math.round(amount / NGN_PER_USD / 100) * 100;
  return `≈ $${dollars.format(usd)}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatKm(km: number) {
  return `${naira.format(km)} km`;
}

export function whatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || CONTACT.phoneIntl;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
