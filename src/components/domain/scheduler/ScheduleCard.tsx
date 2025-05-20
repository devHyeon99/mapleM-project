"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ActionDialog } from "@/components/common/ActionDialog";

interface ScheduleCardProps {
  title: string;
  completedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onReset: () => void;
  onAddItem: (itemName: string) => void;
  children: (isEditMode: boolean) => React.ReactNode;
}

export const ScheduleCard = ({
  title,
  completedCount,
  totalCount,
  onSelectAll,
  onReset,
  onAddItem,
  children,
}: ScheduleCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleConfirmAddItem = () => {
    if (newItemName.trim() === "") return;
    onAddItem(newItemName);
    setNewItemName("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {title} ({completedCount}/{totalCount})
          </CardTitle>
          <div className="flex items-center gap-4">
            {!isEditMode && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer p-0 hover:!bg-transparent"
                  onClick={onSelectAll}
                >
                  전체완료
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer p-0 hover:!bg-transparent"
                  onClick={onReset}
                >
                  초기화
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer p-0 hover:!bg-transparent"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "완료" : "편집"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={percentage} className="h-2 w-full" />
        <p className="text-muted-foreground text-right text-sm">
          {percentage}% 완료
        </p>
        <div className="pt-2">{children(isEditMode)}</div>
        <div className="pt-2">
          <ActionDialog
            trigger={
              <Button
                variant="ghost"
                className="text-muted-foreground w-full justify-center"
                disabled={isEditMode}
              >
                <Plus className="mr-2 h-4 w-4" /> 항목 추가
              </Button>
            }
            title={`새로운 ${title} 추가`}
            description="추가할 항목의 이름을 입력해주세요."
            onAction={handleConfirmAddItem}
            actionText="추가"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-name" className="text-right">
                  {title} 이름
                </Label>
                <Input
                  id="item-name"
                  name="item-name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="새 항목 이름..."
                  className="col-span-3"
                />
              </div>
            </div>
          </ActionDialog>
        </div>
      </CardContent>
    </Card>
  );
};
