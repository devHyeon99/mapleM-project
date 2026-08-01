import { Plus } from "lucide-react";

import { ABSOLABS_CORRECTION_NOTE } from "@/entities/set-effect";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import {
  formatActiveSet,
  MAX_BUILD_ROWS,
  NONE_SET_ID,
  type BuildHandlers,
  type BuildResult,
  type BuildState,
} from "../model";
import { BuildEditorRow } from "./BuildEditorRow";

interface BuildEditorCardProps {
  title: string;
  buildState: BuildState;
  result: BuildResult;
  handlers: BuildHandlers;
}

/** 입력이 실제로 어떤 세트로 잡혔는지 되돌려 보여주는 칩 목록 */
function ActiveSetChips({ result }: { result: BuildResult }) {
  const isCorrected = result.activeSets.some(
    (set) => set.correctedFromArcaneShade,
  );

  return (
    <div className="border-divider mt-auto space-y-2 pt-2">
      <p className="text-sm font-medium">적용 중인 세트</p>

      {result.activeSets.length === 0 ? (
        <p className="text-muted-foreground text-13">
          장비와 세트 수를 고르면 여기에 표시됩니다.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-1.5">
          {result.activeSets.map((set) => (
            <li
              key={set.id}
              className="bg-secondary ring-border text-13 flex items-center gap-1.5 rounded-full px-2.5 py-1 ring"
            >
              <span className="font-medium">{set.displayName}</span>
              <span className="text-muted-foreground tabular-nums">
                {formatActiveSet(set)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {isCorrected && (
        <p className="text-muted-foreground text-xs">
          {ABSOLABS_CORRECTION_NOTE}
        </p>
      )}
    </div>
  );
}

export function BuildEditorCard({
  title,
  buildState,
  result,
  handlers,
}: BuildEditorCardProps) {
  // 같은 세트를 두 행에 나눠 담아 중복 합산되는 것을 막는다
  const usedSetIds = buildState
    .map((row) => row.setId)
    .filter((setId) => setId !== NONE_SET_ID);
  const isFull = buildState.length >= MAX_BUILD_ROWS;

  return (
    <Card className="h-full gap-3">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <CardTitle className="font-bold">{title}</CardTitle>
          <span className="text-muted-foreground text-xs tabular-nums">
            {buildState.length} / {MAX_BUILD_ROWS}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handlers.onReset}
        >
          초기화
        </Button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <ul className="space-y-2">
          {buildState.map((row) => (
            <BuildEditorRow
              key={row.id}
              row={row}
              usedSetIds={usedSetIds}
              canRemove={buildState.length > 1}
              handlers={handlers}
            />
          ))}
        </ul>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlers.onAddRow}
          disabled={isFull}
          className="text-muted-foreground hover:text-foreground w-full border-dashed"
        >
          <Plus />
          {isFull
            ? `장비는 ${MAX_BUILD_ROWS}줄까지 넣을 수 있습니다`
            : "장비 추가"}
        </Button>

        <ActiveSetChips result={result} />
      </CardContent>
    </Card>
  );
}
