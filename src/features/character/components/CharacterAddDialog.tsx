import { useState } from 'react';
import {
  Dialog,
  DialogClose,
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
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAccountStore } from '@/store/useAccountStore';
import { useCharacterStore } from '@/store/useCharacterStore';
import { Plus } from 'lucide-react';
import { SERVER_LIST } from '@/constants/server_list';

export const CharacterAddDialog = () => {
  const [serverName, setServerName] = useState(''); // 서버 이름 상태
  const [nickName, setNickName] = useState(''); // 닉네임 상태
  const currentAccountId = useAccountStore((state) => state.currentAccountId);
  const addCharacter = useCharacterStore((state) => state.addCharacter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickName || !serverName) {
      toast.error('서버와 닉네임을 모두 입력해주세요.');
      return;
    }

    try {
      addCharacter(currentAccountId, serverName, nickName);
      toast.success('캐릭터 추가가 완료되었습니다.', { duration: 3000 });
      setServerName('');
      setNickName('');
    } catch (error) {
      toast.error('캐릭터 추가 중 오류가 발생했습니다.');
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex w-full h-32'
          size='icon'
          aria-label='캐릭터 추가'
        >
          <Plus aria-hidden className='size-6' />
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
              <Label className='text-left'>서버</Label>
              <Select value={serverName} onValueChange={setServerName}>
                <SelectTrigger className='col-span-4 w-full'>
                  <SelectValue placeholder='서버를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>서버 목록</SelectLabel>
                    {SERVER_LIST.map((server) => (
                      <SelectItem key={server.name} value={server.name}>
                        {server.name}
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
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary'>취소</Button>
            </DialogClose>
            <Button type='submit'>추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
