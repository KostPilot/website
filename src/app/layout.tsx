import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Samme skrifter som appen: Source Serif 4 til overskrifter, Inter til tekst.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });

const DESCRIPTION =
  "KostPilot finder ugens bedste tilbud i Netto, REMA 1000, Føtex og Bilka, laver en madplan du har lyst til, og holder styr på indkøb, budget og køkken. Kommer snart til iPhone.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kost-pilot.dk"),
  title: { default: "KostPilot · Madplanen, der betaler sig selv", template: "%s · KostPilot" },
  description: DESCRIPTION,
  applicationName: "KostPilot",
  keywords: ["madplan", "tilbud", "tilbudsavis", "indkøbsliste", "madbudget", "SU", "studerende", "opskrifter", "Netto", "REMA 1000", "Føtex", "Bilka", "app"],
  authors: [{ name: "KostPilot ApS" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KostPilot",
    locale: "da_DK",
    url: "/",
    title: "KostPilot · Madplanen, der betaler sig selv",
    description: "Ugens tilbud, en madplan og en indkøbsliste, der laver sig selv. Kommer snart til iPhone.",
    images: [{ url: "/og/forside.jpg", width: 1200, height: 630, alt: "KostPilot: Madplanen, der betaler sig selv" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KostPilot · Madplanen, der betaler sig selv",
    description: "Ugens tilbud, en madplan og en indkøbsliste, der laver sig selv. Kommer snart til iPhone.",
    images: ["/og/forside.jpg"],
  },
  robots: { index: true, follow: true },
};

// Strukturerede data til søgemaskiner: hvem står bag, og hvor man finder os.
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KostPilot",
  legalName: "KostPilot ApS",
  url: "https://kost-pilot.dk",
  logo: "https://kost-pilot.dk/logo/app-ikon-512.png",
  email: "oliver@kost-pilot.dk",
  address: { "@type": "PostalAddress", addressLocality: "Aalborg", addressCountry: "DK" },
  founder: [
    { "@type": "Person", name: "Oliver" },
    { "@type": "Person", name: "Kasper" },
  ],
  sameAs: ["https://www.linkedin.com/company/kost-pilot/"],
};

export const viewport: Viewport = { themeColor: "#0f0d0c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body className={`${inter.variable} ${serif.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
        {children}
      </body>
    </html>
  );
}
