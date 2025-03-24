import { useEffect, useState } from 'react';
import {
  Dialog,
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

type AccountDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: 'add' | 'edit';
  initialName?: string;
  onSubmit: (name: string) => { success: boolean; message?: string };
};

export const AccountDialog = ({
  open,
  setOpen,
  mode,
  initialName = '',
  onSubmit,
}: AccountDialogProps) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onSubmit(name.trim());

    if (!result.success) {
      toast.error(result.message || '알 수 없는 오류가 발생했습니다.');
    } else {
      toast.success(result.message);
      setOpen(false);
      setName('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='gap-0 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? '계정 추가' : '계정 수정'}
          </DialogTitle>
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
            <Button type='submit'>
              {mode === 'add' ? '계정등록' : '수정하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
