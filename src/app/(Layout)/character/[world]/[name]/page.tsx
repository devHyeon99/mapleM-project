import React from "react";
import { notFound } from "next/navigation";
import { CharacterSearch } from "@/features/character-search";
import { CharacterDetail } from "@/widgets/character-detail";
import { getCharacterPageData } from "@/entities/character/api/get-character-page-data";

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: CharacterPageProps) {
  const { world, name } = await params;
  const decodedWorld = decodeURIComponent(world);
  const decodedName = decodeURIComponent(name);
  const url = `/character/${world}/${name}`;

  return {
    title: {
      absolute: `${decodedName} (${decodedWorld}) - 캐릭터 정보 - 메이플스토리M`,
    },
    description: `${decodedWorld} 서버 ${decodedName} 캐릭터의 상세 정보를 확인하세요.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${decodedWorld} ${decodedName} 캐릭터 정보`,
      description: `${decodedName}님의 레벨, 직업, 장비 조회`,
      url: url,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "메엠지지 캐릭터 검색",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.png"],
    },
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { world, name } = await params;

  const pageData = await getCharacterPageData(world, name);
  if (!pageData) notFound();

  const { ocid, decodedName, decodedWorld, characterData } = pageData;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center pt-2 pb-6">
      <search className="mb-4 w-full max-w-3xl px-4" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>
      <h1 className="sr-only">
        {decodedName} ({decodedWorld}) 캐릭터 검색 결과
      </h1>

      <CharacterDetail ocid={ocid} characterData={characterData} />
    </div>
  );
}
