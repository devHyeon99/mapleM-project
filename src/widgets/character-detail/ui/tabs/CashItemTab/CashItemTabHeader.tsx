"use client";

import { cn } from "@/shared/lib/utils";
import { PresetToggle } from "@/shared/ui/PresetToggle";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { ViewModeToggle } from "@/shared/ui/ViewModeToggle";

export type CashItemLookMode = "normal" | "dressUp";

interface CashItemTabHeaderProps {
  activePresetNo?: number | null;
  canUseDressUpMode?: boolean;
  lookMode: CashItemLookMode;
  selectedPreset?: number | null;
  presets?: number[];
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
  presets = [1, 2, 3],
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
        "bg-card flex w-[360px] flex-wrap items-center justify-between gap-3 rounded-xs px-0 sm:w-full sm:px-4",
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

      <div className="flex items-end gap-3">
        {canUseDressUpMode && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs font-medium">
              외형 모드
            </span>
            <ToggleGroup
              type="single"
              size="sm"
              variant="outline"
              value={lookMode}
              onValueChange={(value) => {
                if (value === "normal" || value === "dressUp") {
                  onChangeLookMode(value);
                }
              }}
              aria-label="외형 모드 선택"
            >
              <ToggleGroupItem
                value="normal"
                className="text-muted-foreground min-w-12 px-3 text-xs font-semibold"
              >
                일반
              </ToggleGroupItem>
              <ToggleGroupItem
                value="dressUp"
                className="text-muted-foreground min-w-16 px-3 text-xs font-semibold"
              >
                드레스업
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs font-medium">
            보기 방식
          </span>
          <ViewModeToggle
            viewMode={viewMode}
            onChangeViewMode={onChangeViewMode}
          />
        </div>
      </div>
    </section>
  );
};
