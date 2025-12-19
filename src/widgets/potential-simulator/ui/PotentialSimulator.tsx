"use client";

import { usePotentialSimulator } from "../model/usePotentialSimulator";

import { PotentialSimulatorResultCard } from "./PotentialSimulatorResultCard";
import { PotentialSimulatorSettingsCard } from "./PotentialSimulatorSettingsCard";
import PotentialSimulatorHelpCard from "./PotentialSimulatorHelpCard";

export function PotentialSimulator() {
  const { state, actions } = usePotentialSimulator();

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <PotentialSimulatorSettingsCard
          flameType={state.flameType}
          equipmentCategory={state.equipmentCategory}
          heartGrade={state.heartGrade}
          selectedLevel={state.selectedLevel}
          availableLevels={state.availableLevels}
          isHeartCategory={state.isHeartCategory}
          isFixedLevelCategory={state.isFixedLevelCategory}
          canRoll={state.canRoll}
          onFlameTypeChange={actions.setFlameType}
          onEquipmentCategoryChange={actions.handleEquipmentCategoryChange}
          onHeartGradeChange={actions.handleHeartGradeChange}
          onEquipmentLevelChange={actions.handleEquipmentLevelChange}
          onRoll={actions.handleRoll}
          onReset={actions.handleReset}
        />

        <PotentialSimulatorResultCard
          flameLabel={state.flameLabel}
          equipmentLabel={state.equipmentLabel}
          isHeartCategory={state.isHeartCategory}
          heartGrade={state.heartGrade}
          selectedLevel={state.selectedLevel}
          totalRollCount={state.totalRollCount}
          latestResult={state.latestResult}
        />
        <PotentialSimulatorHelpCard />
      </div>
    </section>
  );
}
