"use client";

import { LayoutGrid, List } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onChangeViewMode: (mode: "grid" | "list") => void;
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

export const ViewModeToggle = ({
  viewMode,
  onChangeViewMode,
}: ViewModeToggleProps) => {
  return (
    <ToggleGroup
      type="single"
      size="sm"
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
  );
};
