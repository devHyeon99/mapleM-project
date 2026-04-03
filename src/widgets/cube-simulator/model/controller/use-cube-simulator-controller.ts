import { useCallback, useMemo } from "react";

import { POTENTIAL_MODE_OPTIONS } from "../domain/constants";
import { getAvailableTiers } from "../domain/calculator";
import { useCubeDataLoader } from "../data/use-cube-data-loader";
import { useCubeSimulatorState } from "../state/use-cube-simulator-state";

export function useCubeSimulatorController() {
  // 순수 상태 전이(입력값/롤 결과/옵션 파생값) 담당
  const { state, view, actions } = useCubeSimulatorState();

  // 잠재 데이터 비동기 로딩 담당
  const { availableLevels, potentialData, isDataLoading } = useCubeDataLoader({
    potentialMode: state.potentialMode,
    equipmentType: state.equipmentType,
    equipmentLevel: state.equipmentLevel,
  });

  const handleRoll = useCallback(() => {
    actions.applyRollWithData(potentialData);
  }, [actions, potentialData]);

  // 장비가 실제로 부여받을 수 있는 등급만 선택지로 노출
  const tierOptions = useMemo(() => {
    if (!potentialData) return view.tierOptions;
    const availableTiers = new Set<string>(getAvailableTiers(potentialData));
    return view.tierOptions.filter((option) =>
      availableTiers.has(option.value),
    );
  }, [potentialData, view.tierOptions]);

  // potentialData가 있으면 모드/장비 타입/레벨은 모두 채워진 상태
  const canRoll =
    !isDataLoading &&
    potentialData != null &&
    state.cubeType != null &&
    state.tier != null;

  return {
    state: {
      ...state,
      potentialData,
      availableLevels,
      isDataLoading,
      canRoll,
    },
    view: {
      ...view,
      potentialModeOptions: POTENTIAL_MODE_OPTIONS,
      tierOptions,
    },
    actions: {
      onPotentialModeChange: actions.handlePotentialModeChange,
      onCubeTypeChange: actions.handleCubeTypeChange,
      onTierChange: actions.handleTierChange,
      onEquipmentTypeChange: actions.handleEquipmentTypeChange,
      onEquipmentLevelChange: actions.handleEquipmentLevelChange,
      onRoll: handleRoll,
      onReset: actions.handleReset,
    },
  };
}
