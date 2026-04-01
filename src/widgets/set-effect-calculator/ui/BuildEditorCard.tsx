import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { MAX_BUILD_ROWS, type BuildResult, type BuildState } from "../model";
import { BuildEditorRowsPanel } from "./BuildEditorRowsPanel";
import { BuildSummarySection } from "./BuildSummarySection";
import { BuildSummaryPanel } from "./BuildSummaryPanel";

interface BuildEditorCardProps {
  title: string;
  buildState: BuildState;
  result: BuildResult;
  onSetChange: (rowId: string, setId: string) => void;
  onCountChange: (rowId: string, count: number) => void;
  onStarForceChange: (rowId: string, value: number) => void;
  onAddRow: () => void;
  onReset: () => void;
  onRemoveRow: (rowId: string) => void;
}

export function BuildEditorCard({
  title,
  buildState,
  result,
  onSetChange,
  onCountChange,
  onStarForceChange,
  onAddRow,
  onReset,
  onRemoveRow,
}: BuildEditorCardProps) {
  const canRemoveRow = buildState.length > 1;
  const canAddRow = buildState.length < MAX_BUILD_ROWS;

  return (
    <Card className="h-full gap-4">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={onAddRow}
            disabled={!canAddRow}
            title={
              canAddRow
                ? undefined
                : `장비는 최대 ${MAX_BUILD_ROWS}개까지 추가할 수 있습니다.`
            }
          >
            장비 추가
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 px-4">
        <BuildEditorRowsPanel
          buildState={buildState}
          canRemoveRow={canRemoveRow}
          onSetChange={onSetChange}
          onCountChange={onCountChange}
          onStarForceChange={onStarForceChange}
          onRemoveRow={onRemoveRow}
        />

        <BuildSummarySection title="선택된 장비 효과">
          <BuildSummaryPanel result={result} />
        </BuildSummarySection>
      </CardContent>
    </Card>
  );
}
