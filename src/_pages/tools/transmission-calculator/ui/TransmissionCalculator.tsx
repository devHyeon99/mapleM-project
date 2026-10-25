"use client";

import { useTransmissionCalculator } from "../model/useTransmissionCalculator";

import { TransmissionHelpCard } from "./TransmissionHelpCard";
import { TransmissionResultCard } from "./TransmissionResultCard";
import { TransmissionSettingsCard } from "./TransmissionSettingsCard";

export function TransmissionCalculator() {
  const { state, result, starforceOptions, actions } =
    useTransmissionCalculator();

  return (
    <section className="w-full space-y-4">
      <h2 className="sr-only">전수 옵션 선택과 비용</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <TransmissionSettingsCard
          state={state}
          starforceOptions={starforceOptions}
          onSourceTierChange={actions.onSourceTierChange}
          onTargetTierChange={actions.onTargetTierChange}
          onStarforceChange={actions.onStarforceChange}
          onPotentialChange={actions.onPotentialChange}
          onAdditionalPotentialChange={actions.onAdditionalPotentialChange}
          onAdditionalOptionChange={actions.onAdditionalOptionChange}
          onSoulChange={actions.onSoulChange}
          onReset={actions.onReset}
        />

        <TransmissionResultCard result={result} />
      </div>

      <TransmissionHelpCard />
    </section>
  );
}
