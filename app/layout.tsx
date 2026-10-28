import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bonafidepawnshop.ng"),
  title: {
    default: "Bonafide Pawnshop · Luxury Redefined",
    template: "%s · Bonafide Pawnshop",
  },
  description:
    "Buy and sell authenticated luxury watches, jewellery, designer bags, phones, laptops and cars in Lagos and Abuja. Every item carries a Bonafide certificate.",
  openGraph: { images: ["/brand/social-avatar.png"], siteName: "Bonafide Pawnshop", locale: "en_NG" },
};

export const viewport: Viewport = {
  themeColor: "#0e2b25",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400..500&family=Hanken+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
