import { Trash2Icon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { memo } from "react";

import { SET_BY_ID, SET_LABEL_BY_ID, SET_OPTIONS } from "../model";
import { getStarForceThresholds } from "../model";
import type { BuildState } from "../model";

export interface BuildEditorRowProps {
  row: BuildState[number];
  index: number;
  canRemoveRow: boolean;
  onSetChange: (rowId: string, setId: string) => void;
  onCountChange: (rowId: string, count: number) => void;
  onStarForceChange: (rowId: string, value: number) => void;
  onRemoveRow: (rowId: string) => void;
}

function BuildEditorRowBase({
  row,
  index,
  canRemoveRow,
  onSetChange,
  onCountChange,
  onStarForceChange,
  onRemoveRow,
}: BuildEditorRowProps) {
  const definition = SET_BY_ID.get(row.setId);
  const maxCount = definition?.maxSetCount ?? 0;
  const starForceThresholds = getStarForceThresholds(row.setId);
  const hasStarForceOptions = starForceThresholds.length > 0;
  const countOptions = Array.from(
    { length: maxCount + 1 },
    (_, count) => count,
  );
  const selectedSetLabel = SET_LABEL_BY_ID.get(row.setId) ?? "선택 안 함";

  return (
    <li>
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.55fr)_minmax(0,0.7fr)_auto] items-end gap-2">
        <Select
          value={row.setId}
          onValueChange={(value) => onSetChange(row.id, value)}
        >
          <SelectTrigger className="w-full" aria-label="장비 종류 선택">
            <SelectValue placeholder="선택 안 함">
              {selectedSetLabel}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SET_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={String(row.count)}
          onValueChange={(value) => onCountChange(row.id, Number(value))}
          disabled={row.setId === "none"}
        >
          <SelectTrigger className="w-full" aria-label="세트 수">
            <SelectValue placeholder="0">{String(row.count)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countOptions.map((count) => (
              <SelectItem
                key={`${row.id}-count-${count}`}
                value={String(count)}
              >
                {count}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={String(row.starForce)}
          onValueChange={(value) => onStarForceChange(row.id, Number(value))}
          disabled={!hasStarForceOptions}
        >
          <SelectTrigger className="w-full" aria-label="스타포스">
            <SelectValue
              placeholder={hasStarForceOptions ? "스타포스" : "효과 없음"}
            >
              {hasStarForceOptions ? String(row.starForce) : "0"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            {starForceThresholds.map((threshold) => (
              <SelectItem
                key={`${row.id}-sf-${threshold}`}
                value={String(threshold)}
              >
                {threshold}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={!canRemoveRow}
          aria-label={`장비 ${index + 1} 삭제`}
          onClick={() => onRemoveRow(row.id)}
        >
          <Trash2Icon className="size-4 text-red-500" />
        </Button>
      </div>
    </li>
  );
}

export const BuildEditorRow = memo(BuildEditorRowBase);
