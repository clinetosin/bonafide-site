import Link from "next/link";
import { Search, ShieldCheck } from "lucide-react";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <>
      <div className="utility-bar">
        <div className="container">
          <span>Lagos · Abuja showrooms · Insured delivery nationwide</span>
          <div className="utility-right">
            <Link href="/verify">Verify a certificate</Link>
            <a href="tel:+2340000000000">+234 000 000 0000</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container bar">
          <Link href="/" className="logo" aria-label="Bonafide Pawnshop home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/bonafide-logo-horizontal.svg" alt="Bonafide Pawnshop" width={560} height={160} />
          </Link>
          <NavLinks />
          <div className="header-actions">
            <Link href="/shop" className="icon-btn" aria-label="Search verified pieces">
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/verify" className="icon-btn hide-desktop" aria-label="Verify a certificate">
              <ShieldCheck size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/sell" className="btn btn--primary">
              Get a free valuation
            </Link>
            <MobileNav />
          </div>
        </div>
        <nav className="category-row" aria-label="Categories">
          <div className="container">
            <Link href="/shop/watches">Watches</Link>
            <Link href="/shop/jewellery">Jewellery</Link>
            <Link href="/shop/bags">Bags</Link>
            <Link href="/shop/electronics">Phones &amp; laptops</Link>
            <Link href="/cars">Cars</Link>
            <Link href="/shop">All verified pieces</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
