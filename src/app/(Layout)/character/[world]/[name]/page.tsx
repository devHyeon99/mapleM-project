import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { CharacterSearch } from "@/features/character-search";
import { CharacterDetail } from "@/widgets/character-detail";
import { getCharacterPageData } from "./_lib/getCharacterPageData";
import { Metadata } from "next";

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { world, name } = await params;

  // 데이터 로딩 함수 재사용 (Request Memoization 덕분에 API 요청 비용 0)
  const { decodedName, decodedWorld, ocid } = await getCharacterPageData(
    world,
    name,
  );

  // ocid가 없으면(캐릭터 못 찾음) 기본값 반환
  if (!ocid) return { title: "캐릭터를 찾을 수 없음" };

  return {
    title: {
      absolute: `${decodedName} (${decodedWorld}) - 캐릭터 정보 - 메이플스토리M`,
    },
    description: `메이플스토리M ${decodedWorld} 서버 ${decodedName} 캐릭터의 아이템, 코디, 스킬, 기본 정보를 확인하세요.`,
    openGraph: {
      title: `${decodedName} - 메이플스토리M 캐릭터 검색`,
      description: `레벨, 직업, 아이템, 스킬 등 ${decodedName}님의 상세 정보`,
      images: ["/og-image.png"],
    },
  };
}

// 실제 페이지
export default async function CharacterPage({ params }: CharacterPageProps) {
  const { world, name } = await params;

  // 데이터 로딩 (위 generateMetadata랑 똑같은 함수 호출해도 안전함)
  const { dehydratedState, ocid, decodedName, decodedWorld } =
    await getCharacterPageData(world, name);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6">
      <CharacterSearch />
      <h1 className="sr-only">
        {decodedName} ({decodedWorld}) 캐릭터 검색 결과
      </h1>

      <HydrationBoundary state={dehydratedState}>
        <CharacterDetail ocid={ocid} />
      </HydrationBoundary>
    </div>
  );
}
