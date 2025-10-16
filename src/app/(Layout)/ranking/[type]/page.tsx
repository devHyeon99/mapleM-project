import React from "react";
import { Metadata } from "next";
import { getRankingPageData } from "@/entities/ranking/api/get-ranking-page-data";
import {
  RANKING_TYPES,
  type RankingType,
} from "@/entities/ranking/model/types/ranking";
import { RankingBoard } from "@/widgets/ranking-board/ui/RankingBoard";
import { notFound } from "next/navigation";

interface RankingPageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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

  const { data, params: fetchParams } = await getRankingPageData(
    safeType,
    sParams,
  );

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        <h1 className="wide:text-2xl wide:block my-2 hidden font-semibold">
          {RANKING_LABELS[safeType]} 랭킹
        </h1>
        <p className="sr-only">
          메엠지지에서 메이플스토리M {fetchParams.worldName || "전체"} 월드{" "}
          {RANKING_LABELS[safeType]} 랭킹을 확인해보세요.
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
