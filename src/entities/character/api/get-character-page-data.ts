import type { CharacterDetailData } from "../model/types";
import { fetchOcid } from "@/shared/api/character/ocid.server";
import { fetchCharacterDetail } from "@/shared/api/character/detail.server";

interface CharacterPageData {
  ocid: string;
  decodedName: string;
  decodedWorld: string;
  characterData: CharacterDetailData;
}

export async function getCharacterPageData(
  world: string,
  name: string,
): Promise<CharacterPageData | null> {
  const decodedWorld = decodeURIComponent(world);
  const decodedName = decodeURIComponent(name);

  const ocidData = await fetchOcid(decodedWorld, decodedName).catch(() => null);

  if (!ocidData?.ocid) return null;

  const ocid = ocidData.ocid;
  const characterData = await fetchCharacterDetail(ocid);

  return {
    ocid,
    decodedName,
    decodedWorld,
    characterData,
  };
}
