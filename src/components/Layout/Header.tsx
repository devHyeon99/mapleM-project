import { ChevronLeft } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className='bg-background flex justify-between items-center pb-6'>
      {showBackButton && (
        <Button
          className='[&_svg]:!size-5'
          onClick={handleBack}
          size='icon'
          aria-label='뒤로 가기'
        >
          <ChevronLeft />
        </Button>
      )}
      <h1 className='text-xl text-foreground flex items-center h-full font-semibold'>
        {title}
      </h1>
      <ModeToggle />
    </header>
  );
};
