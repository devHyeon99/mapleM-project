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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAccountStore } from '@/store/accountStore';

export const AddCharacterDialog = () => {
  const [serverName, setServerName] = useState('');
  const [nickName, setNickName] = useState('');
  const [open, setOpen] = useState(false);
  const currentAccountId = useAccountStore((state) => state.currentAccountId);
  const addCharacter = useAccountStore((state) => state.addCharacter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName != '' && serverName != '') {
      addCharacter(currentAccountId, serverName, nickName);
      toast.success('캐릭터 추가가 완료되었습니다.', { duration: 3000 });
      setOpen(false);
      setServerName('');
      setNickName('');
    } else {
      toast.error('서버와 닉네임을 모두 입력해주세요.');
    }
  };

  const serverList = [
    { value: 'server1', label: '아케인' },
    { value: 'server2', label: '크로아' },
    { value: 'server3', label: '엘리시움' },
    { value: 'server4', label: '루나' },
    { value: 'server5', label: '스카니아' },
    { value: 'server6', label: '유니온' },
    { value: 'server7', label: '제니스' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex bg-muted w-full h-32' variant='ghost'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>캐릭터 추가</DialogTitle>
          <DialogDescription>
            추가하실 캐릭터의 서버와 닉네임을 기입해주세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-5 items-center gap-2'>
              <Label htmlFor='serverName' className='text-left'>
                서버
              </Label>
              <Select value={serverName} onValueChange={setServerName}>
                <SelectTrigger className='col-span-4 w-full'>
                  <SelectValue placeholder='서버를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>서버 목록</SelectLabel>
                    {serverList.map((server) => (
                      <SelectItem key={server.value} value={server.value}>
                        {server.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-5 items-center gap-2'>
              <Label htmlFor='nickName' className='text-left'>
                닉네임
              </Label>
              <Input
                id='nickName'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className='col-span-4'
                placeholder='닉네임을 입력하세요'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
