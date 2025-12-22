import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { STARFORCE_EQUIPMENT_CATEGORY_OPTIONS } from "../model/domain/data";
import type {
  StarforceEquipmentCategory,
  StarforceRate,
  StarforceSimulationResult,
} from "../model/domain/types";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value.toFixed(2)}%</span>
    </div>
  );
}

function getOutcomeLabel(result: StarforceSimulationResult) {
  if (result.outcome === "success") return "성공";
  if (result.outcome === "keep") return "유지";
  if (result.outcome === "decrease") return "하락";
  return "파괴";
}

function getOutcomeBadgeClass(result: StarforceSimulationResult) {
  if (result.outcome === "success") {
    return "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
  }
  if (result.outcome === "keep") {
    return "border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300";
  }
  if (result.outcome === "decrease") {
    return "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300";
  }
  return "border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-300";
}

type Props = {
  equipmentCategory: StarforceEquipmentCategory | null;
  currentStar: number;
  totalAttemptCount: number;
  successCount: number;
  keepCount: number;
  decreaseCount: number;
  destroyCount: number;
  safetyShieldUsageCount: number;
  protectShieldUsageCount: number;
  luckyDayUsageCounts: {
    3: number;
    5: number;
    7: number;
    10: number;
  };
  expectedRate: StarforceRate | null;
  latestResult: StarforceSimulationResult | null;
  maxStarforce: number | null;
  isDestroyed: boolean;
};

export function StarforceSimulatorResultCard({
  equipmentCategory,
  currentStar,
  totalAttemptCount,
  successCount,
  keepCount,
  decreaseCount,
  destroyCount,
  safetyShieldUsageCount,
  protectShieldUsageCount,
  luckyDayUsageCounts,
  expectedRate,
  latestResult,
  maxStarforce,
  isDestroyed,
}: Props) {
  const equipmentCategoryLabel =
    STARFORCE_EQUIPMENT_CATEGORY_OPTIONS.find(
      (option) => option.type === equipmentCategory,
    )?.label ?? "-";
  const isAtMaxStarforce = maxStarforce != null && currentStar >= maxStarforce;

  return (
    <Card className="gap-4 rounded-xs border-none py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">스타포스 강화 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="bg-secondary grid gap-2 rounded-xs p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <SummaryRow label="장비 종류" value={equipmentCategoryLabel} />
            <SummaryRow label="총 시행" value={`${totalAttemptCount}회`} />
            <SummaryRow label="성공 횟수" value={`${successCount}회`} />
            <SummaryRow label="유지 횟수" value={`${keepCount}회`} />
            <SummaryRow label="하락 횟수" value={`${decreaseCount}회`} />
            <SummaryRow label="파괴 횟수" value={`${destroyCount}회`} />
          </div>

          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <SummaryRow
              label="세이프티 사용"
              value={`${safetyShieldUsageCount}회`}
            />
            <SummaryRow
              label="프로텍트 사용"
              value={`${protectShieldUsageCount}회`}
            />
            <SummaryRow
              label="럭데 3% 사용"
              value={`${luckyDayUsageCounts[3]}회`}
            />
            <SummaryRow
              label="럭데 5% 사용"
              value={`${luckyDayUsageCounts[5]}회`}
            />
            <SummaryRow
              label="럭데 7% 사용"
              value={`${luckyDayUsageCounts[7]}회`}
            />
            <SummaryRow
              label="럭데 10% 사용"
              value={`${luckyDayUsageCounts[10]}회`}
            />
          </div>

          <Separator className="my-2" />

          {latestResult && (
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">최근 결과</span>
                <Badge
                  variant="outline"
                  className={getOutcomeBadgeClass(latestResult)}
                >
                  {getOutcomeLabel(latestResult)}
                </Badge>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <SummaryRow label="현재 스타포스" value={`${currentStar}성`} />
            {expectedRate ? (
              <>
                <RateRow label="성공" value={expectedRate.success} />
                <RateRow label="유지" value={expectedRate.keep} />
                <RateRow label="하락" value={expectedRate.decrease} />
                <RateRow label="파괴" value={expectedRate.destroy} />
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                {equipmentCategory == null
                  ? "장비 종류를 선택해 주세요."
                  : isAtMaxStarforce
                    ? "최대 스타포스에 도달했습니다."
                    : "스타포스를 확인해 주세요."}
              </p>
            )}
          </div>

          {isDestroyed ? (
            <p className="text-destructive text-sm">
              장비가 파괴되었습니다. 초기화 후 다시 강화를 시작해 주세요.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
