"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionDialog } from "@/components/common/ActionDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { WORLD_NAMES } from "@/constants/worlds";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "캐릭터 이름은 2자 이상이어야 합니다." })
    .max(8, { message: "캐릭터 이름은 8자 이하이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣]*$/, {
      message: "사용할 수 없는 캐릭터 이름입니다.",
    }),
  world_name: z.enum(WORLD_NAMES, {
    message: "월드를 선택해주세요.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCharacterProps {
  onAddCharacter: UseMutateFunction<unknown, Error, FormValues, unknown>;
  isAdding: boolean;
  disabled?: boolean;
}

export const AddCharacter = ({
  onAddCharacter,
  isAdding,
  disabled,
}: AddCharacterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      world_name: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(values: FormValues) {
    onAddCharacter(values, {
      onSuccess: () => {
        toast.success(`"${values.name}" 캐릭터가 성공적으로 추가되었습니다.`);
      },
      onError: (error) => {
        toast.error(`캐릭터 추가에 실패했습니다: ${error.message}`);
      },
    });

    form.reset();
    setIsOpen(false);
  }

  return (
    <ActionDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isAdding) return;

        if (!open) {
          form.reset();
        }
        setIsOpen(open);
      }}
      trigger={
        <Button variant="outline" size="sm" disabled={disabled}>
          <UserPlus className="mr-2 h-4 w-4" />
          추가
        </Button>
      }
      title="새 캐릭터 추가"
      description="관리할 캐릭터의 이름과 월드를 정확히 입력해주세요."
      actionText="추가"
      isActionPending={isAdding || form.formState.isSubmitting}
      form="add-character-form"
    >
      <Form {...form}>
        <form
          id="add-character-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          {/* 월드 선택 필드 */}
          <FormField
            control={form.control}
            name="world_name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">월드</FormLabel>
                <div className="col-span-3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isAdding}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="월드를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WORLD_NAMES.map((world) => (
                        <SelectItem key={world} value={world}>
                          {world}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage className="col-span-4 mb-2" />
              </FormItem>
            )}
          />

          {/* 캐릭터 이름 필드 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">캐릭터 이름</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input
                      placeholder="캐릭터 이름 입력"
                      autoComplete="off"
                      disabled={isAdding}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ActionDialog>
  );
};
