import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

import {
  CUBE_TYPE_LABELS,
  POTENTIAL_TIER_LABELS,
} from "../model/domain/constants";
import type {
  CubeRollResult,
  CubeType,
  PotentialMode,
} from "../model/domain/types";
import type {
  EquipmentPotentialData,
  PotentialTier,
} from "../model/domain/potential-types";
import type {
  CubeUsageCounts,
  UpgradeProgress,
} from "../model/state/use-cube-simulator-state";
import { ResultLine } from "./CubeResultLine";

type Props = {
  potentialMode: PotentialMode | null;
  cubeType: CubeType | null;
  tier: PotentialTier | null;
  potentialData: EquipmentPotentialData | null;
  latestRoll: CubeRollResult | null;
  totalRollCount: number;
  cubeUsageCounts: CubeUsageCounts;
  upgradeProgress: UpgradeProgress;
};

// 등급업 구간 (from 등급이 upgradeProgress의 키)
const PROGRESS_ROWS: Array<{
  from: keyof UpgradeProgress;
  to: PotentialTier;
}> = [
  { from: "rare", to: "epic" },
  { from: "epic", to: "unique" },
  { from: "unique", to: "legendary" },
];

const TIER_BADGE_CLASS: Record<PotentialTier, string> = {
  rare: "border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-300",
  epic: "border-purple-500/30 bg-purple-500/15 text-purple-700 dark:text-purple-300",
  unique:
    "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  legendary:
    "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

function SummaryRow({
  label,
  value,
  valueClassName = "font-medium",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}

function formatUpgradeLabel(from: PotentialTier, to: PotentialTier) {
  return `${POTENTIAL_TIER_LABELS[from]} -> ${POTENTIAL_TIER_LABELS[to]}`;
}

export function CubeResultCard({
  potentialMode,
  cubeType,
  tier,
  potentialData,
  latestRoll,
  totalRollCount,
  cubeUsageCounts,
  upgradeProgress,
}: Props) {
  const isPotentialMode = potentialMode === "potential";
  const isAdditionalMode = potentialMode === "additional";

  return (
    <Card>
      <CardHeader>
        <CardTitle>큐브 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <SummaryRow
            label="장비 종류"
            value={potentialData ? potentialData.label : "-"}
          />
          <SummaryRow
            label="장비 레벨"
            value={potentialData ? String(potentialData.level) : "-"}
          />

          <SummaryRow
            label="큐브 종류"
            value={cubeType ? CUBE_TYPE_LABELS[cubeType] : "-"}
          />
          <SummaryRow label="큐브 시행" value={`${totalRollCount}회`} />
          {isPotentialMode ? (
            <>
              <SummaryRow
                label="레드 큐브"
                value={`${cubeUsageCounts.red}회`}
              />
              <SummaryRow
                label="블랙 큐브"
                value={`${cubeUsageCounts.black}회`}
              />
            </>
          ) : null}
          {isAdditionalMode ? (
            <>
              <SummaryRow
                label="에디셔널 큐브"
                value={`${cubeUsageCounts.additional}회`}
              />
              <SummaryRow
                label="화이트 에디셔널 큐브"
                value={`${cubeUsageCounts.whiteAdditional}회`}
              />
            </>
          ) : null}
          <Separator className="my-2" />
          <div className="grid gap-2">
            {PROGRESS_ROWS.map((row) => (
              <SummaryRow
                key={row.from}
                label={formatUpgradeLabel(row.from, row.to)}
                value={
                  upgradeProgress[row.from] != null
                    ? `${upgradeProgress[row.from]}개`
                    : "-"
                }
                valueClassName="font-medium text-orange-500"
              />
            ))}
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">현재 등급</span>
              {tier ? (
                <Badge variant="outline" className={TIER_BADGE_CLASS[tier]}>
                  {POTENTIAL_TIER_LABELS[tier]}
                </Badge>
              ) : (
                <span className="font-medium">-</span>
              )}
            </div>
            {latestRoll ? (
              <div className="grid gap-3">
                {latestRoll.lines.map((line) => (
                  <ResultLine key={line.slot} line={line} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center text-sm">
                최근 큐브 사용 결과가 없습니다.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
