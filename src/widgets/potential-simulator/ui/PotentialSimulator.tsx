"use client";

import { useMemo, useState } from "react";

import {
  EQUIPMENT_CATEGORY_OPTIONS,
  FLAME_TYPE_OPTIONS,
  getSupportedLevelsByCategory,
} from "../model/domain/data";
import { simulateAdditionalOption } from "../model/domain/simulator";
import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
  SimulationResult,
} from "../model/domain/types";

import { PotentialSimulatorResultCard } from "./PotentialSimulatorResultCard";
import { PotentialSimulatorSettingsCard } from "./PotentialSimulatorSettingsCard";
import PotentialSimulatorHelpCard from "./PotentialSimulatorHelpCard";

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

export function PotentialSimulator() {
  const [flameType, setFlameType] = useState<FlameType | null>(null);
  const [equipmentCategory, setEquipmentCategory] =
    useState<EquipmentCategory | null>(null);
  const [equipmentLevel, setEquipmentLevel] = useState<EquipmentLevel | null>(
    null,
  );
  const [heartGrade, setHeartGrade] = useState<HeartGrade | null>(null);
  const [latestResult, setLatestResult] = useState<SimulationResult | null>(
    null,
  );
  const [totalRollCount, setTotalRollCount] = useState(0);
  const [isPowerfulTwoLineLocked, setIsPowerfulTwoLineLocked] = useState(false);

  const availableLevels = useMemo(
    () =>
      equipmentCategory ? getSupportedLevelsByCategory(equipmentCategory) : [],
    [equipmentCategory],
  );

  const isHeartCategory = equipmentCategory === "heart";
  const isFixedLevelCategory = equipmentCategory === "watch";
  const selectedLevel = isFixedLevelCategory ? 200 : equipmentLevel;
  const isReadyToRoll =
    flameType != null &&
    equipmentCategory != null &&
    (isHeartCategory ? heartGrade != null : selectedLevel != null);

  const handleEquipmentCategoryChange = (value: EquipmentCategory) => {
    setEquipmentCategory(value);

    if (value === "heart") {
      setEquipmentLevel(null);
      return;
    }

    setHeartGrade(null);
    setEquipmentLevel(value === "watch" ? 200 : null);
  };

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

  const handleReset = () => {
    setFlameType(null);
    setEquipmentCategory(null);
    setEquipmentLevel(null);
    setHeartGrade(null);
    setLatestResult(null);
    setTotalRollCount(0);
    setIsPowerfulTwoLineLocked(false);
  };

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <PotentialSimulatorSettingsCard
          flameType={flameType}
          equipmentCategory={equipmentCategory}
          heartGrade={heartGrade}
          selectedLevel={selectedLevel}
          availableLevels={availableLevels}
          isHeartCategory={isHeartCategory}
          isFixedLevelCategory={isFixedLevelCategory}
          canRoll={isReadyToRoll}
          onFlameTypeChange={setFlameType}
          onEquipmentCategoryChange={handleEquipmentCategoryChange}
          onHeartGradeChange={setHeartGrade}
          onEquipmentLevelChange={setEquipmentLevel}
          onRoll={handleRoll}
          onReset={handleReset}
        />

        <PotentialSimulatorResultCard
          flameLabel={getFlameLabel(flameType)}
          equipmentLabel={getEquipmentLabel(equipmentCategory)}
          isHeartCategory={isHeartCategory}
          heartGrade={heartGrade}
          selectedLevel={selectedLevel}
          totalRollCount={totalRollCount}
          latestResult={latestResult}
        />
        <PotentialSimulatorHelpCard />
      </div>
    </section>
  );
}
