"use client";

import { ScheduleCard } from "./ScheduleCard";
import { ChecklistItem } from "./ChecklistItem";
import type { ChecklistItemData } from "@/types/scheduler";

const CATEGORIES = [
  { key: "daily", title: "일일" },
  { key: "weekly", title: "주간" },
  { key: "monthly", title: "월간" },
] as const;

type CategoryKey = "daily" | "weekly" | "monthly";

interface ScheduleContentGridProps {
  typeLabel: string;
  data: Record<CategoryKey, ChecklistItemData[]>;
  counts: Record<CategoryKey, number>;
  checkedItems: { [key: string]: boolean };
  onCheckChange: (itemId: string, isChecked: boolean) => void;
  onBulkUpdate: (items: ChecklistItemData[], isChecked: boolean) => void;
  onAddItem: (category: CategoryKey, itemName: string) => void;
  onDeleteItem: (itemId: string) => void;
  onEditItem: (itemId: string, newLabel: string) => void;
}

export const ScheduleContentGrid = ({
  typeLabel,
  data,
  counts,
  checkedItems,
  onCheckChange,
  onBulkUpdate,
  onAddItem,
  onDeleteItem,
  onEditItem,
}: ScheduleContentGridProps) => {
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
            data[key].map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                isChecked={!!checkedItems[item.id]}
                onCheckedChange={(checked) => onCheckChange(item.id, checked)}
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
