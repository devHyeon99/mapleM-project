import { useCallback, useMemo, useState } from "react";

import {
  ADDITIONAL_CUBE_TYPE_OPTIONS,
  POTENTIAL_TIER_OPTIONS,
  STANDARD_CUBE_TYPE_OPTIONS,
} from "../domain/constants";
import { rollPotentialCube } from "../domain/calculator";
import { getEquipmentTypeOptions } from "../data/potential-data";
import type { CubeRollResult, CubeType, PotentialMode } from "../domain/types";
import type {
  EquipmentPotentialData,
  PotentialTier,
} from "../domain/potential-types";

// 잠재 능력 등급에서 레전더리를 빼고 타입 정의. 등급업 출발점이 될 수 있는 등급만 포함
type UpgradeTier = Exclude<PotentialTier, "legendary">;

// 등급업이 몇번만에 되었는지 체크하기 위한 데이터 타입 정의
type UpgradeProgress = {
  rare: number | null;
  epic: number | null;
  unique: number | null;
};

type CubeUsageCounts = {
  red: number;
  black: number;
  additional: number;
  whiteAdditional: number;
};

// 등급업 몇번만에 되었는지 체크하는 기본값
const EMPTY_UPGRADE_PROGRESS: UpgradeProgress = {
  rare: null,
  epic: null,
  unique: null,
};

const EMPTY_CUBE_USAGE_COUNTS: CubeUsageCounts = {
  red: 0,
  black: 0,
  additional: 0,
  whiteAdditional: 0,
};

// 큐브 시뮬레이션 상태값
export function useCubeSimulatorState() {
  const [potentialMode, setPotentialMode] = useState<PotentialMode | null>(
    null,
  );
  const [cubeType, setCubeType] = useState<CubeType | null>(null);
  const [tier, setTier] = useState<PotentialTier | null>("rare");
  const [equipmentType, setEquipmentType] = useState<string | null>(null);
  const [equipmentLevel, setEquipmentLevel] = useState<number | null>(null);
  // 가장 최근 큐브 1회 결과를 담는 상태값
  const [latestRoll, setLatestRoll] = useState<CubeRollResult | null>(null);
  // 각 등급 구간별 등급업까지 걸린 큐브 횟수를 저장하는 상태값
  const [upgradeProgress, setUpgradeProgress] = useState<UpgradeProgress>(
    EMPTY_UPGRADE_PROGRESS,
  );
  // 마지막 등급업 이후 현재까지 누적된 큐브 시도 횟수 값
  const [attemptsSinceTierUp, setAttemptsSinceTierUp] = useState(0);
  // 총 큐브 시행 횟수 값
  const [totalRollCount, setTotalRollCount] = useState(0);
  // 레드/블랙 큐브 사용 횟수
  const [cubeUsageCounts, setCubeUsageCounts] = useState<CubeUsageCounts>(
    EMPTY_CUBE_USAGE_COUNTS,
  );

  // 장비 종류 목록 ( 예: 무기, 한벌옷, 상의... )
  // 본메 언더 컨트롤 하트가 나오기 전이라 에디셔널이 170레벨 이상부터 가능이라 적합한 하트가 아직 없어서 모드에 따라 장비 종류 목록이 바뀜
  // 추후에 언더 컨트롤 하트가 나오면 하나로 통합 해서 사용하면 됨.
  const equipmentTypeOptions = useMemo(
    () => (potentialMode ? getEquipmentTypeOptions(potentialMode) : []),
    [potentialMode],
  );

  // 잠재 종류에 따라 선택 가능한 큐브 종류 분기처리
  const cubeTypeOptions = useMemo(() => {
    if (!potentialMode) return [];
    return potentialMode === "potential"
      ? STANDARD_CUBE_TYPE_OPTIONS
      : ADDITIONAL_CUBE_TYPE_OPTIONS;
  }, [potentialMode]);

  // 큐브 설정 초기화 함수
  const resetRollState = useCallback(() => {
    setAttemptsSinceTierUp(0);
    setTotalRollCount(0);
    setLatestRoll(null);
    setUpgradeProgress(EMPTY_UPGRADE_PROGRESS);
    setCubeUsageCounts(EMPTY_CUBE_USAGE_COUNTS);
  }, []);

  // 로드된 잠재 데이터를 기준으로 실행 결과를 상태에 반영
  const applyRollWithData = useCallback(
    (potentialData: EquipmentPotentialData | null) => {
      // 데이터가 준비된 경우에만 실제 큐브 시뮬레이션 실행
      if (!potentialData || !tier || !cubeType || !equipmentType) return;

      // 현재 등급 구간에서 이번이 몇 번째 시도인지 계산
      const nextAttempt = attemptsSinceTierUp + 1;
      // 계산된 시도 횟수를 함께 넘겨 1회 큐브 결과를 생성
      const roll = rollPotentialCube(potentialData, tier, cubeType);
      // 유효한 티어/옵션 데이터가 없으면 결과가 없을 수 있으므로 종료
      if (!roll) return;

      setTier(roll.resolvedTier);
      setTotalRollCount((count) => count + 1);
      setCubeUsageCounts((prev) => ({
        ...prev,
        [cubeType]: prev[cubeType] + 1,
      }));
      // 등급업에 따른 등급업 시도 횟수 초기화
      setAttemptsSinceTierUp(
        roll.startingTier !== roll.resolvedTier ? 0 : nextAttempt,
      );

      // 잠재등급 구간별 최초 등급업 시도 횟수 기록
      if (
        roll.startingTier !== "legendary" &&
        roll.startingTier !== roll.resolvedTier
      ) {
        const startingTier = roll.startingTier as UpgradeTier;
        setUpgradeProgress((prev) => ({
          ...prev,
          [startingTier]: prev[startingTier] ?? nextAttempt,
        }));
      }

      setLatestRoll(roll);
    },
    [attemptsSinceTierUp, cubeType, equipmentType, tier],
  );

  // 큐브 설정 초기화 핸들러
  const handleReset = useCallback(() => {
    setPotentialMode(null);
    setCubeType(null);
    setTier("rare");
    setEquipmentType(null);
    setEquipmentLevel(null);
    resetRollState();
  }, [resetRollState]);

  // 잠재 종류 변경 핸들러
  const handlePotentialModeChange = useCallback(
    (value: PotentialMode) => {
      setPotentialMode(value);
      setCubeType(null);
      setTier("rare");
      setEquipmentType(null);
      setEquipmentLevel(null);
      resetRollState();
    },
    [resetRollState],
  );

  // 큐브 종류 변경 핸들러
  const handleCubeTypeChange = useCallback((value: CubeType) => {
    setCubeType(value);
  }, []);

  // 잠재 등급 변경 핸들러
  const handleTierChange = useCallback((value: PotentialTier) => {
    setTier(value);
    setAttemptsSinceTierUp(0);
  }, []);

  // 장비 종류 변경 핸들러
  const handleEquipmentTypeChange = useCallback(
    (value: string) => {
      setEquipmentType(value);
      setEquipmentLevel(null);
      setTier("rare");
      resetRollState();
    },
    [resetRollState],
  );

  // 장비 레벨 변경 핸들러
  const handleEquipmentLevelChange = useCallback(
    (value: number) => {
      setEquipmentLevel(value);
      setTier("rare");
      resetRollState();
    },
    [resetRollState],
  );

  return {
    state: {
      potentialMode,
      cubeType,
      tier,
      equipmentType,
      equipmentLevel,
      latestRoll,
      upgradeProgress,
      totalRollCount,
      cubeUsageCounts,
    },
    view: {
      equipmentTypeOptions,
      cubeTypeOptions,
      tierOptions: POTENTIAL_TIER_OPTIONS,
    },
    actions: {
      applyRollWithData,
      handleReset,
      handlePotentialModeChange,
      handleCubeTypeChange,
      handleTierChange,
      handleEquipmentTypeChange,
      handleEquipmentLevelChange,
    },
  };
}
