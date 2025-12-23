"use client";

import { CubeSettingsCard } from "./CubeSettingsCard";
import { CubeResultCard } from "./CubeResultCard";
import { CubeSimulatorHelpCard } from "./CubeSimulatorHelpCard";

import { useCubeSimulatorController } from "../model/controller/use-cube-simulator-controller";

export function CubeSimulator() {
  const { state, view, actions } = useCubeSimulatorController();

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <CubeSettingsCard
          potentialMode={state.potentialMode}
          cubeType={state.cubeType}
          tier={state.tier}
          equipmentType={state.equipmentType}
          equipmentLevel={state.equipmentLevel}
          availableLevels={state.availableLevels}
          potentialModeOptions={view.potentialModeOptions}
          cubeTypeOptions={view.cubeTypeOptions}
          equipmentTypeOptions={view.equipmentTypeOptions}
          tierOptions={view.tierOptions}
          isDataLoading={state.isDataLoading}
          canRoll={state.canRoll}
          onPotentialModeChange={actions.onPotentialModeChange}
          onCubeTypeChange={actions.onCubeTypeChange}
          onTierChange={actions.onTierChange}
          onEquipmentTypeChange={actions.onEquipmentTypeChange}
          onEquipmentLevelChange={actions.onEquipmentLevelChange}
          onRoll={actions.onRoll}
          onReset={actions.onReset}
        />

        <CubeResultCard
          potentialMode={state.potentialMode}
          cubeType={state.cubeType}
          tier={state.tier}
          potentialData={state.potentialData}
          latestRoll={state.latestRoll}
          totalRollCount={state.totalRollCount}
          cubeUsageCounts={state.cubeUsageCounts}
          upgradeProgress={state.upgradeProgress}
        />
        <CubeSimulatorHelpCard />
      </div>
    </section>
  );
}
