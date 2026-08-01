"use client";

import { useCalculator } from "../model/use-calculator";
import { BuildEditorCard } from "./BuildEditorCard";
import { ComparisonCard } from "./ComparisonCard";

export function SetEffectCalculator() {
  const {
    buildA,
    buildB,
    resultA,
    resultB,
    comparisonRows,
    buildAHandlers,
    buildBHandlers,
  } = useCalculator();

  // 라벨을 한 곳에서 정의해 편집 카드와 비교표가 같은 이름을 쓰게 한다
  const builds = [
    {
      label: "세팅 A",
      state: buildA,
      result: resultA,
      handlers: buildAHandlers,
    },
    {
      label: "세팅 B",
      state: buildB,
      result: resultB,
      handlers: buildBHandlers,
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {builds.map(({ label, state, result, handlers }) => (
          <BuildEditorCard
            key={label}
            title={label}
            buildState={state}
            result={result}
            handlers={handlers}
          />
        ))}
      </div>

      <ComparisonCard rows={comparisonRows} />
    </div>
  );
}
