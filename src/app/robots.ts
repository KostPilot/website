import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/i/"] }, sitemap: "https://kost-pilot.dk/sitemap.xml" };
}
