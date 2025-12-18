import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { formatRolledValue } from "../model/domain/simulator";
import type {
  EquipmentLevel,
  HeartGrade,
  SimulationResult,
} from "../model/domain/types";

function SummaryRow({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "option";
}) {
  const isOptionVariant = variant === "option";

  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span
        className={
          isOptionVariant ? "text-foreground" : "text-muted-foreground"
        }
      >
        {label}
      </span>
      <span
        className={
          isOptionVariant ? "font-medium text-orange-500" : "font-medium"
        }
      >
        {value.includes("%") || Number.isNaN(Number(value))
          ? value
          : Number(value).toLocaleString("ko-KR")}
      </span>
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
  latestResult: SimulationResult | null;
};

export function PotentialSimulatorResultCard({
  flameLabel,
  equipmentLabel,
  isHeartCategory,
  heartGrade,
  selectedLevel,
  totalRollCount,
  latestResult,
}: Props) {
  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">추가옵션 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary grid gap-2 rounded-xs p-4 shadow-sm">
          <SummaryRow label="환생의 불꽃 종류" value={flameLabel} />
          <SummaryRow label="장비 분류" value={equipmentLabel} />
          <SummaryRow
            label={isHeartCategory ? "기계심장 등급" : "장비 레벨"}
            value={isHeartCategory ? `${heartGrade}등급` : `${selectedLevel}`}
          />
          <SummaryRow label="총 시행" value={`${totalRollCount}회`} />

          <Separator className="my-2" />

          {latestResult ? (
            <div className="grid gap-2 text-sm">
              <span className="text-sm font-medium">옵션결과</span>
              {latestResult.options.map((option, index) => (
                <SummaryRow
                  key={`${option.key}-${index}`}
                  label={`${option.label}`}
                  variant="option"
                  value={formatRolledValue(
                    option.value,
                    option.unit,
                    option.step,
                  )}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center text-sm">
              아직 시뮬레이션 결과가 없습니다.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
