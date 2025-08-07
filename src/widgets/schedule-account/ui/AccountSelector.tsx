"use client";

import type { Account } from "@/entities/scheduler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Card } from "@/shared/ui/card";
import { AlertCircle } from "lucide-react";
import { AddAccount } from "@/features/scheduler/add-account";
import { ManageAccounts } from "@/features/scheduler/manage-account";
import { LoadingCard } from "@/shared/ui/LoadingCard";

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccountId: string | null;
  onAccountChange: (accountId: string) => void;
  onAddAccount: (
    name: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  onDeleteAccount: (
    accountId: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  loading: boolean;
  isAddingAccount: boolean;
  isDeletingAccount: boolean;
  error: Error | null;
}

export const AccountSelector = ({
  accounts,
  selectedAccountId,
  onAccountChange,
  onAddAccount,
  onDeleteAccount,
  loading,
  isAddingAccount,
  isDeletingAccount,
  error,
}: AccountSelectorProps) => {
  const renderContent = () => {
    if (loading) {
      return <LoadingCard message="계정 정보를 불러오고 있습니다..." />;
    }

    if (error) {
      return (
        <Card className="border-destructive bg-destructive/10 flex flex-col items-center p-4">
          <AlertCircle className="text-destructive mb-2 h-6 w-6" />
          <p className="text-destructive text-sm font-medium">
            계정 정보를 불러오는데 실패했습니다.
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{error.message}</p>
        </Card>
      );
    }
    if (accounts.length === 0) {
      return (
        <Card className="flex flex-col items-center p-4">
          <p className="text-muted-foreground text-sm">
            계정 추가 버튼을 통해 관리할 계정을 추가해보세요!
          </p>
        </Card>
      );
    }
    return (
      <Select value={selectedAccountId ?? ""} onValueChange={onAccountChange}>
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
    );
  };

  const isButtonDisabled = loading || !!error;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">계정 선택</h2>
        <div className="flex items-center gap-2">
          <AddAccount
            onAddAccount={onAddAccount}
            isAddingAccount={isAddingAccount}
            disabled={
              isButtonDisabled || isDeletingAccount || accounts.length >= 4
            }
          />
          <ManageAccounts
            accounts={accounts}
            onDeleteAccount={onDeleteAccount}
            isDeletingAccount={isDeletingAccount}
            disabled={isButtonDisabled}
          />
        </div>
      </div>
      {renderContent()}
    </section>
  );
};
