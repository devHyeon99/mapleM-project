"use client";

import { useState } from "react";
import type { Account } from "@/types/scheduler";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Settings } from "lucide-react";
import { AccountListItem } from "./AccountListItem";

interface ManageAccountsProps {
  accounts: Account[];
  onDeleteAccount: (
    accountId: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  isDeletingAccount: boolean;
  disabled: boolean;
}

export const ManageAccounts = ({
  accounts,
  onDeleteAccount,
  isDeletingAccount,
  disabled,
}: ManageAccountsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          <Settings className="mr-2 h-4 w-4" />
          관리
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>계정 관리</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>계정을 삭제할 수 있습니다.</span>
            <span className="text-red-500">
              삭제된 계정은 복구할 수 없습니다.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {accounts.length === 0 ? (
            <p className="text-muted-foreground w-full text-center">
              생성된 계정이 없습니다.
            </p>
          ) : (
            accounts.map((account) => (
              <AccountListItem
                key={account.id}
                account={account}
                onDeleteAccount={onDeleteAccount}
                isDeleting={isDeletingAccount}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
