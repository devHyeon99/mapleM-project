import { useQuery } from "@tanstack/react-query";
import {
  getCharacterLinkSkill,
  type LinkSkillResponse,
} from "@/entities/skill";

export const useCharacterLinkSkill = (ocid: string | null) => {
  return useQuery<LinkSkillResponse, Error>({
    queryKey: ["characterLinkSkill", ocid],
    queryFn: () => getCharacterLinkSkill(ocid!),
    enabled: !!ocid,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
