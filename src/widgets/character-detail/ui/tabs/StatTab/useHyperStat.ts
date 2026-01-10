import { useState } from "react";
import type { CharacterHyperStat } from "@/entities/character/model/types";

export const useHyperStat = (hyperStatData: CharacterHyperStat | undefined) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const activePresetNo = hyperStatData?.use_preset_no ?? 1;
  const availablePresetNos = hyperStatData?.hyper_stat.map(({ preset_no }) => preset_no) ?? [];
  const effectiveSelectedPreset =
    selectedPreset !== null && availablePresetNos.includes(selectedPreset)
      ? selectedPreset
      : activePresetNo;

  if (!hyperStatData) {
    return {
      selectedPreset: activePresetNo,
      onSelectPreset: setSelectedPreset,
      currentHyperStatInfo: [],
    };
  }

  const presetData = hyperStatData.hyper_stat.find(
    (preset) => preset.preset_no === effectiveSelectedPreset,
  );

  const currentHyperStatInfo =
    presetData?.hyper_stat_info.filter((info) => info.stat_level > 0) ?? [];

  return {
    selectedPreset: effectiveSelectedPreset,
    onSelectPreset: setSelectedPreset,
    currentHyperStatInfo,
  };
};
