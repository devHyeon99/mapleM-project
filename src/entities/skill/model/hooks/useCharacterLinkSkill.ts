import { useQuery } from "@tanstack/react-query";
import { getCharacterLinkSkill } from "../../api/get-link-skill";

export const useCharacterLinkSkill = (ocid: string | null) => {
  return useQuery({
    queryKey: ["characterLinkSkill", ocid],
    queryFn: () => getCharacterLinkSkill(ocid!),
    enabled: !!ocid,
  });
};
