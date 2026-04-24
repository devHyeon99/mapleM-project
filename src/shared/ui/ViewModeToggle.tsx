"use client";

import { LayoutGrid, List } from "lucide-react";

import { SegmentedToggle } from "@/shared/ui/SegmentedToggle";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onChangeViewMode: (mode: "grid" | "list") => void;
  label?: string;
  className?: string;
}

const VIEW_MODE_OPTIONS = [
  {
    value: "grid" as const,
    content: <LayoutGrid className="size-4" />,
    ariaLabel: "그리드 보기",
  },
  {
    value: "list" as const,
    content: <List className="size-4" />,
    ariaLabel: "리스트 보기",
  },
];

export const ViewModeToggle = ({
  viewMode,
  onChangeViewMode,
  label,
  className,
}: ViewModeToggleProps) => (
  <SegmentedToggle
    className={className}
    label={label}
    ariaLabel="보기 방식 선택"
    value={viewMode}
    onChange={onChangeViewMode}
    options={VIEW_MODE_OPTIONS}
  />
);
