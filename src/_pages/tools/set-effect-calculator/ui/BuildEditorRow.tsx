import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import {
  getMaxStarForce,
  NONE_SET_ID,
  SET_BY_ID,
  SET_OPTIONS,
  type BuildHandlers,
  type BuildRow,
} from "../model";

/**
 * 카드가 좁을 때는 장비 이름이 잘리지 않게 두 줄로 접고,
 * lg 부터 장비·세트 수·스타포스를 한 줄에 편다.
 * 두 줄로 접힐 때는 옅은 바탕으로 묶어 줘야 어느 줄이 한 장비인지 구분됨
 */
const EDITOR_GRID =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 rounded-2xl border p-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)_minmax(0,0.95fr)_auto] lg:bg-transparent lg:p-0 lg:border-none";

interface BuildEditorRowProps {
  row: BuildRow;
  /** 다른 행에서 이미 고른 세트를 중복 선택하지 못하게 막는 데 쓴다 */
  usedSetIds: string[];
  /** 마지막 한 줄만 남았을 때는 삭제 대신 초기화를 쓰게 한다 */
  canRemove: boolean;
  handlers: BuildHandlers;
}

export function BuildEditorRow({
  row,
  usedSetIds,
  canRemove,
  handlers: { onSetChange, onCountChange, onStarForceChange, onRemoveRow },
}: BuildEditorRowProps) {
  const maxCount = SET_BY_ID.get(row.setId)?.maxSetCount ?? 0;
  const maxStarForce = getMaxStarForce(row.setId);
  const isEmptyRow = row.setId === NONE_SET_ID;

  return (
    <li className={EDITOR_GRID}>
      <Select value={row.setId} onValueChange={(v) => onSetChange(row.id, v)}>
        <SelectTrigger
          className="col-span-2 w-full lg:col-span-1 lg:col-start-1"
          aria-label="장비 종류 선택"
        >
          <SelectValue placeholder="장비" />
        </SelectTrigger>
        <SelectContent>
          {SET_OPTIONS.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              disabled={
                option.id !== row.setId && usedSetIds.includes(option.id)
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        // 0은 값 대신 라벨을 보여줘야 어느 칸인지 알 수 있음
        value={row.count > 0 ? String(row.count) : ""}
        onValueChange={(v) => onCountChange(row.id, Number(v))}
        disabled={isEmptyRow}
      >
        <SelectTrigger
          className="col-start-1 row-start-2 w-full lg:col-start-2 lg:row-start-1"
          aria-label="세트 수"
        >
          <SelectValue placeholder="세트 수" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: maxCount + 1 }, (_, count) => (
            <SelectItem key={count} value={String(count)}>
              {count}세트
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        inputMode="numeric"
        min={0}
        max={maxStarForce}
        step={1}
        aria-label="스타포스"
        disabled={maxStarForce === 0}
        // 상한을 자리표시자로 알려줘야 몇까지 넣을 수 있는지 눌러보지 않아도 안다
        placeholder={maxStarForce === 0 ? "효과 없음" : `★ 0~${maxStarForce}`}
        className="col-start-2 row-start-2 tabular-nums placeholder:text-sm lg:col-start-3 lg:row-start-1"
        // 0은 빈 칸으로 둬야 지우고 새로 입력할 수 있음
        value={row.starForce > 0 ? row.starForce : ""}
        onChange={(event) =>
          onStarForceChange(row.id, Number(event.target.value))
        }
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="이 장비 줄 삭제"
        disabled={!canRemove}
        onClick={() => onRemoveRow(row.id)}
        className={cn(
          "text-muted-foreground hover:text-destructive",
          "col-start-3 row-start-1 lg:col-start-4",
        )}
      >
        <X />
      </Button>
    </li>
  );
}
