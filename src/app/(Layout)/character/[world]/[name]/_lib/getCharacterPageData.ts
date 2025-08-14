import { QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import {
  getOcidForSearch,
  getCharacterDetails,
  characterQueryKeys,
} from "@/entities/character";

export async function getCharacterPageData(world: string, name: string) {
  const decodedWorld = decodeURIComponent(world);
  const decodedName = decodeURIComponent(name);

  const queryClient = new QueryClient();

  // 1. OCID 조회
  const ocidKey = characterQueryKeys.ocid(decodedWorld, decodedName);
  const ocidData = await queryClient
    .fetchQuery({
      queryKey: ocidKey,
      queryFn: () => getOcidForSearch(decodedWorld, decodedName),
    })
    .catch(() => null); // 여기서는 null 반환하고 아래에서 처리

  if (!ocidData?.ocid) {
    notFound(); // Next.js의 notFound는 여기서 호출해도 페이지가 404로 이동
  }

  const ocid = ocidData.ocid;
  // 2. 상세 정보 Prefetch
  const detailsKey = characterQueryKeys.details(ocid);

  try {
    await queryClient.prefetchQuery({
      queryKey: detailsKey,
      queryFn: () => getCharacterDetails(ocid),
    });
  } catch (error) {
    console.error("상세 정보 Prefetch 실패:", error);
    // 상세 정보 실패는 페이지 전체 에러보다는 부분 UI 처리나 에러 로깅으로 넘김
  }

  // 3. 결과 반환
  return {
    dehydratedState: dehydrate(queryClient),
    ocid,
    decodedName,
    decodedWorld,
  };
}
