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

    onMutate: async (accountName: string) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });

      const previousAccounts = queryClient.getQueryData<Account[]>([
        "accounts",
      ]);

      const optimisticId = `optimistic-${Date.now()}`;

      const newOptimisticAccount: Account = {
        id: optimisticId,
        name: accountName,
      };

      queryClient.setQueryData<Account[]>(["accounts"], (oldData = []) => [
        ...oldData,
        newOptimisticAccount,
      ]);

      setSelectedAccountId(optimisticId);

      return { previousAccounts, optimisticId };
    },

    onError: (err, newAccount, context) => {
      toast.error("계정 생성에 실패했습니다.");
      if (context?.optimisticId) {
        queryClient.setQueryData<Account[]>(["accounts"], (oldData = []) =>
          oldData.filter((account) => account.id !== context.optimisticId),
        );
      }
      setSelectedAccountId(null);
    },

    onSuccess: (newAccountFromServer, variables, context) => {
      const realAccount = newAccountFromServer[0];
      if (!realAccount) return;

      queryClient.setQueryData<Account[]>(["accounts"], (oldData = []) =>
        oldData.map((account) =>
          account.id === context?.optimisticId ? realAccount : account,
        ),
      );

      setSelectedAccountId(realAccount.id);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const { mutate: deleteAccount, isPending: isDeletingAccount } = useMutation({
    mutationFn: (accountId: string) => apiDeleteAccount(accountId),

    onMutate: async (accountId: string) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });

      const previousAccounts = queryClient.getQueryData<Account[]>([
        "accounts",
      ]);

      queryClient.setQueryData<Account[]>(["accounts"], (oldData = []) =>
        oldData.filter((account) => account.id !== accountId),
      );

      if (selectedAccountId === accountId) {
        const remainingAccounts = previousAccounts?.filter(
          (account) => account.id !== accountId,
        );
        setSelectedAccountId(remainingAccounts?.[0]?.id || null);
      }

      return { previousAccounts };
    },

    onError: (err, accountId, context) => {
      toast.error("계정 삭제에 실패했습니다.");
      if (context?.previousAccounts) {
        queryClient.setQueryData(["accounts"], context.previousAccounts);
      }
    },

    onSuccess: () => {
      toast.success("계정이 삭제되었습니다.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
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
