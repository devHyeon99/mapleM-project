import { useState, useMemo, useEffect } from "react";
import { useCharacterSkillEquipment } from "@/entities/skill/model";
import type { CharacterEquipmentSkill } from "@/entities/skill/model";

// 헬퍼 함수
const groupSkillsBySet = (skills: CharacterEquipmentSkill[]) => {
  return skills.reduce<Record<string, CharacterEquipmentSkill[]>>((acc, s) => {
    if (!acc[s.equipment_skill_set]) {
      acc[s.equipment_skill_set] = [];
    }
    acc[s.equipment_skill_set].push(s);
    return acc;
  }, {});
};

export const useSkillTab = (ocid: string) => {
  const { data, isLoading, isError, error } = useCharacterSkillEquipment(ocid);

  const [mode, setMode] = useState<"A" | "B">("B");
  const [setNo, setSetNo] = useState<string>("1");

  const computed = useMemo(() => {
    if (!data?.skill?.equipment_skill) {
      return {
        groupedSkills: {} as Record<string, CharacterEquipmentSkill[]>,
        skillSetKeys: [] as string[],
        modeNumber: 2 as 1 | 2,
        currentSetSkills: [] as CharacterEquipmentSkill[],
      };
    }

    const modeNum: 1 | 2 = mode === "B" ? 2 : 1;

    const filtered = data.skill.equipment_skill.filter(
      (s) => s.skill_mode === modeNum,
    );

    const grouped = groupSkillsBySet(filtered);

    const keys = Object.keys(grouped).sort();

    return {
      groupedSkills: grouped,
      skillSetKeys: keys,
      modeNumber: modeNum,
      currentSetSkills: grouped[setNo] || [],
    };
  }, [data, mode, setNo]);

  useEffect(() => {
    if (
      computed.skillSetKeys.length > 0 &&
      !computed.skillSetKeys.includes(setNo)
    ) {
      setSetNo(computed.skillSetKeys[0]);
    }
  }, [computed.skillSetKeys, setNo]);

  const hasEquipment = (data?.skill?.equipment_skill?.length ?? 0) > 0;
  const hasPreset = (data?.skill?.preset?.length ?? 0) > 0;

  return {
    query: {
      data,
      isLoading,
      isError,
      error,
    },
    ui: {
      mode,
      setMode,
      setNo,
      setSetNo,
    },
    layout: {
      ...computed,
      hasEquipment,
      hasPreset,
      hasSetData: computed.skillSetKeys.length > 0,
    },
  };
};
