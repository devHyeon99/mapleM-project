import { useQuery } from "@tanstack/react-query";
import { getCharacterVmatrix, type CharacterVMatrix } from "@/entities/skill";

export const useCharacterVmatrix = (ocid: string | null, level: number) => {
  return useQuery<CharacterVMatrix, Error>({
    queryKey: ["characterVmatrix", ocid],
    queryFn: () => getCharacterVmatrix(ocid!),
    enabled: !!ocid && level >= 200,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
