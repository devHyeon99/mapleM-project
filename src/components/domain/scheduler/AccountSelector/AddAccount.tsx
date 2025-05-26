"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ActionDialog } from "@/components/common/ActionDialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  accountName: z
    .string()
    .min(2, { message: "계정 이름은 2글자 이상이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣]*$/, {
      message: "사용할 수 없는 계정 이름입니다.",
    }),
});

interface AddAccountProps {
  onAddAccount: (
    name: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  isAddingAccount: boolean;
  disabled: boolean;
}

export const AddAccount = ({
  onAddAccount,
  isAddingAccount,
  disabled,
}: AddAccountProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddAccount(values.accountName, {
      onSuccess: () => {
        toast.success("계정 생성이 완료되었습니다.");
        form.reset();
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`계정 생성에 실패했습니다: ${error.message}`);
      },
    });
  };

  return (
    <ActionDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button variant="outline" size="sm" disabled={disabled}>
          <UserPlus className="mr-2 h-4 w-4" />
          추가
        </Button>
      }
      title="새 계정 추가"
      description={
        <>
          <span>스케줄러로 관리할 계정의 이름을 입력해주세요.</span>
          <br />
          <span className="text-red-400">
            실제 아이디, 이메일을 적지마세요.
          </span>
        </>
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
                <FormMessage className="mt-2 text-center" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ActionDialog>
  );
};
