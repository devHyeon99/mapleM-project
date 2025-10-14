import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { getRankingPageData } from "./_lib/getRankingPageData";
import { RANKING_TYPES } from "@/entities/ranking/model/types/ranking";
import type { RankingType } from "@/entities/ranking/model/types/ranking";
import { RankingBoard } from "@/widgets/ranking-board/ui/RankingBoard";

interface RankingPageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 타입별 한글 라벨 매핑 (SEO 및 제목용)
const RANKING_LABELS: Record<RankingType, string> = {
  level: "레벨",
  dojang: "무릉도장",
  "root-of-time": "시간의 근원",
  union: "유니온",
  "combat-power": "전투력",
  "kerning-m-tower": "커닝 M 타워",
  achievement: "업적",
  "sharenian-battlefield": "샤레니안 전장",
  "sharenian-waterway": "지하수로",
};

export async function generateMetadata({
  params,
  searchParams,
}: RankingPageProps): Promise<Metadata> {
  const { type } = await params;
  const sParams = await searchParams;

  const worldName = (sParams.world_name as string) || "";
  const safeType = type as RankingType;
  const typeLabel = RANKING_LABELS[safeType] || "캐릭터";

  const title = worldName
    ? `메이플스토리M ${worldName} ${typeLabel} 랭킹`
    : `메이플스토리M 전체 월드 ${typeLabel} 랭킹`;

  const description = worldName
    ? `메이플스토리M ${worldName} 월드의 ${typeLabel} 순위를 확인하세요.`
    : `메이플스토리M 전체 월드의 ${typeLabel} 랭킹 정보를 한눈에 제공합니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://maplemgg.com/ranking/${type}${worldName ? `?world_name=${encodeURIComponent(worldName)}` : ""}`,
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

  const { dehydratedState, params: fetchParams } = await getRankingPageData(
    safeType,
    sParams,
  );

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="w-full max-w-4xl px-4 md:px-0">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
          메이플스토리M {RANKING_LABELS[safeType]} 랭킹
        </h1>

        <p className="sr-only">
          메엠지지에서 메이플스토리M {fetchParams.worldName || "전체"} 월드{" "}
          {RANKING_LABELS[safeType]} 랭킹을 확인해보세요.
        </p>

        <HydrationBoundary state={dehydratedState}>
          <RankingBoard type={safeType} fetchParams={fetchParams} />
        </HydrationBoundary>
      </section>
    </div>
  );
}
