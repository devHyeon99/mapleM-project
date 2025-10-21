import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRankingPageData } from "@/entities/ranking/api/get-ranking-page-data";
import {
  RANKING_TYPES,
  type RankingType,
} from "@/entities/ranking/model/types/ranking";
import { RankingBoard } from "@/widgets/ranking-board/ui/RankingBoard";
import { RANKING_LABELS } from "@/entities/ranking/model/constants";

interface RankingPageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 쿼리 파라미터가 배열일 경우 첫 번째 값을 반환
const getStringParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) return param[0];
  return param || "";
};

export async function generateMetadata({
  params,
  searchParams,
}: RankingPageProps): Promise<Metadata> {
  const { type } = await params;
  const sParams = await searchParams;

  const safeType = RANKING_TYPES.includes(type as RankingType)
    ? (type as RankingType)
    : "level";

  const worldName = getStringParam(sParams.world_name);
  const typeLabel = RANKING_LABELS[safeType];

  const title = worldName
    ? `메이플스토리M ${worldName} ${typeLabel} 랭킹`
    : `메이플스토리M 전체 월드 ${typeLabel} 랭킹`;

  const description = worldName
    ? `메이플스토리M ${worldName} 월드의 ${typeLabel} 순위를 확인하세요.`
    : `메이플스토리M 전체 월드의 ${typeLabel} 랭킹 정보를 한눈에 제공합니다.`;

  const canonicalUrl = `https://maplemgg.com/ranking/${safeType}`;

  return {
    title,
    description,
    alternates: {
      canonical: worldName
        ? `${canonicalUrl}?world_name=${encodeURIComponent(worldName)}`
        : canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: worldName
        ? `${canonicalUrl}?world_name=${encodeURIComponent(worldName)}`
        : canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RankingPage({
  params,
  searchParams,
}: RankingPageProps) {
  const { type } = await params;
  const sParams = await searchParams;

  if (!RANKING_TYPES.includes(type as RankingType)) {
    notFound();
  }
  const safeType = type as RankingType;

  // 데이터 페칭
  const { data, params: fetchParams } = await getRankingPageData(
    safeType,
    sParams,
  );

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        {/* 검색엔진 최적화를 위한 숨겨진 제목 */}
        <h1 className="sr-only">
          {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[safeType]} 랭킹
        </h1>

        <h2 className="wide:text-2xl wide:block my-2 hidden font-semibold">
          {RANKING_LABELS[safeType]} 랭킹
        </h2>

        <p className="sr-only">
          실시간으로 업데이트되는 메이플스토리M {RANKING_LABELS[safeType]} 순위
          정보를 확인해보세요.
        </p>

        <RankingBoard
          type={safeType}
          initialData={data}
          fetchParams={fetchParams}
        />
      </section>
    </div>
  );
}
