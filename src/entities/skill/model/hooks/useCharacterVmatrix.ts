import type { CharacterVMatrix } from "@/entities/skill/model";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterVmatrix = (ocid: string | null) =>
  useCharacterApi<CharacterVMatrix>({
    ocid,
    endpoint: "/api/character/vmatrix",
  });
