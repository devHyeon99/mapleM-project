import { formatEffectValue } from "@/entities/set-effect";

import type { BuildResult } from "../model";
import { EffectRow } from "./EffectRow";

interface BuildSummaryPanelProps {
  result: BuildResult;
}

export function BuildSummaryPanel({ result }: BuildSummaryPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">활성 세트</h3>
        {result.activeSets.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            세트가 선택되지 않았습니다.
          </p>
        ) : (
          <dl className="space-y-1">
            {result.activeSets.map((set) => (
              <EffectRow key={set.id} label={set.displayName}>
                {set.count}세트 | {set.totalStarForce} 스타포스
              </EffectRow>
            ))}
          </dl>
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <h3 className="text-sm font-semibold">총합 효과</h3>
        {result.totalEffects.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            적용 가능한 효과가 없습니다.
          </p>
        ) : (
          <dl className="space-y-1">
            {result.totalEffects.map((effect) => (
              <EffectRow key={effect.key} label={effect.label}>
                {formatEffectValue(effect.value, effect.unit)}
              </EffectRow>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
