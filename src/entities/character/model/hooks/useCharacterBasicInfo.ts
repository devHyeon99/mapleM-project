import { CharacterDetailData } from "@/entities/character";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterBasicInfo = (ocid: string | null) =>
  useCharacterApi<CharacterDetailData>({
    ocid,
    endpoint: "/api/character/basic",
  });
