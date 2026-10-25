import { useState } from "react";
import type { CharacterHyperStat } from "@/entities/character";

export const useHyperStat = (
  hyperStatData: CharacterHyperStat | null | undefined,
) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // preset_count 는 보유 개수라 실제로 찍은 게 없는 프리셋까지 세므로 쓰지 않음.
  // API 가 순서를 보장하지 않아 정렬도 같이 함
  const availablePresetNos =
    hyperStatData?.hyper_stat
      .filter((preset) =>
        preset.hyper_stat_info?.some((info) => info.stat_level > 0),
      )
      .map(({ preset_no }) => preset_no)
      .sort((a, b) => a - b) ?? [];

  const usePresetNo = hyperStatData?.use_preset_no;
  const activePresetNo =
    usePresetNo != null && availablePresetNos.includes(usePresetNo)
      ? usePresetNo
      : (availablePresetNos[0] ?? null);

  const effectiveSelectedPreset =
    selectedPreset !== null && availablePresetNos.includes(selectedPreset)
      ? selectedPreset
      : activePresetNo;

  const presetData = hyperStatData?.hyper_stat.find(
    (preset) => preset.preset_no === effectiveSelectedPreset,
  );

  const currentHyperStatInfo =
    presetData?.hyper_stat_info.filter((info) => info.stat_level > 0) ?? [];

  return {
    selectedPreset: effectiveSelectedPreset,
    onSelectPreset: setSelectedPreset,
    availablePresetNos,
    currentHyperStatInfo,
  };
};
