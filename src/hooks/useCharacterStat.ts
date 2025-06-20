import { CharacterStatSetResponse } from "@/types/stat";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterStatSet = (ocid: string | null) =>
  useCharacterApi<CharacterStatSetResponse>({
    ocid,
    endpoint: "/api/characters/stat",
  });
