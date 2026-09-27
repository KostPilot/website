import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Samme skrifter som appen: Source Serif 4 til overskrifter, Inter til tekst.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kost-pilot.dk"),
  title: "KostPilot · Madplanen, der betaler sig selv",
  description:
    "KostPilot finder ugens bedste tilbud, laver en madplan du har lyst til, og holder styr på indkøb, budget og køkken. Kommer snart til iPhone.",
  openGraph: {
    title: "KostPilot · Madplanen, der betaler sig selv",
    description: "Ugens tilbud, en madplan og en indkøbsliste der laver sig selv. Kommer snart til iPhone.",
    images: ["/screens/hjem.webp"],
    locale: "da_DK",
  },
  icons: { icon: "/logo/logo.png" },
};

export const viewport: Viewport = { themeColor: "#0f0d0c" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body className={`${inter.variable} ${serif.variable} antialiased`}>{children}</body>
    </html>
  );
}
