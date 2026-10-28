// Sample catalogue used until Supabase is connected. Every price, reference,
// certificate number and date here is a placeholder, not real stock.

export type CategorySlug = "watches" | "jewellery" | "bags" | "electronics";

export type ArtKind = "watch" | "ring" | "necklace" | "bag" | "phone" | "laptop" | "car";

export type Check = { label: string; evidence: string };

export type Manufacturer = {
  brand: string;
  model: string;
  reference: string;
  url: string;
};

export type Item = {
  slug: string;
  category: CategorySlug;
  brand: string;
  name: string;
  refLine: string;
  year: number;
  price: number;
  condition: "Unworn" | "Excellent" | "Good" | "Signs of wear";
  boxPapers: "Full set" | "Box only" | "Papers only" | "None";
  location: "Lagos" | "Abuja";
  cert: string;
  inspected: string;
  pawnEligible: boolean;
  art: ArtKind;
  tone: string;
  note: string;
  specs: [string, string][];
  checks: Check[];
  wear: string[];
  manufacturer: Manufacturer;
  sold?: boolean;
};

export type Car = {
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileageKm: number;
  body: "SUV" | "Saloon" | "Coupé" | "Pickup";
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  origin: "Tokunbo" | "Nigerian-used";
  location: "Lagos" | "Abuja";
  vin: string;
  cert: string;
  inspected: string;
  colour: string;
  tone: string;
  note: string;
  customs: string;
  mileageHistory: { date: string; km: number; source: string }[];
  mechanical: Check[];
  manufacturer: Manufacturer;
};

export const categories: {
  slug: CategorySlug;
  name: string;
  intro: string;
  art: ArtKind;
}[] = [
  {
    slug: "watches",
    name: "Watches",
    intro: "Movement, serial and papers checked against manufacturer records.",
    art: "watch",
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    intro: "Gold assayed by XRF, stones tested, hallmarks photographed.",
    art: "ring",
  },
  {
    slug: "bags",
    name: "Bags",
    intro: "Stitching, hardware, date codes and leather examined by hand.",
    art: "bag",
  },
  {
    slug: "electronics",
    name: "Phones & laptops",
    intro: "IMEI and serial cleared, battery health measured, parts verified.",
    art: "phone",
  },
];

export const items: Item[] = [
  {
    slug: "rolex-submariner-date-126610ln",
    category: "watches",
    brand: "Rolex",
    name: "Submariner Date",
    refLine: "Ref. 126610LN · 2022 · 41mm · Oystersteel",
    year: 2022,
    price: 18_500_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004187",
    inspected: "2026-10-14",
    pawnEligible: true,
    art: "watch",
    tone: "#1c2a2a",
    note: "We bought this Submariner from its first owner in Ikoyi, who wore it on weekends. The case shows light desk-diving marks on the clasp and no polishing. It comes with the inner and outer box, warranty card dated March 2022, and the green hang tag.",
    specs: [
      ["Reference", "126610LN"],
      ["Calibre", "3235, automatic"],
      ["Case", "41mm Oystersteel"],
      ["Bezel", "Black Cerachrom"],
      ["Bracelet", "Oyster, Glidelock clasp"],
      ["Water resistance", "300m"],
    ],
    checks: [
      { label: "Serial matches warranty card", evidence: "Serial ending …8F2 on rehaut and card" },
      { label: "Calibre 3235 confirmed", evidence: "Caseback opened, rotor engraving photographed" },
      { label: "Timing within spec", evidence: "+2 s/day across 6 positions" },
      { label: "Not reported stolen", evidence: "Checked against public loss registers" },
    ],
    wear: ["Light hairlines on the clasp", "Bezel and crystal unmarked"],
    manufacturer: {
      brand: "Rolex",
      model: "Submariner Date",
      reference: "126610LN",
      url: "https://www.rolex.com/watches/submariner",
    },
  },
  {
    slug: "omega-speedmaster-moonwatch-310-30-42-50-01-001",
    category: "watches",
    brand: "Omega",
    name: "Speedmaster Moonwatch Professional",
    refLine: "Ref. 310.30.42.50.01.001 · 2023 · 42mm · Steel",
    year: 2023,
    price: 9_800_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004201",
    inspected: "2026-10-16",
    pawnEligible: true,
    art: "watch",
    tone: "#22262a",
    note: "A Co-Axial Master Chronometer Moonwatch with the hesalite crystal. Worn rarely; the bracelet has been sized and the extra links are included. Full set with Omega warranty card activated in 2023.",
    specs: [
      ["Reference", "310.30.42.50.01.001"],
      ["Calibre", "3861, manual wind"],
      ["Case", "42mm stainless steel"],
      ["Crystal", "Hesalite"],
    ],
    checks: [
      { label: "Calibre 3861 confirmed", evidence: "Caseback, METAS certificate number matched" },
      { label: "Chronograph functions", evidence: "Start, stop, reset tested over 12 hours" },
      { label: "Warranty card genuine", evidence: "Card ID verified with dealer records" },
    ],
    wear: ["Faint marks on the hesalite crystal"],
    manufacturer: {
      brand: "Omega",
      model: "Speedmaster Moonwatch",
      reference: "310.30.42.50.01.001",
      url: "https://www.omegawatches.com/watches/speedmaster",
    },
  },
  {
    slug: "cartier-santos-medium-wssa0029",
    category: "watches",
    brand: "Cartier",
    name: "Santos de Cartier, medium",
    refLine: "Ref. WSSA0029 · 2021 · 35mm · Steel",
    year: 2021,
    price: 7_250_000,
    condition: "Good",
    boxPapers: "Box only",
    location: "Abuja",
    cert: "BF-26-004156",
    inspected: "2026-10-09",
    pawnEligible: true,
    art: "watch",
    tone: "#e8e4da",
    note: "A medium Santos with the QuickSwitch steel bracelet. No papers, so we priced it accordingly; the serial was confirmed with a Cartier boutique service record.",
    specs: [
      ["Reference", "WSSA0029"],
      ["Calibre", "1847 MC, automatic"],
      ["Case", "35.1mm steel"],
    ],
    checks: [
      { label: "Serial confirmed by service record", evidence: "Boutique service invoice, 2024" },
      { label: "Movement 1847 MC", evidence: "Caseback opened, photographed" },
    ],
    wear: ["Visible scratches on the bezel screws", "Bracelet stretch: none"],
    manufacturer: {
      brand: "Cartier",
      model: "Santos de Cartier",
      reference: "WSSA0029",
      url: "https://www.cartier.com/en-gb/watches/collections/santos-de-cartier",
    },
  },
  {
    slug: "audemars-piguet-royal-oak-15510st",
    category: "watches",
    brand: "Audemars Piguet",
    name: "Royal Oak Selfwinding",
    refLine: "Ref. 15510ST · 2023 · 41mm · Steel",
    year: 2023,
    price: 62_000_000,
    condition: "Unworn",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004222",
    inspected: "2026-10-20",
    pawnEligible: false,
    art: "watch",
    tone: "#2a3a4a",
    note: "An unworn Royal Oak with factory stickers still on the caseback. Sold by appointment only; viewing at the Lagos showroom.",
    specs: [
      ["Reference", "15510ST.OO.1320ST.06"],
      ["Calibre", "4302, automatic"],
      ["Case", "41mm stainless steel"],
    ],
    checks: [
      { label: "Extract from the archives requested", evidence: "AP confirmation pending (placeholder)" },
      { label: "Calibre 4302 confirmed", evidence: "Display caseback photographed" },
    ],
    wear: ["None; stickers intact"],
    manufacturer: {
      brand: "Audemars Piguet",
      model: "Royal Oak Selfwinding",
      reference: "15510ST",
      url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html",
    },
  },
  {
    slug: "cartier-love-bracelet-yellow-gold-b6067517",
    category: "jewellery",
    brand: "Cartier",
    name: "Love bracelet, 18k yellow gold",
    refLine: "Ref. B6067517 · Size 17 · 750 gold",
    year: 2020,
    price: 8_400_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004190",
    inspected: "2026-10-15",
    pawnEligible: true,
    art: "ring",
    tone: "#c9a35b",
    note: "Size 17 in yellow gold with the screwdriver, box and certificate. XRF reads 75.1% gold, consistent with 18k. Light surface scratches from wear, no dents.",
    specs: [
      ["Reference", "B6067517"],
      ["Metal", "18k yellow gold (750)"],
      ["Size", "17"],
      ["Weight", "34.2 g"],
    ],
    checks: [
      { label: "Gold purity 18k", evidence: "XRF reading 75.1% Au" },
      { label: "Serial engraved and matched", evidence: "Serial on bracelet and certificate" },
      { label: "Hallmarks present", evidence: "Cartier stamp, 750, serial photographed" },
    ],
    wear: ["Fine surface scratches"],
    manufacturer: {
      brand: "Cartier",
      model: "Love bracelet",
      reference: "B6067517",
      url: "https://www.cartier.com/en-gb/jewellery/collections/love",
    },
  },
  {
    slug: "diamond-solitaire-ring-1-52ct-gia",
    category: "jewellery",
    brand: "Bonafide Select",
    name: "Diamond solitaire, 1.52ct, platinum",
    refLine: "GIA 2235xxxx · 1.52ct · F · VS1 · Excellent cut",
    year: 2019,
    price: 21_000_000,
    condition: "Excellent",
    boxPapers: "Papers only",
    location: "Lagos",
    cert: "BF-26-004178",
    inspected: "2026-10-12",
    pawnEligible: true,
    art: "ring",
    tone: "#dfe3e8",
    note: "A round brilliant in a four-claw platinum setting. The GIA inscription on the girdle was read under magnification and matches the report.",
    specs: [
      ["Stone", "Round brilliant, 1.52ct"],
      ["Colour / clarity", "F / VS1"],
      ["Setting", "Platinum 950, four claws"],
      ["Report", "GIA, girdle inscribed"],
    ],
    checks: [
      { label: "Natural diamond", evidence: "Thermal and conductivity tester pass" },
      { label: "GIA inscription matched", evidence: "Girdle photographed at 40×" },
      { label: "Platinum confirmed", evidence: "XRF reading 95.0% Pt" },
    ],
    wear: ["Claws checked and secure"],
    manufacturer: {
      brand: "GIA",
      model: "Report check",
      reference: "2235xxxx",
      url: "https://www.gia.edu/report-check-landing",
    },
  },
  {
    slug: "van-cleef-arpels-alhambra-necklace",
    category: "jewellery",
    brand: "Van Cleef & Arpels",
    name: "Vintage Alhambra necklace, 10 motifs",
    refLine: "Ref. VCARA42000 · 18k yellow gold · Mother-of-pearl",
    year: 2022,
    price: 16_800_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Abuja",
    cert: "BF-26-004199",
    inspected: "2026-10-16",
    pawnEligible: true,
    art: "necklace",
    tone: "#d6b87f",
    note: "Ten motifs in yellow gold with white mother-of-pearl. Serial and hallmarks match the certificate.",
    specs: [
      ["Reference", "VCARA42000"],
      ["Metal", "18k yellow gold"],
      ["Length", "42 cm"],
    ],
    checks: [
      { label: "Gold purity 18k", evidence: "XRF reading 75.0% Au" },
      { label: "Serial and hallmarks matched", evidence: "Clasp photographed" },
    ],
    wear: ["None visible"],
    manufacturer: {
      brand: "Van Cleef & Arpels",
      model: "Vintage Alhambra",
      reference: "VCARA42000",
      url: "https://www.vancleefarpels.com/eu/en/collections/jewelry/alhambra.html",
    },
  },
  {
    slug: "hermes-birkin-30-togo-gold",
    category: "bags",
    brand: "Hermès",
    name: "Birkin 30, Togo, Gold",
    refLine: "Stamp U · 2022 · Gold hardware · Togo leather",
    year: 2022,
    price: 34_000_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004165",
    inspected: "2026-10-10",
    pawnEligible: true,
    art: "bag",
    tone: "#a46a3a",
    note: "Gold Togo with gold hardware, carried a handful of times. Corners are clean; handles show no darkening. Comes with box, dust bag, raincoat, clochette, lock and keys, and receipt.",
    specs: [
      ["Size", "30 cm"],
      ["Leather", "Togo"],
      ["Colour", "Gold (37)"],
      ["Hardware", "Gold plated"],
      ["Date stamp", "U (2022)"],
    ],
    checks: [
      { label: "Stitching hand-sewn saddle stitch", evidence: "Macro photos of handles and sides" },
      { label: "Date stamp and craftsman mark", evidence: "Interior strap photographed under UV" },
      { label: "Hardware engraving correct", evidence: "Lock, keys and zip pull checked" },
      { label: "Receipt verified", evidence: "Boutique receipt matched to stamp" },
    ],
    wear: ["Light marks on the base studs"],
    manufacturer: {
      brand: "Hermès",
      model: "Birkin",
      reference: "Birkin 30",
      url: "https://www.hermes.com/",
    },
  },
  {
    slug: "chanel-classic-flap-medium-caviar",
    category: "bags",
    brand: "Chanel",
    name: "Classic Flap, medium, caviar",
    refLine: "Microchip · 2021 · Black · Gold hardware",
    year: 2021,
    price: 12_600_000,
    condition: "Good",
    boxPapers: "Box only",
    location: "Lagos",
    cert: "BF-26-004171",
    inspected: "2026-10-11",
    pawnEligible: true,
    art: "bag",
    tone: "#1d1d1f",
    note: "A medium Classic Flap in black caviar with gold hardware. The microchip was read and matches the Chanel record format. Corners show light rubbing, shown in the condition photos.",
    specs: [
      ["Size", "Medium (25 cm)"],
      ["Leather", "Caviar"],
      ["Hardware", "Gold tone"],
      ["Identifier", "Microchip"],
    ],
    checks: [
      { label: "Microchip read", evidence: "NFC reader, number photographed" },
      { label: "Quilting and stitch count correct", evidence: "10+ stitches per panel measured" },
    ],
    wear: ["Light rubbing on two corners", "Interior clean"],
    manufacturer: {
      brand: "Chanel",
      model: "Classic 11.12 bag",
      reference: "A01112",
      url: "https://www.chanel.com/",
    },
  },
  {
    slug: "louis-vuitton-keepall-bandouliere-50",
    category: "bags",
    brand: "Louis Vuitton",
    name: "Keepall Bandoulière 50",
    refLine: "Ref. M41416 · 2023 · Monogram canvas",
    year: 2023,
    price: 3_900_000,
    condition: "Excellent",
    boxPapers: "Box only",
    location: "Abuja",
    cert: "BF-26-004188",
    inspected: "2026-10-14",
    pawnEligible: false,
    art: "bag",
    tone: "#6b4a2e",
    note: "Monogram Keepall 50 with strap, name tag and dust bag. Vachetta handles have a light, even patina.",
    specs: [
      ["Reference", "M41416"],
      ["Material", "Monogram coated canvas"],
      ["Size", "50 cm"],
    ],
    checks: [
      { label: "Microchip read", evidence: "NFC reader, number photographed" },
      { label: "Heat stamp and hardware correct", evidence: "Macro photographs" },
    ],
    wear: ["Light patina on handles"],
    manufacturer: {
      brand: "Louis Vuitton",
      model: "Keepall Bandoulière 50",
      reference: "M41416",
      url: "https://www.louisvuitton.com/",
    },
  },
  {
    slug: "iphone-16-pro-max-256gb-desert-titanium",
    category: "electronics",
    brand: "Apple",
    name: "iPhone 16 Pro Max, 256GB",
    refLine: "IMEI 35xxxxxxxxx4471 · Desert Titanium · Battery 98%",
    year: 2024,
    price: 2_150_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Lagos",
    cert: "BF-26-004205",
    inspected: "2026-10-17",
    pawnEligible: true,
    art: "phone",
    tone: "#b8a58c",
    note: "UK-purchased, factory unlocked, battery health 98%. iCloud signed out and Find My off before we accepted it.",
    specs: [
      ["Storage", "256GB"],
      ["Colour", "Desert Titanium"],
      ["Battery health", "98%"],
      ["Lock status", "Factory unlocked"],
    ],
    checks: [
      { label: "IMEI clean", evidence: "Not blacklisted on GSMA register" },
      { label: "Genuine parts", evidence: "Settings > Parts and service history: all genuine" },
      { label: "Activation lock off", evidence: "Find My disabled, screenshot kept" },
    ],
    wear: ["None visible"],
    manufacturer: {
      brand: "Apple",
      model: "iPhone 16 Pro Max",
      reference: "A3084",
      url: "https://www.apple.com/iphone/",
    },
  },
  {
    slug: "macbook-pro-14-m4-pro-24gb-512gb",
    category: "electronics",
    brand: "Apple",
    name: "MacBook Pro 14\", M4 Pro",
    refLine: "Serial C0xxxxxx7H · 24GB · 512GB · 34 cycles",
    year: 2025,
    price: 3_400_000,
    condition: "Excellent",
    boxPapers: "Full set",
    location: "Abuja",
    cert: "BF-26-004212",
    inspected: "2026-10-18",
    pawnEligible: true,
    art: "laptop",
    tone: "#2c2d30",
    note: "M4 Pro with 24GB memory and 34 battery cycles. Erased and activation lock removed in front of us.",
    specs: [
      ["Chip", "M4 Pro"],
      ["Memory", "24GB"],
      ["Storage", "512GB SSD"],
      ["Battery cycles", "34"],
    ],
    checks: [
      { label: "Serial matched to Apple coverage", evidence: "checkcoverage.apple.com screenshot" },
      { label: "Activation lock off", evidence: "Erased, setup screen photographed" },
    ],
    wear: ["Faint mark on the lid"],
    manufacturer: {
      brand: "Apple",
      model: "MacBook Pro 14-inch",
      reference: "M4 Pro",
      url: "https://www.apple.com/macbook-pro/",
    },
  },
];

export const cars: Car[] = [
  {
    slug: "toyota-land-cruiser-300-2023",
    make: "Toyota",
    model: "Land Cruiser 300",
    trim: "VX",
    year: 2023,
    price: 185_000_000,
    mileageKm: 18_400,
    body: "SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    origin: "Tokunbo",
    location: "Lagos",
    vin: "JTMxxxxxxxx012345",
    cert: "BF-26-C00041",
    inspected: "2026-10-19",
    colour: "Pearl white",
    tone: "#e9e9e4",
    note: "A Gulf-spec VX imported in August 2026. One owner, dealer service history in Dubai, clean customs papers. Inspected on a lift by our partner workshop in Lekki.",
    customs: "Duty paid · Nigeria Customs Service papers verified (placeholder)",
    mileageHistory: [
      { date: "2024-03-02", km: 7_100, source: "Dealer service, Dubai" },
      { date: "2025-04-18", km: 14_900, source: "Dealer service, Dubai" },
      { date: "2026-10-19", km: 18_400, source: "Bonafide inspection" },
    ],
    mechanical: [
      { label: "Engine and gearbox", evidence: "OBD scan clean, no stored faults" },
      { label: "Chassis and underbody", evidence: "No flood or accident repair found" },
      { label: "VIN matches all plates", evidence: "Dash, door pillar and chassis photographed" },
      { label: "Not reported stolen", evidence: "Checked with police and import records (placeholder)" },
    ],
    manufacturer: {
      brand: "Toyota",
      model: "Land Cruiser 300",
      reference: "VX",
      url: "https://www.toyota.com/landcruiser/",
    },
  },
  {
    slug: "lexus-rx-350-2021",
    make: "Lexus",
    model: "RX 350",
    trim: "F Sport",
    year: 2021,
    price: 68_000_000,
    mileageKm: 41_200,
    body: "SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    origin: "Tokunbo",
    location: "Lagos",
    vin: "2T2xxxxxxxx098765",
    cert: "BF-26-C00038",
    inspected: "2026-10-12",
    colour: "Obsidian black",
    tone: "#1b1d1f",
    note: "US-imported F Sport with a clean history report. New tyres fitted before listing.",
    customs: "Duty paid · papers verified (placeholder)",
    mileageHistory: [
      { date: "2023-06-10", km: 22_300, source: "US history report" },
      { date: "2026-10-12", km: 41_200, source: "Bonafide inspection" },
    ],
    mechanical: [
      { label: "Engine and gearbox", evidence: "OBD scan clean" },
      { label: "No flood damage", evidence: "Carpets lifted, wiring inspected" },
      { label: "VIN matches all plates", evidence: "Photographed" },
    ],
    manufacturer: {
      brand: "Lexus",
      model: "RX",
      reference: "RX 350 F Sport",
      url: "https://www.lexus.com/models/RX",
    },
  },
  {
    slug: "mercedes-benz-gle-450-2022",
    make: "Mercedes-Benz",
    model: "GLE 450",
    trim: "4MATIC",
    year: 2022,
    price: 112_000_000,
    mileageKm: 29_800,
    body: "SUV",
    transmission: "Automatic",
    fuel: "Hybrid",
    origin: "Nigerian-used",
    location: "Abuja",
    vin: "4JGxxxxxxxx554433",
    cert: "BF-26-C00043",
    inspected: "2026-10-21",
    colour: "Selenite grey",
    tone: "#6e7275",
    note: "Bought new in Nigeria through the authorised dealer and serviced there since. Two keys, full service book.",
    customs: "Bought new locally · dealer invoice verified (placeholder)",
    mileageHistory: [
      { date: "2023-09-01", km: 10_200, source: "Authorised dealer service" },
      { date: "2025-02-14", km: 21_600, source: "Authorised dealer service" },
      { date: "2026-10-21", km: 29_800, source: "Bonafide inspection" },
    ],
    mechanical: [
      { label: "Engine, EQ Boost system", evidence: "Dealer diagnostic, no faults" },
      { label: "Bodywork", evidence: "Paint depth readings even on every panel" },
    ],
    manufacturer: {
      brand: "Mercedes-Benz",
      model: "GLE SUV",
      reference: "GLE 450 4MATIC",
      url: "https://www.mercedes-benz.com/en/vehicles/",
    },
  },
  {
    slug: "toyota-camry-xse-2020",
    make: "Toyota",
    model: "Camry",
    trim: "XSE",
    year: 2020,
    price: 32_500_000,
    mileageKm: 63_000,
    body: "Saloon",
    transmission: "Automatic",
    fuel: "Petrol",
    origin: "Nigerian-used",
    location: "Lagos",
    vin: "4T1xxxxxxxx112233",
    cert: "BF-26-C00036",
    inspected: "2026-10-08",
    colour: "Celestial silver",
    tone: "#b9bcbf",
    note: "A tidy Lagos-used XSE with one owner since import in 2021. Minor repaint on the rear bumper, disclosed and photographed.",
    customs: "Duty paid · papers verified (placeholder)",
    mileageHistory: [
      { date: "2021-05-03", km: 31_000, source: "Import record" },
      { date: "2026-10-08", km: 63_000, source: "Bonafide inspection" },
    ],
    mechanical: [
      { label: "Engine and gearbox", evidence: "OBD scan clean" },
      { label: "Bodywork", evidence: "Rear bumper repainted, otherwise original" },
    ],
    manufacturer: {
      brand: "Toyota",
      model: "Camry",
      reference: "XSE",
      url: "https://www.toyota.com/camry/",
    },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getItem(slug: string) {
  return items.find((i) => i.slug === slug);
}

export function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export function newestFirst<T extends { inspected: string }>(list: T[]) {
  return [...list].sort((a, b) => b.inspected.localeCompare(a.inspected));
}

export type CertificateRecord = {
  cert: string;
  title: string;
  inspected: string;
  href: string;
};

export function findCertificate(cert: string): CertificateRecord | undefined {
  const needle = cert.trim().toUpperCase();
  const item = items.find((i) => i.cert === needle);
  if (item) {
    return {
      cert: item.cert,
      title: `${item.brand} ${item.name}`,
      inspected: item.inspected,
      href: `/item/${item.slug}`,
    };
  }
  const car = cars.find((c) => c.cert === needle);
  if (car) {
    return {
      cert: car.cert,
      title: `${car.year} ${car.make} ${car.model} ${car.trim}`,
      inspected: car.inspected,
      href: `/cars/${car.slug}`,
    };
  }
  return undefined;
}
