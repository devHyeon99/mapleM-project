"use client";

import { memo } from "react";

import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { ViewModeToggle } from "@/shared/ui/ViewModeToggle";

interface ItemTabHeaderProps {
  activePresetNo?: number | null;
  activeAndroidPresetNo?: number;
  selectedPreset: number;
  selectedAndroidPreset: number | null;
  equipmentPresets: number[];
  androidPresets: number[];
  viewMode: "grid" | "list";
  onSelectPreset: (preset: number) => void;
  onSelectAndroidPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
}

export const ItemTabHeader = memo(function ItemTabHeader({
  activePresetNo,
  activeAndroidPresetNo,
  selectedPreset,
  selectedAndroidPreset,
  equipmentPresets,
  androidPresets,
  viewMode,
  onSelectPreset,
  onSelectAndroidPreset,
  onChangeViewMode,
}: ItemTabHeaderProps) {
  return (
    <section
      aria-label="장비 탭 헤더 컨트롤"
      className="bg-card flex w-full flex-wrap items-end justify-between gap-x-4 gap-y-3 rounded-t-2xl border-b px-4 py-3"
    >
      <div className="flex gap-6">
        <SegmentedToggle
          label="장비 프리셋"
          value={selectedPreset}
          onChange={onSelectPreset}
          options={equipmentPresets.map((preset) => ({
            value: preset,
            marked: preset === activePresetNo,
          }))}
        />
        <SegmentedToggle
          label="안드로이드 프리셋"
          value={selectedAndroidPreset}
          onChange={onSelectAndroidPreset}
          options={androidPresets.map((preset) => ({
            value: preset,
            marked: preset === activeAndroidPresetNo,
          }))}
        />
      </div>

      <ViewModeToggle
        label="보기 방식"
        viewMode={viewMode}
        onChangeViewMode={onChangeViewMode}
      />
    </section>
  );
});
