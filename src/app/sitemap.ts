import type { MetadataRoute } from "next";
import { RANKING_TYPES } from "@/entities/ranking/model/types/ranking";
import { SITE_URL } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guild`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ranking`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools/cube`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/potential`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/starforce`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  const rankingRoutes: MetadataRoute.Sitemap = RANKING_TYPES.filter(
    (type) => type !== "level",
  ).map((type) => ({
    url: `${SITE_URL}/ranking/${type}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [...staticRoutes, ...rankingRoutes];
}
