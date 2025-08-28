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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const queryClient = new QueryClient();

  const ocidKey = characterQueryKeys.ocid(decodedWorld, decodedName);
  const ocidData = await queryClient
    .fetchQuery({
      queryKey: ocidKey,
      queryFn: () => getOcidForSearch(decodedWorld, decodedName, baseUrl),
    })
    .catch(() => null);

  if (!ocidData?.ocid) notFound();

  const ocid = ocidData.ocid;

  const detailsKey = characterQueryKeys.details(ocid);

  try {
    await queryClient.prefetchQuery({
      queryKey: detailsKey,
      queryFn: () => getCharacterDetails(ocid, baseUrl),
    });
  } catch (e) {
    console.error("상세 정보 Prefetch 실패:", e);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    ocid,
    decodedName,
    decodedWorld,
  };
}
