import { Link, useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase/client';
import { Bell, ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function User({
  user,
}: {
  user: {
    name: string;
    email: string;
    nickname: string;
  };
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('로그아웃 되었습니다.', { duration: 1000 });
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex w-fit gap-2 cursor-pointer !pr-0 text-base'
          >
            <div className='grid flex-1 text-left leading-tight'>
              <span className='truncate font-medium'>{user.nickname}</span>
            </div>
            <ChevronsUpDown className='ml-auto size-4 text-muted-foreground' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          align='end'
          sideOffset={8}
        >
          <DropdownMenuLabel className='p-0 font-normal'>
            <div className='flex items-center gap-2 px-2 py-1.5 text-left text-sm'>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.nickname}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => alert('준비중')}>
              <Bell />
              알림
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/account'>
                <Settings />
                <span>설정</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <LogOut />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            로그아웃과 함께, 메인 페이지로 이동합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>로그아웃</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
