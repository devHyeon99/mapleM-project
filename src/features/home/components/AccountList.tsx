import { AccountData } from '@/types/account';
import { AccountCard } from './AccountCard';
import { AccountAddButton } from './AccountAddButton';
import { useAuthStore } from '@/store/useAuthStore'; // 1. 로그인 상태를 확인하기 위해 auth 스토어를 가져옵니다.
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

interface AccountListProps {
  accounts: AccountData[];
}

export const AccountList = ({ accounts }: AccountListProps) => {
  // 2. 스토어에서 현재 세션 정보를 가져옵니다.
  const { session, isLoading } = useAuthStore();

  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // 로딩 중 상태
  if (isLoading) {
    return (
      <section
        className='flex flex-col'
        aria-labelledby='account-section-title'
      >
        <header className='flex py-5 items-center'>
          <h2
            id='account-section-title'
            className='flex-1 text-xl font-semibold'
          >
            계정관리
          </h2>
        </header>
        <div className='p-4 border rounded-md bg-card text-muted-foreground text-center'>
          계정 정보를 가져오는중{'.'.repeat(dots || 1)}
        </div>
      </section>
    );
  }

  // 시나리오 1: 로그인하지 않은 상태
  if (!session) {
    return (
      <section
        className='flex flex-col'
        aria-labelledby='account-section-title'
      >
        <header className='flex py-5 items-center'>
          <h2
            id='account-section-title'
            className='flex-1 text-xl font-semibold'
          >
            계정관리
          </h2>
        </header>
        <div className='flex flex-col p-4 border rounded-md bg-card '>
          <aside className='py-2 text-muted-foreground text-center'>
            로그인을 통해 캐릭터를 관리해보세요.
          </aside>
          <Button variant='link' className='text-base' asChild>
            <Link to='/login'>로그인 페이지로 이동</Link>
          </Button>
        </div>
      </section>
    );
  }

  // 시나리오 2 & 3: 로그인한 상태
  return (
    <section className='flex flex-col' aria-labelledby='account-section-title'>
      <header
        className={'flex py-5 gap-2 justify-end items-center [&_svg]:!size-5'}
      >
        <h2 id='account-section-title' className='flex-1 text-xl font-semibold'>
          계정관리
        </h2>
        {/* 계정 추가 버튼은 로그인한 사람에게만 보입니다. */}
        <AccountAddButton />
      </header>
      <ul className='grid gap-4'>
        {accounts.length > 0 ? (
          // 시나리오 3: 로그인 O, 데이터 O
          accounts.map((account) => (
            <AccountCard key={account.id} id={account.id} name={account.name} />
          ))
        ) : (
          // 시나리오 2: 로그인 O, 데이터 X
          <aside className='p-4 border rounded-md bg-card text-muted-foreground text-center'>
            캐릭터를 추가해서 관리해보세요.
          </aside>
        )}
      </ul>
    </section>
  );
};
