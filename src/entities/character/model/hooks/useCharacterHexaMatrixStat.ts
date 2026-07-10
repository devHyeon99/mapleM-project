import { useQuery } from "@tanstack/react-query";
import { HEXA_LEVEL_REQUIREMENT } from "@/shared/config/constants/hexa";
import type { CharacterHexaMatrixStat } from "../types";
import { getCharacterHexaMatrixStat } from "../../api/get-hexamatrix-stat";

export const useCharacterHexaMatrixStat = (
  ocid: string | null,
  level: number,
) => {
  return useQuery<CharacterHexaMatrixStat, Error>({
    queryKey: ["characterHexaMatrixStat", ocid],
    queryFn: () => getCharacterHexaMatrixStat(ocid!),
    enabled: !!ocid && level >= HEXA_LEVEL_REQUIREMENT,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
