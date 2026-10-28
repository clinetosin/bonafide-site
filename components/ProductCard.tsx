import Link from "next/link";
import type { Item } from "@/lib/catalogue";
import { formatNaira } from "@/lib/format";
import { photoFor } from "@/lib/photos";
import ItemArt from "./ItemArt";
import Tilt from "./Tilt";

export default function ProductCard({ item }: { item: Item }) {
  const photo = photoFor(item.slug);
  return (
    <Link href={`/item/${item.slug}`} className={`card${item.sold ? " card--sold" : ""}`}>
      <Tilt>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.alt} className="photo" loading="lazy" />
        ) : (
          <ItemArt kind={item.art} tone={item.tone} className="art" />
        )}
        <div className="card-badges">
          <span className="tag tag--verified">Verified</span>
          {item.pawnEligible && <span className="tag tag--pawn">Pawn eligible</span>}
        </div>
      </Tilt>
      <div className="card-body">
        <span className="card-brand">{item.brand}</span>
        <span className="card-title">{item.name}</span>
        <span className="ref">{item.refLine}</span>
        <span className="price">{item.sold ? "Sold" : formatNaira(item.price)}</span>
      </div>
    </Link>
  );
}
