import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAccountStore } from '@/store/useAccountStore';
import { toast } from 'sonner';

type AccountAlertDialogProps = {
  accountId: string;
  onCloseAutoFocus: (e?: Event) => void;
};

export const AccountAlertDialog = ({
  accountId,
  onCloseAutoFocus,
}: AccountAlertDialogProps) => {
  const deleteSelected = useAccountStore(
    (state) => state.deleteSelectedAccount
  );

  const handleDelete = () => {
    const result = deleteSelected(accountId);
    if (!result.success) {
      toast.error(result.message || '삭제 중 오류가 발생했습니다.');
    } else {
      toast.success(result.message || '선택한 계정이 삭제되었습니다.');
    }
  };

  return (
    <AlertDialogContent
      onCloseAutoFocus={(e) => {
        e.preventDefault();
        onCloseAutoFocus();
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>정말 계정을 삭제하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          저장된 계정 정보가 모두 삭제됩니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
