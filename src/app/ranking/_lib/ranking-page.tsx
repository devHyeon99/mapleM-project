import { Suspense } from "react";
import type { Metadata } from "next";
import {
  RANKING_LABELS,
  type RankingHighlight,
  type RankingType,
} from "@/entities/ranking";
import { RankingBoard, RankingBoardSkeleton } from "@/widgets/ranking-board";
import { RankingSearch, readRankingHighlight } from "@/features/ranking-search";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";
import { getRankingPageData } from "./get-ranking-page-data";
import {
  normalizeRankingPage,
  normalizeRankingWorldName,
} from "./ranking-query";

export type RankingSearchParams = {
  [key: string]: string | string[] | undefined;
};

export const buildQueryString = (params: RankingSearchParams): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "undefined") continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        query.append(key, item);
      }
      continue;
    }
    query.set(key, value);
  }

  const qs = query.toString();
  return qs ? `?${qs}` : "";
};

export function buildRankingMetadata(
  type: RankingType,
  searchParams: RankingSearchParams,
): Metadata {
  const worldName = normalizeRankingWorldName(searchParams.world_name);
  const typeLabel = RANKING_LABELS[type];

  const isPaginated = normalizeRankingPage(searchParams.page, Infinity) > 1;

  const title =
    type === "level"
      ? worldName
        ? `메이플스토리M ${worldName} 월드 랭킹`
        : "메이플스토리M 랭킹"
      : worldName
        ? `메이플스토리M ${worldName} 월드 ${typeLabel} 랭킹`
        : `메이플스토리M 전체 월드 ${typeLabel} 랭킹`;

  const description =
    type === "level"
      ? worldName
        ? `메이플스토리M ${worldName} 월드의 랭킹 정보를 확인하세요. 레벨, 무릉도장, 유니온, 전투력 등 주요 랭킹을 제공합니다.`
        : "메이플스토리M 전체 월드 랭킹 정보를 확인하세요. 레벨, 무릉도장, 유니온, 전투력 등 주요 랭킹을 제공합니다."
      : worldName
        ? `메이플스토리M ${worldName} 월드의 ${typeLabel} 랭킹을 확인하세요. 캐릭터 정보와 랭킹 변화를 한눈에 제공합니다.`
        : `메이플스토리M 전체 월드의 ${typeLabel} 랭킹 정보를 확인하세요. 캐릭터 정보와 랭킹 변화를 한눈에 제공합니다.`;

  const canonicalPath = type === "level" ? "/ranking" : `/ranking/${type}`;
  const fullUrl = worldName
    ? `${SITE_URL}${canonicalPath}?world_name=${encodeURIComponent(worldName)}`
    : `${SITE_URL}${canonicalPath}`;
  const ogImageUrl = `${SITE_URL}/og-image.png`;

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
          width: 1200,
          height: 630,
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
      index: !isPaginated,
      follow: true,
    },
  };
}

async function RankingBoardLoader({
  type,
  searchParams,
  highlight,
}: {
  type: RankingType;
  searchParams: RankingSearchParams;
  highlight?: RankingHighlight | null;
}) {
  const { data, params: fetchParams } = await getRankingPageData(
    type,
    searchParams,
  );

  return (
    <RankingBoard
      type={type}
      initialData={data}
      fetchParams={fetchParams}
      highlight={highlight}
    />
  );
}

// 데이터 페치를 loading.tsx 대신 페이지 내부 Suspense 로 스트리밍한다.
// 세그먼트에 loading.tsx 가 있으면 셸이 200으로 먼저 흘러나가
// notFound()/permanentRedirect() 가 진짜 404/308 상태코드를 내지 못한다.
export function renderRankingPage(
  type: RankingType,
  searchParams: RankingSearchParams,
) {
  const worldName = normalizeRankingWorldName(searchParams.world_name);
  const highlight =
    type === "level" ? readRankingHighlight(searchParams) : null;

  return (
    <>
      <h1 className="sr-only">
        {worldName || "전체"} 월드 {RANKING_LABELS[type]} 랭킹
      </h1>
      <p className="sr-only">
        메이플스토리M {RANKING_LABELS[type]} 랭킹 정보를 확인해보세요.
      </p>
      {/* 랭킹은 전체 10,000위까지만 집계돼 표에서 직접 찾기 어렵다.
          레벨 랭킹에 한해 월드+닉네임으로 순위와 페이지를 먼저 알려준다. */}
      {type === "level" && <RankingSearch searchParams={searchParams} />}

      <Suspense fallback={<RankingBoardSkeleton />}>
        <RankingBoardLoader
          type={type}
          searchParams={searchParams}
          highlight={highlight}
        />
      </Suspense>
    </>
  );
}
