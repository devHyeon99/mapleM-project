"use client";

import { ScheduleCard } from "./ScheduleCard";
import { ChecklistItem } from "./ChecklistItem";
import type { ChecklistItemData } from "@/entities/scheduler";
import { ChecklistItemSkeleton } from "./ChecklistItemSkeleton";

const CATEGORIES = [
  { key: "daily", title: "일일" },
  { key: "weekly", title: "주간" },
  { key: "monthly", title: "월간" },
] as const;

type CategoryKey = "daily" | "weekly" | "monthly";

interface ScheduleBoardProps {
  typeLabel: string;
  isLoading: boolean;
  data: Record<CategoryKey, ChecklistItemData[]>;
  counts: Record<CategoryKey, number>;
  checkedItems: { [key: string]: boolean };
  onCheckChange: (itemId: string, isChecked: boolean) => void;
  onBulkUpdate: (items: ChecklistItemData[], isChecked: boolean) => void;
  onAddItem: (category: CategoryKey, itemName: string) => void;
  onDeleteItem: (itemId: string) => void;
  onEditItem: (itemId: string, newLabel: string) => void;
}

export const ScheduleBoard = ({
  typeLabel,
  data,
  counts,
  checkedItems,
  onCheckChange,
  onBulkUpdate,
  onAddItem,
  onDeleteItem,
  onEditItem,
  isLoading = false,
}: ScheduleBoardProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {CATEGORIES.map(({ key, title }) => (
        <ScheduleCard
          key={key}
          title={`${title} ${typeLabel}`}
          completedCount={counts[key]}
          totalCount={data[key].length}
          onSelectAll={() => onBulkUpdate(data[key], true)}
          onReset={() => onBulkUpdate(data[key], false)}
          onAddItem={(itemName) => onAddItem(key, itemName)}
        >
          {(isEditMode) =>
            isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ChecklistItemSkeleton key={i} />
                ))
              : data[key].map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    isChecked={!!checkedItems[item.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(item.id, checked)
                    }
                    onDelete={() => onDeleteItem(item.id)}
                    onEdit={(newLabel) => onEditItem(item.id, newLabel)}
                    isEditMode={isEditMode}
                  />
                ))
          }
        </ScheduleCard>
      ))}
    </div>
  );
};
