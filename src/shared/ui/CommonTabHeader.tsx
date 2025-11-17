"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface CommonTabHeaderProps {
  activePresetNo?: number | null;
  selectedPreset?: number | null;
  presets?: number[];
  viewMode: "grid" | "list";
  onSelectPreset: (preset: number) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
  className?: string;
}

const VIEW_MODE_OPTIONS = [
  {
    value: "grid",
    label: "그리드 보기",
    icon: LayoutGrid,
  },
  {
    value: "list",
    label: "리스트 보기",
    icon: List,
  },
] as const;

export const CommonTabHeader = ({
  activePresetNo,
  selectedPreset,
  presets = [1, 2, 3],
  viewMode,
  onSelectPreset,
  onChangeViewMode,
  className,
}: CommonTabHeaderProps) => {
  return (
    <section
      aria-label="탭 헤더 컨트롤"
      className={cn(
        "bg-card flex w-full flex-wrap items-center justify-between gap-3 rounded-xs px-2 sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center">
        <div>
          <p className="text-foreground sr-only text-sm font-semibold">
            프리셋
          </p>
          <p className="sr-only">현재 적용 중인 프리셋은 점으로 표시됩니다.</p>
        </div>

        <ToggleGroup
          type="single"
          value={selectedPreset != null ? String(selectedPreset) : undefined}
          onValueChange={(value) => {
            if (!value) return;
            onSelectPreset(Number(value));
          }}
          variant="outline"
          aria-label="장비 프리셋 선택"
        >
          {presets.map((preset) => {
            const isActiveInGame = activePresetNo === preset;
            return (
              <ToggleGroupItem
                key={preset}
                value={String(preset)}
                aria-label={`${preset}번 프리셋`}
                className="text-muted-foreground relative min-w-9 px-3 text-xs font-semibold md:text-sm"
              >
                <span>프리셋 {preset}</span>
                {isActiveInGame && (
                  <span
                    className="absolute top-1 right-1 size-1.5 rounded-full bg-orange-400"
                    aria-hidden="true"
                  />
                )}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground sr-only text-xs font-medium">
          보기 방식
        </span>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => {
            if (value !== "grid" && value !== "list") return;
            onChangeViewMode(value);
          }}
          variant="outline"
          aria-label="보기 방식 선택"
        >
          {VIEW_MODE_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                aria-label={option.label}
              >
                <Icon className="size-4" />
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>
    </section>
  );
};
