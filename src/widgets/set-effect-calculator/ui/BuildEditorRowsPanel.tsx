import type { BuildState } from "../model";
import { BuildEditorRow } from "./BuildEditorRow";

interface BuildEditorRowsPanelProps {
  buildState: BuildState;
  canRemoveRow: boolean;
  onSetChange: (rowId: string, setId: string) => void;
  onCountChange: (rowId: string, count: number) => void;
  onStarForceChange: (rowId: string, value: number) => void;
  onRemoveRow: (rowId: string) => void;
}

export function BuildEditorRowsPanel({
  buildState,
  canRemoveRow,
  onSetChange,
  onCountChange,
  onStarForceChange,
  onRemoveRow,
}: BuildEditorRowsPanelProps) {
  return (
    <ul className="space-y-2">
      {buildState.map((row, index) => (
        <BuildEditorRow
          key={row.id}
          row={row}
          index={index}
          canRemoveRow={canRemoveRow}
          onSetChange={onSetChange}
          onCountChange={onCountChange}
          onStarForceChange={onStarForceChange}
          onRemoveRow={onRemoveRow}
        />
      ))}
    </ul>
  );
}
