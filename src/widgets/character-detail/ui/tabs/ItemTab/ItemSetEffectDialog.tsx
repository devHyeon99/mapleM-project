import type { ReactNode } from "react";
import {
  ABSOLABS_CORRECTION_NOTE,
  formatEffectValue,
  type ActiveEquipmentSet,
  type ResolvedSetEffectRow,
} from "@/entities/set-effect";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";

interface ItemSetEffectDialogProps {
  set: ActiveEquipmentSet;
  trigger: ReactNode;
}

const toValueMap = (effects: ResolvedSetEffectRow[]) =>
  new Map(effects.map((effect) => [effect.key, effect.value]));

export const ItemSetEffectDialog = ({
  set,
  trigger,
}: ItemSetEffectDialogProps) => {
  const setValues = toValueMap(set.effects);
  const starForceValues = toValueMap(set.starForceEffects);

  return (
    <StickyFooterDialog
      trigger={trigger}
      title={`${set.displayName} 세트 효과`}
      description={`${set.displayName} ${set.count}세트 착용 시 적용되는 능력치입니다.`}
      contentClassName="sm:max-w-sm"
      showScrollAffordance
      header={
        <>
          <header className="border-b pb-3">
            <p className="text-lg font-bold">{set.displayName}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs font-medium">
              <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-500">
                {set.count}세트 착용
              </span>
              {set.appliedStarForceThreshold !== null && (
                <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5">
                  스타포스 {set.totalStarForce}성 ·{" "}
                  {set.appliedStarForceThreshold}성 효과 적용
                </span>
              )}
            </div>
          </header>
          <p className="text-muted-foreground pt-3 text-xs font-semibold">
            합산 능력치
          </p>
        </>
      }
    >
      <section aria-label="합산 능력치">
        <dl className="flex flex-col gap-2">
          {set.combinedEffects.map((effect) => {
            const fromSet = setValues.get(effect.key);
            const fromStarForce = starForceValues.get(effect.key);

            return (
              <div
                key={effect.key}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-[13px] md:text-sm"
              >
                <dt className="text-muted-foreground">{effect.label}</dt>
                <dd className="ml-auto font-semibold tabular-nums">
                  {formatEffectValue(effect.value, effect.unit)}
                </dd>
                {/* 세트·스타포스 양쪽에서 오는 능력치만 합계 아래 출처 분리 표기 */}
                {fromSet != null && fromStarForce != null && (
                  <dd className="text-muted-foreground basis-full text-right text-xs tabular-nums">
                    세트 {formatEffectValue(fromSet, effect.unit)} ·{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">
                      스타포스 {formatEffectValue(fromStarForce, effect.unit)}
                    </span>
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </section>

      {set.correctedFromArcaneShade && (
        <p className="text-muted-foreground mt-3 border-t pt-3 text-xs">
          {ABSOLABS_CORRECTION_NOTE}
        </p>
      )}
    </StickyFooterDialog>
  );
};
