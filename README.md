# Bonafide Pawnshop: bonafidepawnshop.ng

First version of the site: Next.js 16 (App Router), Supabase and Paystack, built on the
Bonafide design system (obsidian green, brass for verification only, Bodoni Moda /
Hanken Grotesk / IBM Plex Mono).

## Pages

| Route | What it does |
| --- | --- |
| `/` | 3D hero (live Lagos time), categories, newly authenticated, authentication story, sell/pawn with pawn calculator, cars, certificate lookup, showrooms |
| `/shop`, `/shop/[category]` | Filterable grid (brand, price band, condition, box and papers, pawn eligible, location), mobile bottom sheet |
| `/item/[slug]` | Gallery with 360° viewer, buy box, reserve with deposit, certificate, manufacturer reference, condition |
| `/cars`, `/cars/[slug]` | Car listings with make/body/origin/transmission/price/year/mileage filters; inspection report, mileage history, customs status |
| `/sell` | Four-step valuation (Item, Photos, Details, Offer). `?category=cars` switches to the car flow, `?mode=pawn` preselects pawn |
| `/authentication` | Process timeline, checks by category, what we reject, guarantee, who checks |
| `/verify?cert=` | Public certificate lookup |

## The "4D" layer

- Hero scene with real depth (`translateZ` layers) that tilts to the pointer or phone motion and eases back on scroll; the watch keeps Lagos time.
- 360° viewer: drag, arrow keys, wheel or +/- to zoom. Pass real turntable frames (`spinFrames`) once photographed.
- Product cards lean toward the cursor with a soft light.
- Scroll-driven reveals and the brass progress line use CSS scroll timelines (no JS).
- Every route fades in; the seal "stamps" onto certificates.
- `prefers-reduced-motion` turns all of it off.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: runs on sample data without keys
npm run dev                  # http://localhost:3000
```

Without Supabase or Paystack keys the site runs in demo mode: listings come from
`lib/catalogue.ts`, reservations return a demo reference, valuations return a reference.

## Connect services

1. **Supabase**: create a project, run `supabase/schema.sql`, add the URL, anon key and service role key to `.env.local`.
2. **Paystack**: add `PAYSTACK_SECRET_KEY`; set the webhook URL to `https://bonafidepawnshop.ng/api/paystack/webhook`.
3. **Deploy**: import the repo into Vercel, add the same env vars, point `bonafidepawnshop.ng` at it.

## Placeholders to replace before launch

- All stock, prices, certificate numbers, VINs and dates in `lib/catalogue.ts`.
- Item art is line drawings; replace with studio photos of each actual item (and 360° frames).
- Lagos showroom address, hours, CAC RC number (header, footer). Phone, email and the Jabi address live in `lib/contact.ts`.
- Item photos: `lib/photos.ts` holds illustrative Unsplash photos of each model. Replace them with studio photos of the actual item.
- Guarantee terms, 24-hour payout, deposit amounts (₦500k items, ₦1m cars), pawn LTV 50% and ~6%/month fee.
- Manufacturer links: check each URL; official imagery only with brand permission.
