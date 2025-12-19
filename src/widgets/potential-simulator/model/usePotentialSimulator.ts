"use client";

import { useMemo, useState } from "react";

import {
  EQUIPMENT_CATEGORY_OPTIONS,
  FLAME_TYPE_OPTIONS,
  getSupportedLevelsByCategory,
} from "./domain/data";
import { simulateAdditionalOption } from "./domain/simulator";
import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
  SimulationResult,
} from "./domain/types";

function getFlameLabel(flameType: FlameType | null) {
  if (!flameType) return "-";
  return (
    FLAME_TYPE_OPTIONS.find((option) => option.type === flameType)?.label ?? "-"
  );
}

function getEquipmentLabel(category: EquipmentCategory | null) {
  if (!category) return "-";
  return (
    EQUIPMENT_CATEGORY_OPTIONS.find((option) => option.type === category)
      ?.label ?? "-"
  );
}

export function usePotentialSimulator() {
  // 선택한 환생의 불꽃 종류
  const [flameType, setFlameType] = useState<FlameType | null>(null);
  // 선택한 장비 분류
  const [equipmentCategory, setEquipmentCategory] =
    useState<EquipmentCategory | null>(null);
  // 선택한 장비 레벨(기계심장 분류에서는 사용하지 않음)
  const [equipmentLevel, setEquipmentLevel] = useState<EquipmentLevel | null>(
    null,
  );
  // 선택한 기계심장 등급(기계심장 분류에서만 사용)
  const [heartGrade, setHeartGrade] = useState<HeartGrade | null>(null);
  // 마지막 시뮬레이션 결과
  const [latestResult, setLatestResult] = useState<SimulationResult | null>(
    null,
  );
  // 누적 시뮬레이션 실행 횟수
  const [totalRollCount, setTotalRollCount] = useState(0);
  // 강력한 환생의 불꽃 2줄 고정 여부
  const [isPowerfulTwoLineLocked, setIsPowerfulTwoLineLocked] = useState(false);

  // 현재 장비 분류에서 선택 가능한 레벨 목록
  const availableLevels = useMemo(
    () =>
      equipmentCategory ? getSupportedLevelsByCategory(equipmentCategory) : [],
    [equipmentCategory],
  );

  // 기계심장 분류 선택 여부
  const isHeartCategory = equipmentCategory === "heart";
  // 레벨 200 고정 분류 선택 여부
  const isFixedLevelCategory = equipmentCategory === "watch";
  // 실제 시뮬레이션에 사용할 선택 레벨
  const selectedLevel = isFixedLevelCategory ? 200 : equipmentLevel;
  // 실행 버튼 활성화 조건
  const isReadyToRoll =
    flameType != null &&
    equipmentCategory != null &&
    (isHeartCategory ? heartGrade != null : selectedLevel != null);

  // 결과 카드 표시용 불꽃 라벨
  const flameLabel = getFlameLabel(flameType);
  // 결과 카드 표시용 장비 라벨
  const equipmentLabel = getEquipmentLabel(equipmentCategory);

  // 결과 영역 상태(결과/횟수/2줄 고정)를 공통 초기화
  const resetResultState = () => {
    setLatestResult(null);
    setTotalRollCount(0);
    setIsPowerfulTwoLineLocked(false);
  };

  // 장비 분류 변경 핸들러: 분류에 맞게 레벨/등급 상태를 정리
  const handleEquipmentCategoryChange = (value: EquipmentCategory) => {
    setEquipmentCategory(value);
    resetResultState();

    if (value === "heart") {
      setEquipmentLevel(null);
      return;
    }

    setHeartGrade(null);
    setEquipmentLevel(value === "watch" ? 200 : null);
  };

  // 장비 레벨 변경 핸들러
  const handleEquipmentLevelChange = (value: EquipmentLevel) => {
    setEquipmentLevel(value);
    resetResultState();
  };

  // 기계심장 등급 변경 핸들러
  const handleHeartGradeChange = (value: HeartGrade) => {
    setHeartGrade(value);
    resetResultState();
  };

  // 시뮬레이션 실행 핸들러
  const handleRoll = () => {
    if (!isReadyToRoll || !flameType || !equipmentCategory) return;

    const result = simulateAdditionalOption({
      flameType,
      equipmentCategory,
      equipmentLevel: isHeartCategory
        ? null
        : (selectedLevel as EquipmentLevel | null),
      heartGrade: heartGrade ?? 2,
      forceTwoLines: flameType === "powerful" && isPowerfulTwoLineLocked,
    });

    if (!result) return;

    if (
      flameType === "powerful" &&
      result.lineCount === 2 &&
      !isPowerfulTwoLineLocked
    ) {
      setIsPowerfulTwoLineLocked(true);
    }

    setLatestResult(result);
    setTotalRollCount((count) => count + 1);
  };

  // 전체 설정/결과 초기화 핸들러
  const handleReset = () => {
    setFlameType(null);
    setEquipmentCategory(null);
    setEquipmentLevel(null);
    setHeartGrade(null);
    setLatestResult(null);
    setTotalRollCount(0);
    setIsPowerfulTwoLineLocked(false);
  };

  return {
    state: {
      flameType,
      equipmentCategory,
      heartGrade,
      selectedLevel,
      availableLevels,
      isHeartCategory,
      isFixedLevelCategory,
      canRoll: isReadyToRoll,
      flameLabel,
      equipmentLabel,
      totalRollCount,
      latestResult,
    },
    actions: {
      setFlameType,
      handleEquipmentCategoryChange,
      handleHeartGradeChange,
      handleEquipmentLevelChange,
      handleRoll,
      handleReset,
    },
  };
}
