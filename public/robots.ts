import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ClaudeBot 차단
      {
        userAgent: "ClaudeBot",
        disallow: ["/"],
      },

      // 기본(나머지 봇/검색엔진)은 허용
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: "https://maplemgg.com/sitemap.xml",
  };
}
