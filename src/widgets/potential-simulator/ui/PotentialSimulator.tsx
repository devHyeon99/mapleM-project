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

function getFlameLabel(flameType: FlameType) {
  return (
    FLAME_TYPE_OPTIONS.find((option) => option.type === flameType)?.label ?? "-"
  );
}

function getEquipmentLabel(category: EquipmentCategory) {
  return (
    EQUIPMENT_CATEGORY_OPTIONS.find((option) => option.type === category)?.label ??
    "-"
  );
}

export function PotentialSimulator() {
  const [flameType, setFlameType] = useState<FlameType>("powerful");
  const [equipmentCategory, setEquipmentCategory] =
    useState<EquipmentCategory>("weapon");
  const [equipmentLevel, setEquipmentLevel] = useState<EquipmentLevel>(140);
  const [heartGrade, setHeartGrade] = useState<HeartGrade>(2);
  const [latestResult, setLatestResult] = useState<SimulationResult | null>(null);
  const [totalRollCount, setTotalRollCount] = useState(0);
  const [isPowerfulTwoLineLocked, setIsPowerfulTwoLineLocked] = useState(false);

  const availableLevels = useMemo(
    () => getSupportedLevelsByCategory(equipmentCategory),
    [equipmentCategory],
  );

  const isHeartCategory = equipmentCategory === "heart";
  const isFixedLevelCategory = equipmentCategory === "watch";
  const selectedLevel = availableLevels.includes(equipmentLevel)
    ? equipmentLevel
    : (availableLevels[0] ?? 140);

  const handleRoll = () => {
    const result = simulateAdditionalOption({
      flameType,
      equipmentCategory,
      equipmentLevel: isHeartCategory ? null : selectedLevel,
      heartGrade,
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
    setFlameType("powerful");
    setEquipmentCategory("weapon");
    setEquipmentLevel(140);
    setHeartGrade(2);
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
          onFlameTypeChange={setFlameType}
          onEquipmentCategoryChange={setEquipmentCategory}
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
          isPowerfulTwoLineLocked={isPowerfulTwoLineLocked}
          latestResult={latestResult}
        />
      </div>
    </section>
  );
}
