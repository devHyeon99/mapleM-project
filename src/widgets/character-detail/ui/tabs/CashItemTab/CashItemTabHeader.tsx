"use client";

import { cn } from "@/shared/lib/utils";
import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";
import { ViewModeToggle } from "@/shared/ui/ViewModeToggle";

export type CashItemLookMode = "normal" | "dressUp";

const LOOK_MODE_OPTIONS = [
  { value: "normal" as const, content: "일반" },
  { value: "dressUp" as const, content: "드레스업" },
];

interface CashItemTabHeaderProps {
  activePresetNo?: number | null;
  canUseDressUpMode?: boolean;
  lookMode: CashItemLookMode;
  selectedPreset?: number | null;
  presets: number[];
  viewMode: "grid" | "list";
  onChangeLookMode: (mode: CashItemLookMode) => void;
  onSelectPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
  className?: string;
}

export const CashItemTabHeader = ({
  activePresetNo,
  canUseDressUpMode = false,
  lookMode,
  selectedPreset,
  presets,
  viewMode,
  onChangeLookMode,
  onSelectPreset,
  onChangeViewMode,
  className,
}: CashItemTabHeaderProps) => {
  return (
    <section
      aria-label="캐시 탭 헤더 컨트롤"
      className={cn(
        "bg-muted/40 flex w-[360px] flex-wrap items-end justify-between gap-x-4 gap-y-3 rounded-xl border px-3 py-2.5 sm:w-full",
        className,
      )}
    >
      <SegmentedToggle
        label="캐시 프리셋"
        value={selectedPreset}
        onChange={onSelectPreset}
        options={presets.map((preset) => ({
          value: preset,
          marked: preset === activePresetNo,
        }))}
      />

      <div className="flex items-end gap-3">
        {canUseDressUpMode && (
          <SegmentedToggle
            label="외형 모드"
            value={lookMode}
            onChange={onChangeLookMode}
            options={LOOK_MODE_OPTIONS}
          />
        )}

        <ViewModeToggle
          label="보기 방식"
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
      </div>
    </section>
  );
};
