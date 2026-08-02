import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/utility/json-ld";
import { company } from "@/data/company";
import { env } from "@/lib/env";
import "@/styles/globals.css";

// Exactly the weights in docs/02-DESIGN-SYSTEM.md §3 — each extra weight is ~15 kB.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "NUCLIEX — SSDs & IT solutions engineered in India",
    template: "%s — NUCLIEX",
  },
  description:
    "SATA and NVMe SSDs, computer hardware, and professional IT services from NUCLIEX INFOSYS, Thane. Clear warranty, real support.",
  // Relative canonical resolves per-page against metadataBase.
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "NUCLIEX",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD carries only confirmed facts (docs/05 §1) — street address, phone,
 * and sameAs join once docs/09 items 6 and 15 are resolved.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: company.brand,
  legalName: company.legalName,
  url: env.NEXT_PUBLIC_SITE_URL,
  logo: `${env.NEXT_PUBLIC_SITE_URL}/brand/nucliex-logo-navy.png`,
  founder: { "@type": "Person", name: company.founder },
  telephone: company.phone,
  email: company.supportEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.addressLine,
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: company.pin,
    addressCountry: company.country,
  },
  areaServed: ["Thane", "Mumbai", "Maharashtra", "India"],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.brand,
  url: env.NEXT_PUBLIC_SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Cookieless — no consent banner required (CLAUDE.md §2.7) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
