import { NONE_SET_ID, type BuildState } from "../model";
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
  // 같은 세트를 두 행에 나눠 담아 중복 합산되는 것을 막는다
  const usedSetIds = buildState
    .map((row) => row.setId)
    .filter((setId) => setId !== NONE_SET_ID);

  return (
    <ul className="space-y-2">
      {buildState.map((row, index) => (
        <BuildEditorRow
          key={row.id}
          row={row}
          index={index}
          usedSetIds={usedSetIds}
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
