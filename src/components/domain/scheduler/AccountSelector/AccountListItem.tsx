import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Account } from "@/types/scheduler";
import { Button } from "@/shared/ui/button";
import { ConfirmAlertDialog } from "@/components/common/ConfirmAlertDialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AccountListItemProps {
  account: Account;
  onDeleteAccount: (
    accountId: string,
    options?: { onSuccess?: () => void; onError?: (error: Error) => void },
  ) => void;
  isDeleting: boolean;
}

export const AccountListItem = ({
  account,
  onDeleteAccount,
  isDeleting,
}: AccountListItemProps) => {
  const queryClient = useQueryClient();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDeleteAccount(account.id, {
      onSuccess: () => {
        toast.success(`'${account.name}' 계정이 삭제되었습니다.`);
        setConfirmOpen(false); // 성공 시 다이얼로그 닫기
        // 데이터 리프레시를 위해 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
      },
      onError: (error) => {
        toast.error(`계정 삭제에 실패했습니다: ${error.message}`);
        setConfirmOpen(false); // 실패 시에도 다이얼로그 닫기
      },
    });
  };

  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <span className="font-medium">{account.name}</span>
      <ConfirmAlertDialog
        open={isConfirmOpen}
        onOpenChange={setConfirmOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            // 다른 항목이 삭제 중일 때 모든 삭제 버튼 비활성화
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
        title="정말 삭제하시겠습니까?"
        description={`'${account.name}' 계정과 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
        onConfirm={handleConfirmDelete}
        confirmText="삭제"
        isConfirmPending={isDeleting}
      />
    </div>
  );
};
