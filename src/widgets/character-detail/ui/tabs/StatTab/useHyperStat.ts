import { useState, useEffect, useMemo } from "react";
import { CharacterHyperStat } from "@/entities/character";

export const useHyperStat = (hyperStatData: CharacterHyperStat | undefined) => {
  // 선택된 프리셋 상태
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // 초기 데이터 로드 시 설정 (Side Effect)
  useEffect(() => {
    if (hyperStatData?.use_preset_no && selectedPreset === null) {
      setSelectedPreset(Number(hyperStatData.use_preset_no));
    }
  }, [hyperStatData, selectedPreset]);

  // 현재 활성화된 프리셋 번호 계산
  const activePresetNo =
    selectedPreset ?? Number(hyperStatData?.use_preset_no ?? 1);

  // 보여줄 데이터 필터링 (Logic)
  const currentHyperStatInfo = useMemo(() => {
    if (!hyperStatData) return [];

    const presetData = hyperStatData.hyper_stat.find(
      (preset) => preset.preset_no === activePresetNo,
    );

    // 레벨 0 제외
    return (
      presetData?.hyper_stat_info.filter((info) => info.stat_level > 0) || []
    );
  }, [hyperStatData, activePresetNo]);

  return {
    selectedPreset: activePresetNo, // UI에는 최종 결정된 번호만 줌
    onSelectPreset: setSelectedPreset,
    currentHyperStatInfo,
  };
};
