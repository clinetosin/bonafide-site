import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopBrowser from "@/components/ShopBrowser";
import { categories, getCategory, items } from "@/lib/catalogue";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  return { title: c ? `Verified ${c.name.toLowerCase()}` : "Shop" };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const list = items.filter((i) => i.category === c.slug);

  return (
    <>
      <section className="section section--intro">
        <div className="container stack-4">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/shop">Shop</Link> <span>/</span> <span>{c.name}</span>
          </nav>
          <h1 className="h1">{c.name}</h1>
          <p className="lede">{c.intro}</p>
          <div className="chips chips--scroll">
            <Link className="chip" href="/shop">All</Link>
            {categories.map((x) => (
              <Link key={x.slug} className="chip" aria-current={x.slug === c.slug ? "page" : undefined} href={`/shop/${x.slug}`}>
                {x.name}
              </Link>
            ))}
            <Link className="chip" href="/cars">Cars</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{ paddingBottom: 96 }}>
        <ShopBrowser items={list} />
      </section>
    </>
  );
}
