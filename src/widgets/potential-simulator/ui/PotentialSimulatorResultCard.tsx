import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { formatRolledValue } from "../model/domain/simulator";
import type {
  EquipmentLevel,
  HeartGrade,
  SimulationResult,
} from "../model/domain/types";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

type Props = {
  flameLabel: string;
  equipmentLabel: string;
  isHeartCategory: boolean;
  heartGrade: HeartGrade;
  selectedLevel: EquipmentLevel;
  totalRollCount: number;
  isPowerfulTwoLineLocked: boolean;
  latestResult: SimulationResult | null;
};

export function PotentialSimulatorResultCard({
  flameLabel,
  equipmentLabel,
  isHeartCategory,
  heartGrade,
  selectedLevel,
  totalRollCount,
  isPowerfulTwoLineLocked,
  latestResult,
}: Props) {
  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">추가옵션 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary grid gap-2 rounded-xs p-4">
          <SummaryRow label="불꽃 종류" value={flameLabel} />
          <SummaryRow label="장비 분류" value={equipmentLabel} />
          <SummaryRow
            label={isHeartCategory ? "기계심장 등급" : "장비 레벨"}
            value={isHeartCategory ? `${heartGrade}등급` : `${selectedLevel}`}
          />
          <SummaryRow label="총 시행" value={`${totalRollCount}회`} />
          <SummaryRow
            label="강력한 2줄 고정"
            value={isPowerfulTwoLineLocked ? "활성" : "비활성"}
          />
          <Separator className="my-2" />

          {latestResult ? (
            <div className="grid gap-2 text-sm">
              <SummaryRow label="옵션 줄 수" value={`${latestResult.options.length}줄`} />
              {latestResult.options.map((option, index) => (
                <SummaryRow
                  key={`${option.key}-${index}`}
                  label={`${index + 1}. ${option.label}`}
                  value={formatRolledValue(option.value, option.unit, option.step)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              아직 시뮬레이션 결과가 없습니다.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
