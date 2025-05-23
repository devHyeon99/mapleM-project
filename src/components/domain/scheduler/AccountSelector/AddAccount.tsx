"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionDialog } from "@/components/common/ActionDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

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
  const [newAccountName, setNewAccountName] = useState("");

  const handleAction = () => {
    if (!newAccountName.trim()) {
      toast.warning("계정 이름을 입력해주세요.");
      return;
    }
    onAddAccount(newAccountName.trim(), {
      onSuccess: () => {
        toast.success("계정 생성이 완료되었습니다.");
        setNewAccountName("");
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
          스케줄러로 관리할 계정의 이름을 입력해주세요.
          <br />
          <strong className="text-red-400">
            실제 아이디, 이메일을 적지마세요.
          </strong>
        </>
      }
      onAction={handleAction}
      actionText="추가"
      isActionPending={isAddingAccount}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="account-name" className="text-right">
            계정 이름
          </Label>
          <Input
            id="account-name"
            placeholder="예: 본캐 계정"
            className="col-span-3"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
            disabled={isAddingAccount}
          />
        </div>
      </div>
    </ActionDialog>
  );
};
