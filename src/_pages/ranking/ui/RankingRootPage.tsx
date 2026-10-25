import { Metadata } from "next";
import { buildRankingMetadata, renderRankingPage } from "./ranking-page";

// 레벨 랭킹 전체 월드 1페이지. 나머지 조합은 전부 `[type]/[[...filters]]` 가 맡는다.
const ROOT_FILTERS = { page: 1 } as const;

export function generateRankingRootMetadata(): Metadata {
  return buildRankingMetadata("level", ROOT_FILTERS);
}

export function RankingRootPage() {
  return renderRankingPage("level", ROOT_FILTERS);
}
