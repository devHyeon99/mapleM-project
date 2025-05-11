import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useCharacterStore } from '@/store/useCharacterStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CharacterDeleteDialogProps {
  account: string;
  character: string;
}

export function CharacterDeleteDialog({
  account,
  character,
}: CharacterDeleteDialogProps) {
  const { removeCharacter } = useCharacterStore();

  const handleDelete = () => {
    const result = removeCharacter(account, character);

    if (result) {
      toast.success('캐릭터 삭제가 완료되었습니다.');
    } else {
      toast.warning('캐릭터 삭제에 실패하였습니다.');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='secondary'
          className='flex flex-row justify-center items-center w-full p-2 mt-2'
          aria-label='캐릭터 삭제'
        >
          <Trash2 className='size-5' aria-hidden />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 캐릭터를 삭제 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            캐릭터를 삭제 한 후에는 복구하실 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
