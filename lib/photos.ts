// Illustrative photos of each model from Unsplash (free for commercial use
// under the Unsplash License). They show the model, not the exact item for
// sale, and are replaced by studio photos of the real piece once shot.

export type Photo = {
  src: string;
  alt: string;
  credit: string;
  page: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`;

const PHOTOS: Record<string, Photo> = {
  "rolex-submariner-date-126610ln": {
    src: unsplash("photo-1662384197911-e82189f4dc60"),
    alt: "Rolex Submariner Date on a white surface",
    credit: "Patrick Langwallner",
    page: "https://unsplash.com/photos/GaHmbqNh5q8",
  },
  "omega-speedmaster-moonwatch-310-30-42-50-01-001": {
    src: unsplash("photo-1556453007-ee036169934b"),
    alt: "Omega chronograph watch",
    credit: "Fidel Fernando",
    page: "https://unsplash.com/photos/LLOeIZFujCU",
  },
  "cartier-santos-medium-wssa0029": {
    src: unsplash("photo-1687040481503-3595ef7b5672"),
    alt: "Cartier Santos automatic watch",
    credit: "Keyur Jadav",
    page: "https://unsplash.com/photos/OneGplJm4ko",
  },
  "audemars-piguet-royal-oak-15510st": {
    src: unsplash("photo-1695921504311-a42b163ae0a3"),
    alt: "Audemars Piguet watch on a desk",
    credit: "Ahsan Khan",
    page: "https://unsplash.com/photos/XDTnKDj9yCg",
  },
  "diamond-solitaire-ring-1-52ct-gia": {
    src: unsplash("photo-1559006864-38a01f201f95"),
    alt: "Diamond solitaire ring",
    credit: "Korie Cull",
    page: "https://unsplash.com/photos/f3gcUmrR4eQ",
  },
  "iphone-16-pro-max-256gb-desert-titanium": {
    src: unsplash("photo-1726587912121-ea21fcc57ff8"),
    alt: "iPhone 16 Pro in Desert Titanium",
    credit: "Igor Omilaev",
    page: "https://unsplash.com/photos/lDWTfYhZ85w",
  },
  "macbook-pro-14-m4-pro-24gb-512gb": {
    src: unsplash("photo-1611186871348-b1ce696e52c9"),
    alt: "Silver Apple MacBook on a white table",
    credit: "Maxim Hopman",
    page: "https://unsplash.com/photos/Hin-rzhOdWs",
  },
  "lexus-rx-350-2021": {
    src: unsplash("photo-1742941129482-843e7492aa0b"),
    alt: "White Lexus RX parked on the road",
    credit: "Car Photographers",
    page: "https://unsplash.com/photos/mu9zfAzmuOo",
  },
  "mercedes-benz-gle-450-2022": {
    src: unsplash("photo-1692970095410-6bd548fc7f6c"),
    alt: "Black Mercedes-Benz SUV on a country road",
    credit: "Václav Pechar",
    page: "https://unsplash.com/photos/MyidPsXdKUU",
  },
  "toyota-camry-xse-2020": {
    src: unsplash("photo-1621007947382-bb3c3994e3fb"),
    alt: "Silver Toyota Camry parked on the road",
    credit: "Kevin Bonilla",
    page: "https://unsplash.com/photos/YPfnvLc3bbQ",
  },
};

export function photoFor(slug: string): Photo | undefined {
  return PHOTOS[slug];
}
