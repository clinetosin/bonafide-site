"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Car, Gem, Menu, ShieldCheck, Tag, X } from "lucide-react";

const tabs = [
  { href: "/shop", label: "Shop", Icon: Gem },
  { href: "/cars", label: "Cars", Icon: Car },
  { href: "/sell", label: "Sell or pawn", Icon: Tag },
  { href: "/verify", label: "Verify", Icon: ShieldCheck },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="icon-btn menu-toggle"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>
      {open && (
        <>
          <div className="drawer-scrim" onClick={() => setOpen(false)} />
          <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="row between">
              <span className="eyebrow">Menu</span>
              <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav>
              <Link href="/shop/watches">Watches</Link>
              <Link href="/shop/jewellery">Jewellery</Link>
              <Link href="/shop/bags">Bags</Link>
              <Link href="/shop/electronics">Phones &amp; laptops</Link>
              <Link href="/cars">Cars</Link>
              <Link href="/sell">Sell or pawn an item</Link>
              <Link href="/authentication">How we authenticate</Link>
              <Link href="/verify">Verify a certificate</Link>
            </nav>
            <Link href="/sell" className="btn btn--primary btn--block">
              Get a free valuation
            </Link>
          </div>
        </>
      )}
      <nav className="tab-bar" aria-label="Quick links">
        {tabs.map(({ href, label, Icon }) => (
          <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
            <Icon size={22} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
