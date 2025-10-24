import type { MetadataRoute } from "next";
import { RANKING_TYPES } from "@/entities/ranking/model/types/ranking";

const BASE_URL = "https://maplemgg.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/guild`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const rankingRoutes: MetadataRoute.Sitemap = RANKING_TYPES.map((type) => ({
    url: `${BASE_URL}/ranking/${type}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [...staticRoutes, ...rankingRoutes];
}
