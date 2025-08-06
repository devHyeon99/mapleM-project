import { CharacterBasicInfo } from "@/entities/character";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterBasicInfo = (ocid: string | null) =>
  useCharacterApi<CharacterBasicInfo>({
    ocid,
    endpoint: "/api/characters/basic",
  });
