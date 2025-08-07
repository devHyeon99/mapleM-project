"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/ui/button";
import { ActionDialog } from "@/shared/ui/ActionDialog";
import { Input } from "@/shared/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  accountName: z
    .string()
    .min(2, { message: "계정 이름은 2글자 이상이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣]*$/, {
      message: "사용할 수 없는 계정 이름입니다. (영문, 숫자, 한글만 허용)",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAccountProps {
  onAddAccount: (name: string) => void;
  isAddingAccount: boolean;
  disabled: boolean;
}

export const AddAccount = ({
  onAddAccount,
  isAddingAccount,
  disabled,
}: AddAccountProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    onAddAccount(values.accountName);
    form.reset();
    setIsOpen(false);
    toast.success(`"${values.accountName}" 계정 생성이 완료되었습니다.`);
  };

  return (
    <ActionDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isAddingAccount) {
          return;
        }

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
      title="새 계정 추가"
      description={
        <span className="text-muted-foreground flex flex-col text-sm">
          <span>계정은 최대 4개까지 생성 가능합니다.</span>
          <span className="text-red-500">
            실제 아이디, 이메일을 적지마세요.
          </span>
        </span>
      }
      actionText="추가"
      isActionPending={isAddingAccount || form.formState.isSubmitting}
      form="add-account-form"
    >
      <Form {...form}>
        <form id="add-account-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-5">
                  <FormLabel className="whitespace-nowrap">계정 이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예: 본캐 계정"
                      autoComplete="off"
                      disabled={isAddingAccount}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ActionDialog>
  );
};
