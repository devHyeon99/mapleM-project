"use client";

import { BuildEditorCard } from "./BuildEditorCard";
import { DiffResultCard } from "./DiffResultCard";
import { useCalculator } from "../model/use-calculator";

export function SetEffectCalculator() {
  const {
    buildA,
    buildB,
    resultA,
    resultB,
    diffEffects,
    diffDescription,
    buildAHandlers,
    buildBHandlers,
  } = useCalculator();

  return (
    <section className="w-full space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <BuildEditorCard
          title="세팅 A"
          buildState={buildA}
          result={resultA}
          onSetChange={buildAHandlers.onSetChange}
          onCountChange={buildAHandlers.onCountChange}
          onStarForceChange={buildAHandlers.onStarForceChange}
          onAddRow={buildAHandlers.onAddRow}
          onReset={buildAHandlers.onReset}
          onRemoveRow={buildAHandlers.onRemoveRow}
        />

        <BuildEditorCard
          title="세팅 B"
          buildState={buildB}
          result={resultB}
          onSetChange={buildBHandlers.onSetChange}
          onCountChange={buildBHandlers.onCountChange}
          onStarForceChange={buildBHandlers.onStarForceChange}
          onAddRow={buildBHandlers.onAddRow}
          onReset={buildBHandlers.onReset}
          onRemoveRow={buildBHandlers.onRemoveRow}
        />
      </div>

      <DiffResultCard diffEffects={diffEffects} description={diffDescription} />
    </section>
  );
}
