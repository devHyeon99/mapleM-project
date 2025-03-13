import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useAccountStore } from '@/store/accountStore';
import { toast } from 'sonner';

export const DeleteAccountDialog = () => {
  const selectedIds = useAccountStore((state) => state.selectedIds);

  const deleteSelected = useAccountStore(
    (state) => state.deleteSelectedAccounts
  );

  const handleDelete = () => {
    const result = deleteSelected();

    if (!result.success) {
      toast.error(result.message || '삭제 중 오류가 발생했습니다.', {
        duration: 3000,
      });
    } else {
      toast.success(result.message || '선택한 계정이 삭제되었습니다.', {
        duration: 3000,
      });
    }
  };

  return (
    selectedIds.length >= 1 && (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='icon'>
            <Trash2 fill='red' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
      </AlertDialog>
    )
  );
};
