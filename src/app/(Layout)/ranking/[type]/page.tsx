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

  // 타입 안전성 확보 및 라벨 추출
  const safeType = RANKING_TYPES.includes(type as RankingType)
    ? (type as RankingType)
    : "level";

  const worldName = getStringParam(sParams.world_name);
  const typeLabel = RANKING_LABELS[safeType];

  // 동적 텍스트 생성
  const title = worldName
    ? `메이플스토리M ${worldName} 월드 ${typeLabel} 랭킹`
    : `메이플스토리M 전체 월드 ${typeLabel} 랭킹`;

  const description = worldName
    ? `메이플스토리M ${worldName} 월드의 ${typeLabel} 랭킹을 확인하세요. 캐릭터 정보와 랭킹 변화를 한눈에 제공합니다.`
    : `메이플스토리M 전체 월드의 ${typeLabel} 랭킹 정보를 확인하세요. 캐릭터 정보와 랭킹 변화를 한눈에 제공합니다.`;

  // URL 및 이미지 경로 설정 (절대 경로 필수)
  const baseUrl = "https://maplemgg.com";
  const canonicalPath = `/ranking/${safeType}`;
  const fullUrl = worldName
    ? `${baseUrl}${canonicalPath}?world_name=${encodeURIComponent(worldName)}`
    : `${baseUrl}${canonicalPath}`;

  const ogImageUrl = `${baseUrl}/og-image.png`;

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
      siteName: "메엠지지",
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
      index: false,
      follow: false,
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

  const { data, params: fetchParams } = await getRankingPageData(
    safeType,
    sParams,
  );

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        <h1 className="sr-only">
          {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[safeType]} 랭킹
        </h1>

        <p className="sr-only">
          메이플스토리M {RANKING_LABELS[safeType]} 랭킹 정보를 확인해보세요.
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
