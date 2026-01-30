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
        // /character/**, /characters/** 는 각 페이지가 noindex 메타를 내보낸다.
        // 여기서 disallow 하면 크롤러가 그 메타를 읽지 못해 색인이 남는다.
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
