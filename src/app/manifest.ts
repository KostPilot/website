import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KostPilot",
    short_name: "KostPilot",
    description: "Madplanen, der betaler sig selv.",
    start_url: "/",
    display: "browser",
    background_color: "#0f0d0c",
    theme_color: "#0f0d0c",
    icons: [
      { src: "/logo/app-ikon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo/app-ikon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
