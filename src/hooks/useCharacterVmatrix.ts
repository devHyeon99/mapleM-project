import { CharacterVMatrix } from "@/types/Vmatrix";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterVmatrix = (ocid: string | null) =>
  useCharacterApi<CharacterVMatrix>({
    ocid,
    endpoint: "/api/characters/vmatrix",
  });
