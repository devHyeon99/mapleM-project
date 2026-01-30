import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

const DISALLOWED_CRAWLERS = [
  "Baiduspider",
  "Sogou web spider",
  "Sogou inst spider",
  "Sogou Pic Spider",
  "Sogou head spider",
  "Sogou Orion spider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: DISALLOWED_CRAWLERS,
        disallow: ["/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
