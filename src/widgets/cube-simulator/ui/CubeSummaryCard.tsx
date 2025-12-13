import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import {
  CUBE_TYPE_LABELS,
  POTENTIAL_TIER_LABELS,
} from "../model/domain/constants";
import type { CubeType } from "../model/domain/types";
import type {
  EquipmentPotentialData,
  PotentialTier,
} from "../model/domain/potential-types";

type Props = {
  cubeType: CubeType | null;
  tier: PotentialTier | null;
  potentialData: EquipmentPotentialData | null;
  totalRollCount: number;
  upgradeProgress: {
    rare: number | null;
    epic: number | null;
    unique: number | null;
  };
};

const PROGRESS_ROWS: Array<{
  key: "rare" | "epic" | "unique";
  from: "rare" | "epic" | "unique";
  to: "epic" | "unique" | "legendary";
}> = [
  { key: "rare", from: "rare", to: "epic" },
  { key: "epic", from: "epic", to: "unique" },
  { key: "unique", from: "unique", to: "legendary" },
];

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

export function CubeSummaryCard({
  cubeType,
  tier,
  potentialData,
  totalRollCount,
  upgradeProgress,
}: Props) {
  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">큐브 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary/50 grid gap-2 rounded-xs p-4 text-sm shadow-sm">
          <SummaryRow
            label="장비 종류"
            value={potentialData ? potentialData.label : "-"}
          />
          <SummaryRow
            label="장비 레벨"
            value={potentialData ? String(potentialData.level) : "-"}
          />
          <SummaryRow
            label="현재 등급"
            value={tier ? POTENTIAL_TIER_LABELS[tier] : "-"}
          />
          <SummaryRow
            label="큐브 종류"
            value={cubeType ? CUBE_TYPE_LABELS[cubeType] : "-"}
          />
          <SummaryRow label="총 큐브 시행" value={`${totalRollCount}회`} />
          <Separator className="my-2" />
          <div className="grid gap-2">
            {PROGRESS_ROWS.map((row) => (
              <SummaryRow
                key={row.key}
                label={formatUpgradeLabel(row.from, row.to)}
                value={
                  upgradeProgress[row.key] != null
                    ? `${upgradeProgress[row.key]}개`
                    : "-"
                }
                valueClassName="font-medium text-orange-500"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
