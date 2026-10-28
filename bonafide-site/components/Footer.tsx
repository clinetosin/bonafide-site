import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Link href="/" className="logo logo--footer" aria-label="Bonafide Pawnshop home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/bonafide-logo-horizontal-tagline-reversed.svg" alt="Bonafide Pawnshop, Luxury Redefined" />
        </Link>
        <div className="footer-grid">
          <div className="stack-2">
            <p>
              WhatsApp{" "}
              <a href="https://wa.me/2340000000000" style={{ color: "var(--on-brand)" }}>
                +234 000 000 0000
              </a>
            </p>
            <p>Lagos: 00 Placeholder Road, Victoria Island</p>
            <p>Abuja: 00 Placeholder Street, Maitama</p>
            <p>Mon to Sat, 10:00 to 18:00</p>
          </div>
          <div>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/shop/watches">Watches</Link></li>
              <li><Link href="/shop/jewellery">Jewellery</Link></li>
              <li><Link href="/shop/bags">Bags</Link></li>
              <li><Link href="/shop/electronics">Phones &amp; laptops</Link></li>
              <li><Link href="/cars">Cars</Link></li>
            </ul>
          </div>
          <div>
            <h3>Sell &amp; pawn</h3>
            <ul>
              <li><Link href="/sell">Get a free valuation</Link></li>
              <li><Link href="/sell?category=cars">Sell your car</Link></li>
              <li><Link href="/sell?mode=pawn">Borrow against an item</Link></li>
            </ul>
          </div>
          <div>
            <h3>Trust</h3>
            <ul>
              <li><Link href="/authentication">How we authenticate</Link></li>
              <li><Link href="/verify">Verify a certificate</Link></li>
              <li><Link href="/authentication#guarantee">Our guarantee</Link></li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/authentication#who-checks">Our specialists</Link></li>
              <li><Link href="/#showrooms">Showrooms</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            Bonafide Pawnshop is a trading name of Bonafide Tech Services Ltd, RC 0000000
            (placeholder). Payments by bank transfer and card via Paystack.
          </p>
          <p>
            Brand names and model names belong to their owners. Bonafide is an independent
            reseller and is not affiliated with, authorised by or endorsed by any manufacturer
            shown on this site.
          </p>
          <p>© {new Date().getFullYear()} Bonafide Tech Services Ltd</p>
        </div>
      </div>
    </footer>
  );
}
