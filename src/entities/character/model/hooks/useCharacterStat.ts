import { CharacterStatResponse } from "@/entities/character";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterStat = (ocid: string | null) =>
  useCharacterApi<CharacterStatResponse>({
    ocid,
    endpoint: "/api/character/stat",
  });
