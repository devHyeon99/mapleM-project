import { formatEffectValue } from "@/entities/set-effect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { memo } from "react";

import type { DiffEffectRow } from "../model";

interface DiffResultCardProps {
  diffEffects: DiffEffectRow[];
  description: string;
}

function DiffResultCardBase({ diffEffects, description }: DiffResultCardProps) {
  return (
    <Card className="gap-4 rounded-none border-0 py-4">
      <CardHeader className="gap-0 px-4">
        <CardTitle className="flex h-8 items-center">
          비교 결과 (B - A)
        </CardTitle>
        <CardDescription className="leading-5 whitespace-pre-line">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        {diffEffects.length === 0 ? (
          <p className="text-muted-foreground bg-secondary/50 dark:bg-secondary p-4 text-sm shadow-sm">
            세팅 A와 세팅 B를 입력하면 장비 세트 효과 차이가 표시됩니다.
          </p>
        ) : (
          <dl className="bg-secondary/50 dark:bg-secondary space-y-1 p-4 shadow-sm">
            {diffEffects.map((effect) => (
              <div
                key={effect.key}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <dt className="text-muted-foreground">{effect.label}</dt>
                <dd
                  className={
                    effect.delta > 0
                      ? "font-semibold text-blue-500"
                      : "font-semibold text-red-500"
                  }
                >
                  {effect.delta > 0 ? "+" : ""}
                  {formatEffectValue(effect.delta, effect.unit)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}

export const DiffResultCard = memo(DiffResultCardBase);
