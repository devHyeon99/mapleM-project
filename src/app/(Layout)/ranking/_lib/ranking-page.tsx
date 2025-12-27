import type { Metadata } from "next";
import type { RankingType } from "@/entities/ranking/model/types/ranking";
import { getRankingPageData } from "@/entities/ranking/api/get-ranking-page-data";
import { RANKING_LABELS } from "@/entities/ranking/model/constants";
import { RankingBoard } from "@/widgets/ranking-board/ui/RankingBoard";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";

export type RankingSearchParams = {
  [key: string]: string | string[] | undefined;
};

const getStringParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) return param[0];
  return param || "";
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
  const worldName = getStringParam(searchParams.world_name);
  const typeLabel = RANKING_LABELS[type];

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
      index: true,
      follow: true,
    },
  };
}

export async function renderRankingPage(
  type: RankingType,
  searchParams: RankingSearchParams,
) {
  const { data, params: fetchParams } = await getRankingPageData(
    type,
    searchParams,
  );

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        <h1 className="sr-only">
          {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[type]} 랭킹
        </h1>
        <p className="sr-only">
          메이플스토리M {RANKING_LABELS[type]} 랭킹 정보를 확인해보세요.
        </p>
        <RankingBoard
          type={type}
          initialData={data}
          fetchParams={fetchParams}
        />
      </section>
    </div>
  );
}
