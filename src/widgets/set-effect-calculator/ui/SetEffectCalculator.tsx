"use client";

import { useCalculator } from "../model";
import { BuildEditorCard } from "./BuildEditorCard";
import { ComparisonCard } from "./ComparisonCard";
import { SetEffectHelpCard } from "./SetEffectHelpCard";

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
    <section className="w-full space-y-4">
      <h2 className="sr-only">세팅 입력과 비교</h2>

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

      <SetEffectHelpCard />
    </section>
  );
}
