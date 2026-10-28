import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty">
        <span className="eyebrow">Not found</span>
        <h1 className="h1">We couldn&rsquo;t find that page</h1>
        <p className="muted">It may have sold, or the link may be wrong.</p>
        <Link href="/shop" className="btn btn--primary">Browse verified pieces</Link>
      </div>
    </section>
  );
}
