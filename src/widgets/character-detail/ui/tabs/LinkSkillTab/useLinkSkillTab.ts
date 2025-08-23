import { useMemo, useState } from "react";
import { useCharacterLinkSkill } from "@/entities/skill/model";
import { mergeLinkSkills } from "@/entities/skill/lib/mergeLinkSkills";

export const useLinkSkillTab = (ocid: string) => {
  const { data, isLoading, isError, error } = useCharacterLinkSkill(ocid);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // 각 프리셋의 스킬들을 병합 처리
  const mergedData = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      link_skill: data.link_skill.map((preset) => ({
        ...preset,
        link_skill_info: mergeLinkSkills(preset.link_skill_info),
      })),
    };
  }, [data]);

  const defaultPreset = data?.use_prest_no?.toString() || "1";
  const activePreset = selectedPreset || defaultPreset;

  const isEmpty = !data || data.link_skill.length === 0;

  return {
    mergedData,
    isLoading,
    isError,
    error,
    isEmpty,
    defaultPreset,
    activePreset,
    setSelectedPreset,
  };
};
