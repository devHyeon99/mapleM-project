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
