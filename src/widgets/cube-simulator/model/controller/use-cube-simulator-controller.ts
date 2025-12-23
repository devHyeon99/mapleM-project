import { useCallback } from "react";

import { POTENTIAL_MODE_OPTIONS } from "../domain/constants";
import type { PotentialMode } from "../domain/types";
import { useCubeDataLoader } from "../data/use-cube-data-loader";
import { useCubeSimulatorState } from "../state/use-cube-simulator-state";

export function useCubeSimulatorController() {
  // 순수 상태 전이(입력값/롤 결과/옵션 파생값) 담당
  const { state, view, actions } = useCubeSimulatorState();

  // 잠재 데이터 비동기 로딩 + 레벨 정합성 보정 담당
  const { availableLevels, potentialData, isDataLoading } = useCubeDataLoader({
    potentialMode: state.potentialMode,
    equipmentType: state.equipmentType,
    equipmentLevel: state.equipmentLevel,
  });

  const handlePotentialModeChange = useCallback(
    (value: PotentialMode) => {
      actions.handlePotentialModeChange(value);
    },
    [actions],
  );

  const handleRoll = useCallback(() => {
    actions.applyRollWithData(potentialData);
  }, [actions, potentialData]);

  const canRoll =
    !isDataLoading &&
    state.potentialMode != null &&
    state.cubeType != null &&
    state.tier != null &&
    state.equipmentType != null &&
    state.equipmentLevel != null &&
    potentialData != null;

  return {
    state: {
      potentialMode: state.potentialMode,
      cubeType: state.cubeType,
      tier: state.tier,
      equipmentType: state.equipmentType,
      equipmentLevel: state.equipmentLevel,
      latestRoll: state.latestRoll,
      totalRollCount: state.totalRollCount,
      cubeUsageCounts: state.cubeUsageCounts,
      upgradeProgress: state.upgradeProgress,
      potentialData,
      availableLevels,
      isDataLoading,
      canRoll,
    },
    view: {
      equipmentTypeOptions: view.equipmentTypeOptions,
      cubeTypeOptions: view.cubeTypeOptions,
      potentialModeOptions: POTENTIAL_MODE_OPTIONS,
      tierOptions: view.tierOptions,
    },
    actions: {
      onCubeTypeChange: actions.handleCubeTypeChange,
      onTierChange: actions.handleTierChange,
      onPotentialModeChange: handlePotentialModeChange,
      onEquipmentTypeChange: actions.handleEquipmentTypeChange,
      onEquipmentLevelChange: actions.handleEquipmentLevelChange,
      onRoll: handleRoll,
      onReset: actions.handleReset,
    },
  };
}
