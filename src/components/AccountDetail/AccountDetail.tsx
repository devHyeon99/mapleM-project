import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAccountStore } from '@/store/accountStore';
import { Layout } from '@/components/Layout/Layout';
import { AccountCard } from '@/components/Account/AccountCard';
import { Header } from '@/components/Layout/Header';
import { CharacterSlider } from './CharacterSlider';
import { Account } from '@/types/account';

export function AccountDetail(): ReactNode {
  const { id } = useParams<{ id: string }>();
  const accounts = useAccountStore((state) => state.accounts);
  const setCurrentAccountId = useAccountStore(
    (state) => state.setCurrentAccountId
  );

  // 컴포넌트 마운트 시 현재 계정 ID 설정
  useEffect(() => {
    if (id) {
      setCurrentAccountId(id);
    }

    // 컴포넌트 언마운트 시 초기화
    return () => setCurrentAccountId(null);
  }, [id, setCurrentAccountId]);

  const account = accounts.find((acc: Account) => acc.id === id);

  if (!account) {
    return <div className='p-6'>계정을 찾을 수 없습니다.</div>;
  }

  return (
    <Layout header={<Header title='계정관리' showBackButton={true} />}>
      <div className='flex flex-col gap-6'>
        <AccountCard
          id={account.id}
          name={account.name}
          subtitle={account.subtitle}
          link={false}
        />

        <CharacterSlider characters={account.characters} />
      </div>
    </Layout>
  );
}
