import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Samme skrifter som appen: Source Serif 4 til overskrifter, Inter til tekst.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });

const DESCRIPTION =
  "Podra finder ugens bedste tilbud i dagligvarekæderne, laver en madplan du har lyst til, og holder styr på indkøb, budget og køkken. Kommer snart til iPhone.";

export const metadata: Metadata = {
  metadataBase: new URL("https://podra.dk"),
  title: { default: "Podra · Madplanen, der betaler sig selv", template: "%s · Podra" },
  description: DESCRIPTION,
  applicationName: "Podra",
  keywords: ["madplan", "tilbud", "tilbudsavis", "indkøbsliste", "madbudget", "SU", "studerende", "opskrifter", "dagligvarer", "supermarked", "app"],
  authors: [{ name: "PODRA ApS" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Podra",
    locale: "da_DK",
    url: "/",
    title: "Podra · Madplanen, der betaler sig selv",
    description: "Ugens tilbud, en madplan og en indkøbsliste, der laver sig selv. Kommer snart til iPhone.",
    images: [{ url: "/og/forside.jpg", width: 1200, height: 630, alt: "Podra: Madplanen, der betaler sig selv" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podra · Madplanen, der betaler sig selv",
    description: "Ugens tilbud, en madplan og en indkøbsliste, der laver sig selv. Kommer snart til iPhone.",
    images: ["/og/forside.jpg"],
  },
  robots: { index: true, follow: true },
};

// Strukturerede data til søgemaskiner: hvem står bag, og hvor man finder os.
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Podra",
  legalName: "PODRA ApS",
  url: "https://podra.dk",
  logo: "https://podra.dk/logo/app-ikon-512.png",
  email: "oliver@podra.dk",
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
