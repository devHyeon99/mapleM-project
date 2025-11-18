"use client";

import { cn } from "@/shared/lib/utils";
import { PresetToggle } from "@/shared/ui/PresetToggle";
import { ViewModeToggle } from "@/shared/ui/ViewModeToggle";

interface ItemTabHeaderProps {
  activePresetNo?: number | null;
  activeAndroidPresetNo?: number;
  selectedPreset: number;
  selectedAndroidPreset: number | null;
  equipmentPresets?: number[];
  androidPresets?: number[];
  viewMode: "grid" | "list";
  onSelectPreset: (preset: number) => void;
  onSelectAndroidPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
  className?: string;
}

export const ItemTabHeader = ({
  activePresetNo,
  activeAndroidPresetNo,
  selectedPreset,
  selectedAndroidPreset,
  equipmentPresets = [1, 2, 3],
  androidPresets = [],
  viewMode,
  onSelectPreset,
  onSelectAndroidPreset,
  onChangeViewMode,
  className,
}: ItemTabHeaderProps) => {
  return (
    <section
      aria-label="장비 탭 헤더 컨트롤"
      className={cn(
        "bg-card flex w-[360px] flex-wrap items-center justify-between rounded-xs px-0 sm:w-full sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-7.5 sm:gap-4">
        <PresetToggle
          activePresetNo={activePresetNo}
          presets={equipmentPresets}
          selectedPreset={selectedPreset}
          onSelectPreset={onSelectPreset}
          ariaLabel="장비 프리셋 선택"
          label="장비 프리셋"
        />
        <PresetToggle
          activePresetNo={activeAndroidPresetNo}
          presets={androidPresets}
          selectedPreset={selectedAndroidPreset}
          onSelectPreset={onSelectAndroidPreset}
          ariaLabel="안드로이드 프리셋 선택"
          label="안드로이드 프리셋"
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
