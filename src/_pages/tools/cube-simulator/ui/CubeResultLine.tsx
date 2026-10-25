import { formatPotentialValue } from "../model/domain/calculator";
import type { CubeRollResult } from "../model/domain/types";

export function ResultLine({
  line,
}: {
  line: CubeRollResult["lines"][number] | null;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <p className="min-w-0 font-medium">{line ? line.option.label : "-"}</p>
        <p className="font-semibold text-orange-500">
          {line ? formatPotentialValue(line.option) : "-"}
        </p>
      </div>
      {line ? (
        <p className="text-muted-foreground text-xs">
          {line.option.chance.toFixed(5)}%
        </p>
      ) : null}
    </div>
  );
}
