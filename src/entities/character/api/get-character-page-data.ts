import { QueryClient, dehydrate } from "@tanstack/react-query";
import { characterQueryKeys } from "../model/queries/characterQueryKeys";
import { getCharacterDetails } from "./get-detail";
import { fetchOcid } from "@/shared/api/character/ocid.server";

interface CharacterPageData {
  dehydratedState: ReturnType<typeof dehydrate>;
  ocid: string;
  decodedName: string;
  decodedWorld: string;
}

export async function getCharacterPageData(
  world: string,
  name: string,
): Promise<CharacterPageData | null> {
  const decodedWorld = decodeURIComponent(world);
  const decodedName = decodeURIComponent(name);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const queryClient = new QueryClient();

  const ocidData = await fetchOcid(decodedWorld, decodedName).catch(() => null);

  if (!ocidData?.ocid) return null;

  const ocid = ocidData.ocid;
  const detailsKey = characterQueryKeys.details(ocid);

  await queryClient
    .prefetchQuery({
      queryKey: detailsKey,
      queryFn: () => getCharacterDetails(ocid, baseUrl),
    })
    .catch(() => undefined);

  return {
    dehydratedState: dehydrate(queryClient),
    ocid,
    decodedName,
    decodedWorld,
  };
}
