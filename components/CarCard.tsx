import Link from "next/link";
import type { Car } from "@/lib/catalogue";
import { formatKm, formatNaira } from "@/lib/format";
import { photoFor } from "@/lib/photos";
import ItemArt from "./ItemArt";
import Tilt from "./Tilt";

export default function CarCard({ car }: { car: Car }) {
  const photo = photoFor(car.slug);
  return (
    <Link href={`/cars/${car.slug}`} className="card">
      <Tilt max={5}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.alt} className="photo" loading="lazy" />
        ) : (
          <ItemArt kind="car" tone={car.tone} className="art" />
        )}
        <div className="card-badges">
          <span className="tag tag--verified">Inspected</span>
          <span className="tag tag--pawn">{car.origin}</span>
        </div>
      </Tilt>
      <div className="card-body">
        <span className="card-brand">{car.make}</span>
        <span className="card-title">
          {car.year} {car.model} {car.trim}
        </span>
        <span className="ref">
          {formatKm(car.mileageKm)} · {car.transmission} · {car.location}
        </span>
        <span className="price">{formatNaira(car.price)}</span>
      </div>
    </Link>
  );
}
