"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccounts,
  createAccount,
  deleteAccount as apiDeleteAccount,
} from "@/api/accounts";
import { Account } from "@/types/scheduler";
import { toast } from "sonner";
import { useState } from "react";

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const {
    data: accounts = [],
    isLoading: isFetchingAccounts,
    error,
  } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
    staleTime: 1000 * 60 * 5,
  });

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const { mutate: addAccount, isPending: isAddingAccount } = useMutation({
    mutationFn: (accountName: string) => createAccount(accountName),
    onSuccess: (newAccount) => {
      queryClient.setQueryData<Account[]>(["accounts"], (oldData = []) => [
        ...oldData,
        ...newAccount,
      ]);

      const newCreatedAccount = newAccount[0];
      if (newCreatedAccount) {
        setSelectedAccountId(newCreatedAccount.id);
      }
    },
    onError: () => {
      toast.error("계정 생성에 실패했습니다.");
    },
  });

  const { mutate: deleteAccount, isPending: isDeletingAccount } = useMutation({
    mutationFn: (accountId: string) => apiDeleteAccount(accountId),
    onSuccess: () => setSelectedAccountId(""),
  });

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  return {
    accounts,
    selectedAccountId,
    handleAccountChange,
    handleAddAccount: addAccount,
    handleDeleteAccount: deleteAccount,
    loading: isFetchingAccounts,
    isAddingAccount,
    isDeletingAccount,
    error,
  };
};
