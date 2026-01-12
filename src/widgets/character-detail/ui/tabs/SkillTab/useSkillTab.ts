import { useMemo, useState } from "react";
import { useCharacterSkillEquipment } from "@/entities/skill/model/hooks/useCharacterSkillEquipment";
import type { CharacterEquipmentSkill } from "@/entities/skill/model/types/skill-equipment";

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
  const [setNoState, setSetNo] = useState<string>("1");

  const computed = useMemo(() => {
    if (!data?.skill?.equipment_skill) {
      return {
        skillSetKeys: [] as string[],
        modeNumber: 2 as 1 | 2,
        currentSetNo: "1",
        currentSetSkills: [] as CharacterEquipmentSkill[],
      };
    }

    const modeNum: 1 | 2 = mode === "B" ? 2 : 1;

    const filtered = data.skill.equipment_skill.filter(
      (s) => s.skill_mode === modeNum,
    );

    const grouped = groupSkillsBySet(filtered);

    const keys = Object.keys(grouped).sort((a, b) => Number(a) - Number(b));

    const currentSetNo = keys.includes(setNoState) ? setNoState : (keys[0] ?? "1");

    return {
      skillSetKeys: keys,
      modeNumber: modeNum,
      currentSetNo,
      currentSetSkills: grouped[currentSetNo] || [],
    };
  }, [data, mode, setNoState]);

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
      setNo: computed.currentSetNo,
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
