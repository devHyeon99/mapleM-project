import { ChevronLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';
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

  const handleBack = () => navigate('/');

  return (
    <header className='bg-background flex items-center justify-between pb-6'>
      {showBackButton && (
        <Button
          onClick={handleBack}
          size='icon'
          aria-label='뒤로 가기'
          className='[&_svg]:!size-5 focus-visible:ring-4 focus-visible:ring-[#FFCC88] focus-visible:outline-none'
        >
          <ChevronLeft />
        </Button>
      )}

      <h1
        className={`flex-1 flex items-center h-full text-xl text-foreground font-bold ${
          showBackButton ? 'justify-center' : 'justify-start'
        }`}
      >
        {title}
      </h1>

      {/* 데스크탑 메뉴 */}
      {showMenuBar && (
        <nav className='hidden md:flex' aria-label='메인 메뉴'>
          <HeaderMenuGroup />
        </nav>
      )}

      {/* 모바일 메뉴 (햄버거) */}
      {showMenuBar && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              className='md:hidden hover:bg-transparent'
              tooltip='메뉴'
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

      {/* 도움말 다이얼로그 */}
      {showCharacterHelpButton && <CharacterHelpDialog />}
    </header>
  );
};
