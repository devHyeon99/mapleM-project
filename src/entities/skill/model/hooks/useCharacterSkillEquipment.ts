import { useQuery } from "@tanstack/react-query";
import {
  getCharacterSkillEquipment,
  type CharacterSkillData,
} from "@/entities/skill";

export const useCharacterSkillEquipment = (ocid: string | null) => {
  return useQuery<CharacterSkillData, Error>({
    queryKey: ["characterSkillEquipment", ocid],
    queryFn: () => getCharacterSkillEquipment(ocid!),
    enabled: !!ocid,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
