import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "ClaudeBot",
        disallow: ["/"],
      },
      {
        userAgent: "Amazonbot",
        disallow: ["/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/character/", "/characters/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
