import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { CharacterSearch } from "@/components/domain/character-search/CharacterSearch";

import { getOcid, getCharacterDetails } from "@/lib/nexonApi";
import { characterQueryKeys } from "@/queries/characterQueryKeys";
import { CharacterDetail } from "@/components/domain/character/CharacterDetail";

// Next.js 15에서는 params가 Promise<{ world: string; name: string }> 형태로 들어옴
interface CharacterPageProps {
  params: Promise<{
    world: string;
    name: string;
  }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  // 반드시 await 해야 함
  const { world, name } = await params;

  const decodedWorld = decodeURIComponent(world);
  const decodedName = decodeURIComponent(name);

  const queryClient = new QueryClient();

  // --- OCID 조회 ---
  const ocidKey = characterQueryKeys.ocid(decodedWorld, decodedName);
  const ocidData = await queryClient
    .fetchQuery({
      queryKey: ocidKey,
      queryFn: () => getOcid(decodedWorld, decodedName),
    })
    .catch(() => notFound());

  const ocid = ocidData?.ocid;
  if (!ocid) notFound();

  // --- 캐릭터 상세 정보 (병렬 4개) Prefetch ---
  const detailsKey = characterQueryKeys.details(ocid);
  try {
    await queryClient.prefetchQuery({
      queryKey: detailsKey,
      queryFn: () => getCharacterDetails(ocid),
    });
  } catch (error) {
    console.error("상세 정보 Prefetch 실패:", error);
  }

  // --- Hydration ---
  const dehydratedState = dehydrate(queryClient);

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
