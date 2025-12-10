import { Button } from "@/shared/ui/button";
import { Accordion } from "@/shared/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { memo } from "react";

import type { BuildResult, BuildState } from "../model";
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

function BuildEditorCardBase({
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

  return (
    <Card className="h-full min-h-94.25 gap-4 rounded-none border-0 py-4">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onAddRow}>
            장비 추가
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onReset}>
            초기화
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-4">
        <BuildEditorRowsPanel
          buildState={buildState}
          canRemoveRow={canRemoveRow}
          onSetChange={onSetChange}
          onCountChange={onCountChange}
          onStarForceChange={onStarForceChange}
          onRemoveRow={onRemoveRow}
        />

        <Accordion type="single" collapsible defaultValue={`${title}-summary`}>
          <BuildSummarySection
            title="선택된 장비 효과"
            sectionId={`${title}-summary`}
          >
            <BuildSummaryPanel result={result} />
          </BuildSummarySection>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export const BuildEditorCard = memo(BuildEditorCardBase);
