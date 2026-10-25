import { Suspense } from "react";
import type { Metadata } from "next";
import {
  isSharenianRanking,
  RANKING_LABELS,
  rankingHref,
  type RankingType,
} from "@/entities/ranking";
import { RankingBoard, RankingBoardSkeleton } from "@/widgets/ranking-board";
import {
  RankingSearch,
  RankingSearchFallback,
} from "@/features/ranking-search";
import {
  OG_IMAGE,
  OG_IMAGE_SIZE,
  SITE_NAME,
  SITE_URL,
} from "@/shared/config/site";
import { getRankingPageData } from "./get-ranking-page-data";
import type { RankingFilters } from "./ranking-query";

/** 레벨 랭킹은 랭킹의 대표 페이지라 종류 라벨 대신 전체 종류를 훑어 줌 */
const LEVEL_SUMMARY = "레벨, 무릉도장, 유니온, 전투력 등 주요 랭킹을 제공합니다.";
const TYPE_SUMMARY = "캐릭터 정보와 랭킹 변화를 한눈에 제공합니다.";

export function buildRankingMetadata(
  type: RankingType,
  { worldName, page }: RankingFilters,
): Metadata {
  const typeLabel = RANKING_LABELS[type];
  const scope = worldName ? `${worldName} 월드` : "전체 월드";

  // 레벨은 대표 페이지라 "전체 월드"·종류 라벨 없이 가장 짧은 제목을 씀
  const title =
    type === "level"
      ? worldName
        ? `메이플스토리M ${scope} 랭킹`
        : "메이플스토리M 랭킹"
      : `메이플스토리M ${scope} ${typeLabel} 랭킹`;

  const description =
    type === "level"
      ? worldName
        ? `메이플스토리M ${scope}의 랭킹 정보를 확인하세요. ${LEVEL_SUMMARY}`
        : `메이플스토리M ${scope} 랭킹 정보를 확인하세요. ${LEVEL_SUMMARY}`
      : worldName
        ? `메이플스토리M ${scope}의 ${typeLabel} 랭킹을 확인하세요. ${TYPE_SUMMARY}`
        : `메이플스토리M ${scope}의 ${typeLabel} 랭킹 정보를 확인하세요. ${TYPE_SUMMARY}`;

  // 2페이지 이후는 1페이지 URL 을 대표로 삼는다.
  const fullUrl = `${SITE_URL}${rankingHref(type, { worldName })}`;
  const ogImageUrl = `${SITE_URL}${OG_IMAGE}`;

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: fullUrl,
      siteName: SITE_NAME,
      locale: "ko_KR",
      images: [
        {
          url: ogImageUrl,
          ...OG_IMAGE_SIZE,
          alt: "메엠지지 메이플스토리M 랭킹",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: page <= 1,
      follow: true,
    },
  };
}

async function RankingBoardLoader({
  type,
  filters,
}: {
  type: RankingType;
  filters: RankingFilters;
}) {
  const { data, params: fetchParams } = await getRankingPageData(type, filters);

  return (
    <RankingBoard type={type} initialData={data} fetchParams={fetchParams} />
  );
}

// 데이터 페치를 loading.tsx 대신 페이지 내부 Suspense 로 스트리밍한다.
// 세그먼트에 loading.tsx 가 있으면 셸이 200으로 먼저 흘러나가
// notFound()/permanentRedirect() 가 진짜 404/308 상태코드를 내지 못한다.
export function renderRankingPage(type: RankingType, filters: RankingFilters) {
  return (
    <>
      <h1 className="sr-only">
        {filters.worldName || "전체"} 월드 {RANKING_LABELS[type]} 랭킹
      </h1>
      <p className="sr-only">
        메이플스토리M {RANKING_LABELS[type]} 랭킹 정보를 확인해보세요.
      </p>

      {!isSharenianRanking(type) && (
        <Suspense fallback={<RankingSearchFallback />}>
          <RankingSearch type={type} />
        </Suspense>
      )}

      <Suspense fallback={<RankingBoardSkeleton type={type} />}>
        <RankingBoardLoader type={type} filters={filters} />
      </Suspense>
    </>
  );
}
