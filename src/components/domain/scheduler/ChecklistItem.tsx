"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import { ConfirmAlertDialog } from "@/components/common/ConfirmAlertDialog";
import { ActionDialog } from "@/components/common/ActionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface ChecklistItemProps {
  item: { id: string; label: string };
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onDelete: () => void;
  onEdit: (newLabel: string) => void;
  isEditMode?: boolean;
}

export const ChecklistItem = ({
  item,
  isChecked,
  onCheckedChange,
  onDelete,
  onEdit,
  isEditMode = false,
}: ChecklistItemProps) => {
  const [editedLabel, setEditedLabel] = useState(item.label);

  useEffect(() => {
    setEditedLabel(item.label);
  }, [item.label]);

  const handleConfirmEdit = () => {
    if (editedLabel.trim() === "") return;
    onEdit(editedLabel);
  };

  const WrapperComponent = isEditMode ? "div" : "label";

  const wrapperProps = {
    ...(!isEditMode && { htmlFor: item.id }),
    className:
      "group flex cursor-pointer items-center justify-between border-b py-3 min-h-15.25",
  };

  return (
    <WrapperComponent {...wrapperProps}>
      <span
        className={cn(
          "font-medium",
          isChecked ? "text-muted-foreground line-through" : "text-foreground",
        )}
      >
        {item.label}
      </span>
      <div className="flex items-center gap-2">
        {isEditMode ? (
          <div className="animate-slide-in-from-right flex items-center gap-1">
            <ActionDialog
              trigger={
                <Button variant="ghost" size="icon">
                  <FilePenLine className="h-4 w-4" />
                </Button>
              }
              title={`'${item.label}' 항목 수정`}
              description="수정할 항목의 새 이름을 입력해주세요."
              onAction={handleConfirmEdit}
              actionText="수정"
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor={`edit-item-name-${item.id}`}
                    className="text-right"
                  >
                    항목 이름
                  </Label>
                  <Input
                    id={`edit-item-name-${item.id}`}
                    name={`edit-item-name-${item.id}`}
                    value={editedLabel}
                    onChange={(e) => setEditedLabel(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </ActionDialog>
            <ConfirmAlertDialog
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              title={`'${item.label}' 항목을 삭제하시겠습니까?`}
              description="이 작업은 되돌릴 수 없습니다."
              onConfirm={onDelete}
              confirmText="삭제"
            />
          </div>
        ) : (
          <Checkbox
            id={item.id}
            name={item.id}
            checked={isChecked}
            onCheckedChange={onCheckedChange}
            className="h-5 w-5"
          />
        )}
      </div>
    </WrapperComponent>
  );
};
