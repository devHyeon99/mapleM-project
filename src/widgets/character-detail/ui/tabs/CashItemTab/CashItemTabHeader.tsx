"use client";

import { cn } from "@/shared/lib/utils";
import { PresetToggle } from "@/shared/ui/PresetToggle";
import { ViewModeToggle } from "@/shared/ui/ViewModeToggle";

interface CashItemTabHeaderProps {
  activePresetNo?: number | null;
  selectedPreset?: number | null;
  presets?: number[];
  viewMode: "grid" | "list";
  onSelectPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
  className?: string;
}

export const CashItemTabHeader = ({
  activePresetNo,
  selectedPreset,
  presets = [1, 2, 3],
  viewMode,
  onSelectPreset,
  onChangeViewMode,
  className,
}: CashItemTabHeaderProps) => {
  return (
    <section
      aria-label="캐시 탭 헤더 컨트롤"
      className={cn(
        "bg-card flex w-[360px] flex-wrap items-center justify-between rounded-xs px-0 sm:w-full sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center">
        <PresetToggle
          activePresetNo={activePresetNo}
          presets={presets}
          selectedPreset={selectedPreset}
          onSelectPreset={onSelectPreset}
          ariaLabel="캐시 프리셋 선택"
          label="캐시 프리셋"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium">
          보기 방식
        </span>
        <ViewModeToggle
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
      </div>
    </section>
  );
};
