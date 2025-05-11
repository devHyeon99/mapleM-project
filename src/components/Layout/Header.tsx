import { useMemo } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CharacterHelpDialog } from '@/features/character/components/CharacterHelpDialog';
import { HeaderMenuGroup } from './HeaderMenuGroup';
import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/features/auth/components/User';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuBar?: boolean;
  showCharacterHelpButton?: boolean;
}

export const Header = ({
  title,
  showBackButton = false,
  showMenuBar = false,
  showCharacterHelpButton = false,
}: HeaderProps) => {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAuthStore();
  const handleBack = () => navigate(-1);

  const userData = useMemo(() => {
    if (!user) {
      return {
        name: '',
        email: '',
        nickname: '',
      };
    }

    return {
      name: user.user_metadata.full_name ?? '이름 없음',
      email: user.email ?? '이메일 정보 없음',
      nickname: profile?.nickname ?? '닉네임 미설정',
    };
  }, [user, profile]);

  return (
    <div className='relative pt-10 pb-4'>
      <div className='absolute w-full -top-1 right-0 flex justify-end gap-4'>
        {/* 3. isLoading을 최우선으로 체크합니다. */}
        {isLoading ? (
          <div className='flex items-center gap-2 py-2 pl-4 font-bold'>
            로그인
          </div>
        ) : user && userData ? (
          <User user={userData} />
        ) : (
          <Button
            asChild
            variant='link'
            className='pr-0 font-bold text-base text-foreground hover:text-primary'
          >
            <Link to='/login'>로그인</Link>
          </Button>
        )}
      </div>

      <header className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {showBackButton && (
            <Button
              onClick={handleBack}
              variant='ghost'
              size='icon'
              aria-label='뒤로 가기'
            >
              <ChevronLeft className='size-7' />
            </Button>
          )}
          <Link to='/' className='text-2xl text-foreground font-bold'>
            {title}
          </Link>
        </div>

        <div className='flex items-center justify-end gap-2'>
          {showMenuBar && (
            <nav className='hidden md:flex' aria-label='메인 메뉴'>
              <HeaderMenuGroup />
            </nav>
          )}

          {showCharacterHelpButton && <CharacterHelpDialog />}

          {showMenuBar && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  className='md:hidden hover:bg-transparent justify-end'
                  aria-label='메인 메뉴'
                >
                  <Menu className='size-6' aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>MMGG Main Menu</SheetDescription>
                </SheetHeader>
                <nav className='flex flex-col' aria-label='메인 메뉴'>
                  <HeaderMenuGroup />
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>
    </div>
  );
};
