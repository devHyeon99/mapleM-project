import { useQuery } from "@tanstack/react-query";
import { getCharacterSkillEquipment } from "../../api/get-skill-equipment";

export const useCharacterSkillEquipment = (ocid: string | null) => {
  return useQuery({
    queryKey: ["characterSkillEquipment", ocid],
    queryFn: () => getCharacterSkillEquipment(ocid!),
    enabled: !!ocid,
  });
};
