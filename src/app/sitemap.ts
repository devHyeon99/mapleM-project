import type { MetadataRoute } from "next";
import { RANKING_TYPES, rankingHref } from "@/entities/ranking";
import { SITE_URL } from "@/shared/config/site";
import { ALL_WORLD_NAME, WORLD_NAMES } from "@/shared/config/constants/worlds";

// lastModified/changeFrequency/priority 는 두지 않음.
// 구글은 changefreq 와 priority 를 무시하고, lastmod 는 검증 가능할 때만 씀.
// 이 사이트맵은 빌드 시점에 한 번 생성되므로 페이지별 실제 수정 시각을 댈 수 없음

export default function sitemap(): MetadataRoute.Sitemap {
  // 도구는 페이지마다 제목·설명·기능이 달라 중복이 아니므로 하위 도구까지 전부 싣는다.
  const staticRoutes = [
    "/",
    "/guild",
    "/guild/promotion",
    "/ranking",
    "/tools",
    "/tools/cube",
    "/tools/potential",
    "/tools/starforce",
  ];

  // 정적으로 굽는 조합이 그대로 색인 대상이다. 월드별 페이지는 제목·설명·표가
  // 서로 달라 중복이 아니고, canonical 도 자기 자신을 가리킨다.
  // 2페이지 이후는 noindex 라 싣지 않는다.
  const worlds = WORLD_NAMES.filter((world) => world !== ALL_WORLD_NAME);
  const rankingRoutes = RANKING_TYPES.flatMap((type) => [
    rankingHref(type),
    ...worlds.map((worldName) => rankingHref(type, { worldName })),
  ]);

  // rankingHref("level") 는 /ranking 이라 staticRoutes 와 겹친다.
  const paths = [...new Set([...staticRoutes, ...rankingRoutes])];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
