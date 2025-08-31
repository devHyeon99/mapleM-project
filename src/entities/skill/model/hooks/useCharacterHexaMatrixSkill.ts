import { useQuery } from "@tanstack/react-query";
import { getCharacterHexaMatrixSkill } from "../../api/get-hexamatrix-skill";
import type { CharacterHexaMatrixSkill } from "../types";

export const useCharacterHexaMatrixSkill = (
  ocid: string | null,
  level: number,
) => {
  return useQuery<CharacterHexaMatrixSkill, Error>({
    queryKey: ["characterHexaSkill", ocid],
    queryFn: () => getCharacterHexaMatrixSkill(ocid!),
    enabled: !!ocid && level >= 250,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
