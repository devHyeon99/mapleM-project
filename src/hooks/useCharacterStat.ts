import { CharacterStatSetResponse } from "@/types/stat";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterStatSet = (ocid: string | null) =>
  useCharacterApi<CharacterStatSetResponse>({
    ocid,
    endpoint: "/api/characters/stat",
  });
