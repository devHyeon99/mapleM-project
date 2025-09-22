import React from "react";
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

export default async function RankingPage({
  params,
  searchParams,
}: RankingPageProps) {
  const { type } = await params;
  const sParams = await searchParams;

  // 유효하지 않은 타입 체크
  if (!RANKING_TYPES.includes(type as RankingType)) {
    notFound();
  }

  const safeType = type as RankingType;

  // 데이터 프리패칭 로직 호출
  // 여기서 params는 { worldName, date, page: uiPage } 형태
  const { dehydratedState, params: fetchParams } = await getRankingPageData(
    safeType,
    sParams,
  );

  return (
    <div className="flex w-full items-center justify-center">
      <section className="w-full max-w-4xl">
        {/* w-full 추가 (레이아웃 안정성) */}
        <h1 className="mt-2 mb-4 text-center text-xl font-bold md:text-2xl">
          메이플스토리M 캐릭터 랭킹
        </h1>
        <p className="hidden">
          메엠지지에서 메이플스토리M 캐릭터 종합 랭킹을 확인해보세요.
        </p>
        {/* 3. Hydration 적용 */}
        <HydrationBoundary state={dehydratedState}>
          {/* fetchParams에는 uiPage가 들어있어서 페이지네이션 UI가 올바르게 표시됨 */}
          <RankingBoard type={safeType} fetchParams={fetchParams} />
        </HydrationBoundary>
      </section>
    </div>
  );
}
