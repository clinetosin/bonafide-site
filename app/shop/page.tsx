import Link from "next/link";
import type { Metadata } from "next";
import ShopBrowser from "@/components/ShopBrowser";
import { categories, items } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Shop verified pieces" };

export default function ShopPage() {
  return (
    <>
      <section className="section section--intro">
        <div className="container stack-4">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>Shop</span>
          </nav>
          <h1 className="h1">Every verified piece</h1>
          <p className="lede">Each one inspected in our lab, with a certificate you can check.</p>
          <div className="chips chips--scroll">
            <Link className="chip" aria-current="page" href="/shop">All</Link>
            {categories.map((c) => (
              <Link key={c.slug} className="chip" href={`/shop/${c.slug}`}>{c.name}</Link>
            ))}
            <Link className="chip" href="/cars">Cars</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{ paddingBottom: 96 }}>
        <ShopBrowser items={items} />
      </section>
    </>
  );
}
