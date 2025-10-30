import type { MetadataRoute } from "next";

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
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://maplemgg.com/sitemap.xml",
  };
}
