import type { MetadataRoute } from "next";
import { RANKING_TYPES } from "@/entities/ranking/model/types/ranking";
import { SITE_URL } from "@/shared/config/site";

// lastModified/changeFrequency/priority 는 두지 않음.
// 구글은 changefreq 와 priority 를 무시하고, lastmod 는 검증 가능할 때만 씀.
// 이 사이트맵은 빌드 시점에 한 번 생성되므로 페이지별 실제 수정 시각을 댈 수 없음

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/guild",
    "/ranking",
    "/tools",
    "/tools/cube",
    "/tools/potential",
    "/tools/starforce",
  ];

  // "level" 은 /ranking 이 담당하므로 중복 URL 을 만들지 않는다.
  const rankingRoutes = RANKING_TYPES.filter((type) => type !== "level").map(
    (type) => `/ranking/${type}`,
  );

  return [...staticRoutes, ...rankingRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
