"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/cars", label: "Cars" },
  { href: "/sell", label: "Sell or pawn" },
  { href: "/authentication", label: "How we authenticate" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="main-nav" aria-label="Main">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={pathname.startsWith(l.href) ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
