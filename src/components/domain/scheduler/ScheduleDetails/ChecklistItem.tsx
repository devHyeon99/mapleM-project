"use client";

import { Checkbox } from "@/shared/ui/checkbox";
import { cn } from "@/shared/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import { ConfirmAlertDialog } from "@/shared/ui/ConfirmAlertDialog";
import { ActionDialog } from "@/shared/ui/ActionDialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useEffect, useState } from "react";
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

interface ChecklistItemProps {
  item: { id: string; label: string };
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onDelete: () => void;
  onEdit: (newLabel: string) => void;
  isEditMode?: boolean;
}

const formSchema = z.object({
  label: z.string().min(1, { message: "항목 이름은 필수입니다." }),
});

type FormValues = z.infer<typeof formSchema>;

export const ChecklistItem = ({
  item,
  isChecked,
  onCheckedChange,
  onDelete,
  onEdit,
  isEditMode = false,
}: ChecklistItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: item.label },
  });

  useEffect(() => {
    form.reset({ label: item.label });
  }, [item.label, form]);

  const handleSubmit = (values: FormValues) => {
    onEdit(values.label.trim());
    setIsOpen(false);
  };

  const WrapperComponent = isEditMode ? "div" : "label";

  const wrapperProps = {
    ...(!isEditMode && { htmlFor: item.id }),
    className: cn(
      "group flex items-center justify-between border-b p-2 min-h-15.25 bg-card hover:bg-black/3 dark:hover:bg-white/3",
      !isEditMode && "cursor-pointer",
    ),
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
            {/* 수정 다이얼로그 */}
            <ActionDialog
              open={isOpen}
              onOpenChange={setIsOpen}
              trigger={
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <FilePenLine className="h-4 w-4" />
                </Button>
              }
              title={`"${item.label}" 이름 수정`}
              description="수정할 항목의 새 이름을 입력해주세요."
              onAction={form.handleSubmit(handleSubmit)}
              actionText="수정"
              form={`edit-item-form-${item.id}`}
            >
              <Form {...form}>
                <form
                  id={`edit-item-form-${item.id}`}
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="grid gap-4 py-4"
                >
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">항목 이름</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="새 항목 이름"
                            className="col-span-3"
                          />
                        </FormControl>
                        <FormMessage className="col-span-4" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </ActionDialog>

            {/* 삭제 다이얼로그 */}
            <ConfirmAlertDialog
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive cursor-pointer"
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
            className="h-5 w-5 cursor-pointer"
          />
        )}
      </div>
    </WrapperComponent>
  );
};
