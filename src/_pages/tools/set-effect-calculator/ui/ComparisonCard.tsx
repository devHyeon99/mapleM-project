import { formatEffectValue } from "@/entities/set-effect";
import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import type { ComparisonRow } from "../model";

/**
 * 헤더와 값 줄이 같은 자리를 쓰도록 공유하는 그리드.
 * 좁은 화면에서는 두 줄(스탯·차이 / A → B)로 접히고, sm 부터 한 줄 3열이 됨
 */
const LEDGER_GRID =
  "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-0.5 sm:grid-cols-[minmax(0,1fr)_auto_7rem]";

const CELL = {
  label: "col-start-1 row-start-1",
  values:
    "col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 sm:justify-self-end",
  delta:
    "col-start-2 row-span-2 row-start-1 self-center justify-self-end sm:col-start-3 sm:row-span-1 sm:row-start-1 sm:self-baseline",
} as const;

function getDeltaClassName(delta: number) {
  if (delta === 0) return "text-muted-foreground/60";
  return delta > 0
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-rose-600 dark:text-rose-400";
}

function LedgerRow({ row }: { row: ComparisonRow }) {
  const isUnchanged = row.delta === 0;

  return (
    <div
      className={cn(
        LEDGER_GRID,
        "border-divider border-b py-2.5 last:border-b-0",
      )}
    >
      <dt
        className={cn(
          "text-13 truncate font-medium",
          CELL.label,
          isUnchanged && "text-muted-foreground",
        )}
      >
        {row.label}
      </dt>

      <dd
        className={cn(
          "text-muted-foreground text-xs tabular-nums",
          CELL.values,
        )}
      >
        {formatEffectValue(row.valueA, row.unit)}
        <span aria-hidden="true" className="px-1.5 opacity-50">
          →
        </span>
        <span className={cn(!isUnchanged && "text-foreground font-medium")}>
          {formatEffectValue(row.valueB, row.unit)}
        </span>
      </dd>

      <dd
        className={cn(
          "text-sm font-bold tabular-nums",
          CELL.delta,
          getDeltaClassName(row.delta),
        )}
      >
        {isUnchanged
          ? "동일"
          : `${row.delta > 0 ? "+" : ""}${formatEffectValue(row.delta, row.unit)}`}
      </dd>
    </div>
  );
}

export function ComparisonCard({ rows }: { rows: ComparisonRow[] }) {
  const upCount = rows.filter((row) => row.delta > 0).length;
  const downCount = rows.filter((row) => row.delta < 0).length;
  const sameCount = rows.length - upCount - downCount;

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>세팅 A → 세팅 B 비교</CardTitle>
        {/* 입력을 바꿀 때마다 즉시 갱신되는 최종 산출물이라 변경을 읽어준다 */}
        <CardDescription aria-live="polite">
          {rows.length === 0 ? (
            "두 세팅에 장비를 넣으면 스탯별 증감이 표시됩니다."
          ) : (
            <>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {upCount}개 상승
              </span>
              <span className="px-1.5 opacity-50">·</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                {downCount}개 하락
              </span>
              <span className="px-1.5 opacity-50">·</span>
              <span>{sameCount}개 동일</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      {rows.length > 0 && (
        <CardContent>
          <dl className="py-1">
            <div
              className={cn(
                LEDGER_GRID,
                "border-divider text-muted-foreground border-b py-2 text-xs font-medium",
              )}
            >
              <span className={CELL.label}>스탯</span>
              <span className={CELL.values}>세팅 A → 세팅 B</span>
              <span className={CELL.delta}>차이</span>
            </div>

            {rows.map((row) => (
              <LedgerRow key={row.key} row={row} />
            ))}
          </dl>
        </CardContent>
      )}
    </Card>
  );
}
