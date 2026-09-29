import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kost-pilot.dk";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/historien`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/lancering`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privatliv`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
