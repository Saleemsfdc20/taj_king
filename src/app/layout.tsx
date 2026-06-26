import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TAJ KING SHAWARMA | Best Chicken Shawarma in Kurla, Mumbai",
  description:
    "Enjoy premium chicken shawarmas at TAJ KING SHAWARMA in Kurla, Mumbai. Fresh ingredients, authentic flavours, quick service, and affordable prices.",
  keywords: [
    "shawarma",
    "chicken shawarma",
    "Kurla",
    "Mumbai",
    "TAJ KING",
    "best shawarma",
    "restaurant",
    "food delivery",
    "authentic shawarma",
    "premium shawarma",
  ],
  authors: [{ name: "TAJ KING SHAWARMA" }],
  openGraph: {
    title: "TAJ KING SHAWARMA | Best Chicken Shawarma in Kurla, Mumbai",
    description:
      "Enjoy premium chicken shawarmas at TAJ KING SHAWARMA in Kurla, Mumbai. Fresh ingredients, authentic flavours, quick service, and affordable prices.",
    type: "website",
    locale: "en_IN",
    siteName: "TAJ KING SHAWARMA",
    url: "https://tajkingshawarma.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAJ KING SHAWARMA | Best Chicken Shawarma in Kurla, Mumbai",
    description:
      "Enjoy premium chicken shawarmas at TAJ KING SHAWARMA in Kurla, Mumbai. Fresh ingredients, authentic flavours, quick service, and affordable prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "TAJ KING SHAWARMA",
  image: "/images/classic-chicken-shawarma.png",
  description:
    "Premium chicken shawarmas made with fresh ingredients, authentic flavours, and served with passion in Kurla, Mumbai.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Goawala Building, AH Wadia Marg, Friends Colony, Hallow Pul",
    addressLocality: "Kurla West, Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400070",
    addressCountry: "IN",
  },
  telephone: "+918080894627",
  priceRange: "₹100 - ₹200",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "00:30",
  },
  servesCuisine: ["Middle Eastern", "Shawarma", "Indian"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
  menu: "#menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased bg-[#0D0D0D] text-white">
        {children}
      </body>
    </html>
  );
}
