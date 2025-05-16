import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <span className='font-bold'>Maple M GG</span>
        </Link>
        <nav className='flex items-center space-x-6 text-sm font-medium'>
          <Link
            href='/character'
            className='transition-colors hover:text-foreground/80'
          >
            캐릭터 검색
          </Link>
          <Link
            href='/party'
            className='transition-colors hover:text-foreground/80'
          >
            파티 모집
          </Link>
          <Link
            href='/guild'
            className='transition-colors hover:text-foreground/80'
          >
            길드 모집
          </Link>
          <Link
            href='/guidebook'
            className='transition-colors hover:text-foreground/80'
          >
            가이드북
          </Link>
          <Link
            href='/scheduler'
            className='transition-colors hover:text-foreground/80'
          >
            스케줄러
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
