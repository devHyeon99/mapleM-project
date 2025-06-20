import { CharacterBasicInfo } from "@/types/character";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterBasicInfo = (ocid: string | null) =>
  useCharacterApi<CharacterBasicInfo>({
    ocid,
    endpoint: "/api/characters/basic",
  });
