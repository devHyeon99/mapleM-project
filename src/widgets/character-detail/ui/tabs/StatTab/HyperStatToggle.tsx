"use client";

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
  const value = String(selected ?? active ?? 1);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        onSelect(Number(v));
      }}
    >
      {Array.from({ length: Math.max(0, count) }, (_, i) => {
        const presetNo = i + 1;

        return (
          <ToggleGroupItem
            key={presetNo}
            value={String(presetNo)}
            aria-label={`하이퍼 스탯 프리셋 ${presetNo}`}
            className="relative"
          >
            {presetNo}
            {presetNo === active && (
              <span
                className="absolute top-1 right-1 size-1 rounded-full bg-orange-500"
                aria-hidden="true"
              />
            )}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};
