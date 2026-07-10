import { getCharacterHexaMatrixSkill } from "../../api/get-hexamatrix-skill";
import type { CharacterHexaMatrixSkill } from "../types/hexamatrix-skill";
import { useQuery } from "@tanstack/react-query";
import { HEXA_LEVEL_REQUIREMENT } from "@/shared/config/constants/hexa";

export const useCharacterHexaMatrixSkill = (
  ocid: string | null,
  level: number,
) => {
  return useQuery<CharacterHexaMatrixSkill, Error>({
    queryKey: ["characterHexaSkill", ocid],
    queryFn: () => getCharacterHexaMatrixSkill(ocid!),
    enabled: !!ocid && level >= HEXA_LEVEL_REQUIREMENT,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
