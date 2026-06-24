import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  RANKING_TYPES,
  rankingHref,
  type RankingType,
} from "@/entities/ranking";
import {
  buildRankingMetadata,
  renderRankingPage,
} from "../../_lib/ranking-page";
import { parseRankingFilters } from "../../_lib/ranking-query";
import {
  ALL_WORLD_NAME,
  WORLD_NAMES,
  worldSlug,
} from "@/shared/config/constants/worlds";

/**
 * 1페이지만 미리 굽는다. 월드 8종 × 랭킹 9종까지는 유한하지만 페이지까지 곱하면
 * 조합이 수만 개라 전부 구울 수 없다. 나머지는 dynamicParams 기본값에 맡겨
 * 첫 요청 때 만들어지고, 그 뒤로는 다른 정적 페이지와 똑같이 캐시된다.
 */
export function generateStaticParams() {
  const worlds = WORLD_NAMES.filter((world) => world !== ALL_WORLD_NAME);

  return RANKING_TYPES.flatMap((type) => [
    // /ranking/level 은 /ranking 으로 308 되므로 굽지 않는다.
    ...(type === "level" ? [] : [{ type, filters: [] as string[] }]),
    ...worlds.map((world) => ({ type, filters: [worldSlug(world)] })),
  ]);
}

interface RankingPageProps {
  params: Promise<{ type: string; filters?: string[] }>;
}

/** 타입·세그먼트를 검증해 돌려준다. 어느 하나라도 어긋나면 404. */
async function readParams(params: RankingPageProps["params"]) {
  const { type, filters } = await params;

  if (!RANKING_TYPES.includes(type as RankingType)) {
    notFound();
  }

  const parsed = parseRankingFilters(filters);
  if (!parsed) {
    notFound();
  }

  return {
    type: type as RankingType,
    segments: filters ?? [],
    filters: parsed,
  };
}

export async function generateMetadata({
  params,
}: RankingPageProps): Promise<Metadata> {
  const { type, filters } = await readParams(params);
  return buildRankingMetadata(type, filters);
}

export default async function RankingPage({ params }: RankingPageProps) {
  const { type, segments, filters } = await readParams(params);

  // 같은 내용이 여러 URL 로 열리지 않게, 요청 경로가 대표 URL 과 다르면 넘긴다.
  // 어떤 형태가 대표인지는 rankingHref 만 알고 있으면 된다.
  // (`/ranking/dojang/all` → `/ranking/dojang`, `/ranking/level/scania/1` → `/ranking/level/scania`,
  //  한글 월드 경로 → 슬러그 경로)
  const requested = `/ranking/${type}${segments.length ? `/${segments.join("/")}` : ""}`;
  const canonical = rankingHref(type, filters);
  if (requested !== canonical) {
    permanentRedirect(canonical);
  }

  return renderRankingPage(type, filters);
}
