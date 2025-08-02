"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { Input } from "@/shared/ui/input";
import { Plus } from "lucide-react";
import { ActionDialog } from "@/components/common/ActionDialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";

interface ScheduleCardProps {
  title: string;
  completedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onReset: () => void;
  onAddItem: (itemName: string) => void;
  children: (isEditMode: boolean) => React.ReactNode;
}

const formSchema = z.object({
  itemName: z
    .string()
    .min(2, { message: "항목 이름은 2글자 이상이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣]*$/, {
      message: "사용할 수 없는 이름입니다. (영문, 숫자, 한글만 허용)",
    }),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { itemName: "" },
  });

  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSubmit = (values: FormValues) => {
    onAddItem(values.itemName.trim());
    form.reset();
    setIsOpen(false);
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
            open={isOpen}
            onOpenChange={(open) => {
              if (!open) {
                form.reset();
              }
              setIsOpen(open);
            }}
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
            onAction={form.handleSubmit(handleSubmit)}
            actionText="추가"
            form={`add-item-form-${title}`}
          >
            <Form {...form}>
              <form
                id={`add-item-form-${title}`}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">{title} 이름</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="새 항목 이름..."
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 text-center" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </ActionDialog>
        </div>
      </CardContent>
    </Card>
  );
};
