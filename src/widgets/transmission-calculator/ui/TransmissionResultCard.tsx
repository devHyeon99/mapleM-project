import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { formatMeso, formatMesoInEok } from "../model/domain/calculate";
import type { TransmissionResult } from "../model/domain/types";

type Props = {
  result: TransmissionResult;
};

export function TransmissionResultCard({ result }: Props) {
  const { rows, total } = result;

  return (
    <Card>
      <CardHeader>
        <CardTitle>전수 예상 비용</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            전수할 옵션을 하나 이상 선택해 주세요.
          </p>
        ) : (
          <ul className="grid gap-2">
            {rows.map((row) => (
              <li key={row.key} className="grid gap-0.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    {row.label}
                    <span className="ml-1.5 text-xs">{row.detail}</span>
                  </span>
                  <span className="font-medium">
                    {formatMesoInEok(row.cost.meso)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground text-xs">
                    {formatMeso(row.cost.meso)} 메소
                  </span>
                  <span className="text-muted-foreground text-xs">
                    주문서 {row.cost.scroll}개
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Separator />

        <div className="grid gap-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">필요 메소</span>
            <span className="font-semibold">{formatMesoInEok(total.meso)}</span>
          </div>
          <p className="text-muted-foreground text-right text-xs">
            {formatMeso(total.meso)} 메소
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">전수 주문서</span>
            <span className="font-semibold">{total.scroll}개</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
