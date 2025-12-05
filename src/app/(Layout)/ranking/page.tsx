import React from "react";
import { Metadata } from "next";
import { getRankingPageData } from "@/entities/ranking/api/get-ranking-page-data";
import { RankingBoard } from "@/widgets/ranking-board/ui/RankingBoard";
import { RANKING_LABELS } from "@/entities/ranking/model/constants";

interface RankingRootPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getStringParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) return param[0];
  return param || "";
};

export async function generateMetadata({
  searchParams,
}: RankingRootPageProps): Promise<Metadata> {
  const sParams = await searchParams;
  const worldName = getStringParam(sParams.world_name);

  const title = worldName
    ? `메이플스토리M ${worldName} 월드 랭킹`
    : "메이플스토리M 랭킹";

  const description = worldName
    ? `메이플스토리M ${worldName} 월드의 랭킹 정보를 확인하세요. 레벨, 무릉도장, 유니온, 전투력 등 주요 랭킹을 메엠지지에서 제공합니다.`
    : "메이플스토리M 전체 월드 랭킹 정보를 확인하세요. 레벨, 무릉도장, 유니온, 전투력 등 주요 랭킹을 메엠지지에서 제공합니다.";

  const baseUrl = "https://maplemgg.com";
  const canonicalPath = "/ranking";
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
      index: true,
      follow: true,
    },
  };
}

export default async function RankingRootPage({
  searchParams,
}: RankingRootPageProps) {
  const sParams = await searchParams;
  const levelType = "level";

  const { data, params: fetchParams } = await getRankingPageData(levelType, sParams);

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        <h1 className="sr-only">
          {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[levelType]} 랭킹
        </h1>

        <p className="sr-only">
          메이플스토리M {RANKING_LABELS[levelType]} 랭킹 정보를 확인해보세요.
        </p>

        <RankingBoard
          type={levelType}
          initialData={data}
          fetchParams={fetchParams}
        />
      </section>
    </div>
  );
}
