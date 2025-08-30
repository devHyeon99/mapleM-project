import { useQuery } from "@tanstack/react-query";
import { getCharacterSkillEquipment } from "../../api/get-skill-equipment";

export const useCharacterSkillEquipment = (ocid: string | null) => {
  return useQuery({
    queryKey: ["characterSkillEquipment", ocid],
    queryFn: () => getCharacterSkillEquipment(ocid!),
    enabled: !!ocid,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
