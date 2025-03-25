import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';

export function HeaderMenuGroup() {
  return (
    <ul className='flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-2'>
      <li>
        <Button
          variant='ghost'
          className='custom-header-button'
          aria-label='유저검색'
        >
          유저검색
        </Button>
      </li>
      <li>
        <Button
          variant='ghost'
          className='custom-header-button'
          aria-label='유저모집'
        >
          유저모집
        </Button>
      </li>
      <li>
        <Button
          variant='ghost'
          className='custom-header-button'
          aria-label='가이드북'
        >
          가이드북
        </Button>
      </li>
      <li>
        <Button
          variant='ghost'
          className='custom-header-button'
          aria-label='문의하기'
        >
          문의하기
        </Button>
      </li>
      <li>
        <Button
          variant='ghost'
          className='custom-header-button'
          aria-label='도움말'
        >
          도움말
        </Button>
      </li>
      <li>
        <ModeToggle />
      </li>
    </ul>
  );
}
