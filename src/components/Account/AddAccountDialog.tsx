import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useAccountStore } from '@/store/accountStore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const AddAccountDialog = () => {
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [open, setOpen] = useState(false);
  const addAccount = useAccountStore((state) => state.addAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addAccount(name, memo);

    if (!result.success) {
      toast.error(result.message || '알 수 없는 오류가 발생했습니다.', {
        duration: 3000,
      });
    } else {
      toast.success(result.message, {
        duration: 3000,
      });
      setOpen(false);
      setName('');
      setMemo('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='icon'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>계정 추가</DialogTitle>
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
            <div className='grid grid-cols-5 items-center'>
              <Label htmlFor='memo' className='text-left'>
                계정메모
              </Label>
              <Input
                id='memo'
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className='col-span-4'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>계정등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
