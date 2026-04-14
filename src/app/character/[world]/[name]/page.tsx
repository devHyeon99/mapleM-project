import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { CharacterSearch } from "@/features/character-search";
import { CharacterDetail } from "@/widgets/character-detail";
import { fetchOcid, fetchCharacterDetail } from "@/entities/character/server";
import { safeDecode } from "@/shared/lib/url";
import { worldFromSlug } from "@/shared/config/constants/worlds";
import { NotFoundMetadata } from "./not-found";

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

// generateMetadata 와 페이지 렌더가 같은 요청에서 각각 호출하므로 cache 로 묶는다.
// 감싸지 않으면 넥슨 API 를 두 번씩 부른다.
const getPageData = cache(async (world: string, name: string) => {
  const ocidData = await fetchOcid(world, name);
  if (!ocidData?.ocid) return null;

  const characterData = await fetchCharacterDetail(ocidData.ocid);
  if (!characterData) return null;

  return { ocid: ocidData.ocid, characterData };
});

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { world, name } = await params;
  const decodedWorld = worldFromSlug(safeDecode(world));
  const decodedName = safeDecode(name);

  // 존재하지 않는 캐릭터에도 그럴듯한 제목이 붙으면, 죽은 링크를 공유했을 때
  // 실존하는 캐릭터처럼 미리보기가 뜬다. noindex 라 검색에는 영향이 없지만
  // 카카오톡·디스코드 공유에는 그대로 노출된다.
  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) return NotFoundMetadata;

  const title = `${decodedName} (${decodedWorld}) - 캐릭터 정보`;
  const description = `${decodedWorld} 서버 ${decodedName} 캐릭터의 상세 정보를 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { world, name } = await params;
  const decodedWorld = worldFromSlug(safeDecode(world));
  const decodedName = safeDecode(name);

  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) notFound();

  const { ocid, characterData } = pageData;

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 pb-6">
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
