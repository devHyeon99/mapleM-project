"use client";

import { useStarforceSimulator } from "../model/useStarforceSimulator";

import { StarforceSimulatorHelpCard } from "./StarforceSimulatorHelpCard";
import { StarforceSimulatorResultCard } from "./StarforceSimulatorResultCard";
import { StarforceSimulatorSettingsCard } from "./StarforceSimulatorSettingsCard";

export function StarforceSimulator() {
  const { state, actions } = useStarforceSimulator();

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <StarforceSimulatorSettingsCard
          equipmentCategory={state.equipmentCategory}
          options={state.options}
          currentStar={state.currentStar}
          canEnhance={state.canEnhance}
          canUseSafetyShield={state.canUseSafetyShield}
          canUseProtectShield={state.canUseProtectShield}
          starSettingOptions={state.starSettingOptions}
          luckyDayRateOptions={state.luckyDayRateOptions}
          equipmentCategoryOptions={state.equipmentCategoryOptions}
          onEquipmentCategoryChange={actions.onEquipmentCategoryChange}
          onCurrentStarChange={actions.onCurrentStarChange}
          onStarCatchChange={actions.onStarCatchChange}
          onSafetyShieldChange={actions.onSafetyShieldChange}
          onProtectShieldChange={actions.onProtectShieldChange}
          onLuckyDayRateChange={actions.onLuckyDayRateChange}
          onEnhance={actions.onEnhance}
          onReset={actions.onReset}
        />

        <StarforceSimulatorResultCard
          equipmentCategory={state.equipmentCategory}
          currentStar={state.currentStar}
          totalAttemptCount={state.totalAttemptCount}
          successCount={state.successCount}
          keepCount={state.keepCount}
          decreaseCount={state.decreaseCount}
          destroyCount={state.destroyCount}
          safetyShieldUsageCount={state.safetyShieldUsageCount}
          protectShieldUsageCount={state.protectShieldUsageCount}
          luckyDayUsageCounts={state.luckyDayUsageCounts}
          expectedRate={state.expectedRate}
          latestResult={state.latestResult}
          maxStarforce={state.maxStarforce}
          isDestroyed={state.isDestroyed}
        />

        <StarforceSimulatorHelpCard />
      </div>
    </section>
  );
}
