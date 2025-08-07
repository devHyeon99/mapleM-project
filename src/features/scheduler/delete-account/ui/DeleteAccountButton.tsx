"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { ConfirmAlertDialog } from "@/shared/ui/ConfirmAlertDialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteAccountButtonProps {
  account: { id: string; name: string };
  onDeleteAccount: (
    accountId: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  isDeleting: boolean;
}

export const DeleteAccountButton = ({
  account,
  onDeleteAccount,
  isDeleting,
}: DeleteAccountButtonProps) => {
  const queryClient = useQueryClient();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDeleteAccount(account.id, {
      onSuccess: () => {
        toast.success(`'${account.name}' 계정이 삭제되었습니다.`);
        setConfirmOpen(false);
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
      },
      onError: (error) => {
        toast.error(`계정 삭제에 실패했습니다: ${error.message}`);
        setConfirmOpen(false);
      },
    });
  };

  return (
    <ConfirmAlertDialog
      open={isConfirmOpen}
      onOpenChange={setConfirmOpen}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      }
      title="정말 삭제하시겠습니까?"
      description={`'${account.name}' 계정과 모든 데이터가 영구적으로 삭제됩니다.`}
      onConfirm={handleConfirmDelete}
      confirmText="삭제"
      isConfirmPending={isDeleting}
    />
  );
};
