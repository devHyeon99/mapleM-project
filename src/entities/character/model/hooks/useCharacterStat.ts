import { CharacterStatSetResponse } from "@/entities/character";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterStat = (ocid: string | null) =>
  useCharacterApi<CharacterStatSetResponse>({
    ocid,
    endpoint: "/api/character/stat",
  });
