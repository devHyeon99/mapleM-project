"use client";

import type { Account } from "@/types/scheduler";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionDialog } from "@/components/common/ActionDialog";
import { ConfirmAlertDialog } from "@/components/common/ConfirmAlertDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AccountSelectorProps {
  accounts: Account[];
  onAccountChange: (accountId: string) => void;
  onAddAccount: () => void;
  onDeleteAccount: (accountId: string, accountName: string) => void;
}

export const AccountSelector = ({
  accounts,
  onAccountChange,
  onAddAccount,
  onDeleteAccount,
}: AccountSelectorProps) => {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">계정 선택</h2>
        <div className="flex items-center gap-2">
          <ActionDialog
            trigger={
              <Button variant="outline" size="sm">
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
            onAction={onAddAccount}
            actionText="추가"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="account-name" className="text-right">
                  계정 이름
                </Label>
                <Input
                  id="account-name"
                  name="account-name"
                  placeholder="예: 본캐 계정"
                  className="col-span-3"
                />
              </div>
            </div>
          </ActionDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                관리
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>계정 관리</DialogTitle>
                <DialogDescription>
                  계정을 삭제할 수 있습니다. <br className="md:hidden" />
                  <strong className="text-red-500">
                    삭제된 계정은 복구할 수 없습니다.
                  </strong>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <span className="font-medium">{account.name}</span>
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
                      title="정말 삭제하시겠습니까?"
                      description={`'${account.name}' 계정과 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
                      onConfirm={() =>
                        onDeleteAccount(account.id, account.name)
                      }
                      confirmText="삭제"
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Select onValueChange={onAccountChange} name="account-select">
        <SelectTrigger className="w-full md:w-[280px]">
          <SelectValue placeholder="관리할 계정을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              {account.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};
