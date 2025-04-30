import { useState } from 'react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAccountStore } from '@/store/useAccountStore';

type AccountDialogProps = {
  accountId: string;
  onCloseAutoFocus: (e?: Event) => void;
  onClose: (open: boolean) => void;
};

export const AccountDialog = ({
  accountId,
  onCloseAutoFocus,
  onClose,
}: AccountDialogProps) => {
  const [name, setName] = useState('');
  const updateAccount = useAccountStore((state) => state.updateAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount(accountId, { name });
    onClose(false);
    toast.success('계정이 수정되었습니다.');
  };

  return (
    <DialogContent
      className='gap-0 sm:max-w-[425px]'
      onCloseAutoFocus={(e) => {
        e.preventDefault();
        onCloseAutoFocus();
      }}
    >
      <DialogHeader>
        <DialogTitle>계정수정</DialogTitle>
        <DialogDescription>
          개인정보 보호를 위해 중요한 정보는 작성하지 말아 주세요.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-5 items-center'>
            <Label htmlFor='name' className='text-left'>
              계정이름
            </Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='col-span-4'
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>닫기</Button>
          </DialogClose>
          <Button type='submit'>수정하기</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
