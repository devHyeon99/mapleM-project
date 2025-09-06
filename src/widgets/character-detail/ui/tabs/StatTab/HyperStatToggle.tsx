"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface HyperStatPresetToggleProps {
  count: number; // preset_count
  active: number; // use_preset_no (현재 적용중인 프리셋)
  selected: number; // 현재 선택된 프리셋 번호
  onSelect: (presetNo: number) => void;
}

export const HyperStatPresetToggle = ({
  count,
  active,
  selected,
  onSelect,
}: HyperStatPresetToggleProps) => {
  // ToggleGroup은 string value를 쓰는 경우가 많아서 string으로 매핑
  const value = String(selected || active || 1);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={(v) => {
        if (!v) return; // 같은 아이템 재클릭 시 빈 값 들어올 수 있음(allowDeselect 케이스)
        onSelect(Number(v));
      }}
    >
      {Array.from({ length: Math.max(0, count) }, (_, i) => {
        const presetNo = i + 1;
        const isActive = presetNo === active;

        return (
          <ToggleGroupItem
            key={presetNo}
            value={String(presetNo)}
            aria-label={`하이퍼 스탯 프리셋 ${presetNo}`}
            className="h-8 w-8 p-0 first:rounded-l-sm last:rounded-r-sm"
          >
            {isActive ? `${presetNo}` : `${presetNo}`}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};
