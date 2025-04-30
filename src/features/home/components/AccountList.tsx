import { AccountData } from '@/types/account';
import { AccountCard } from './AccountCard';
import { AccountAddButton } from './AccountAddButton';

interface AccountListProps {
  accounts: AccountData[];
}

export const AccountList = ({ accounts }: AccountListProps) => {
  return (
    <section className='flex flex-col' aria-labelledby='account-section-title'>
      <header
        className={'flex py-5 gap-2 justify-end items-center [&_svg]:!size-5'}
      >
        <h2 id='account-section-title' className='flex-1 text-xl font-semibold'>
          계정관리
        </h2>
        <AccountAddButton />
      </header>
      <ul className='grid gap-4'>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} id={account.id} name={account.name} />
          ))
        ) : (
          <aside className='mt-4 p-4 border rounded-md bg-card text-muted-foreground text-center'>
            계정을 추가하여 캐릭터를 관리 해보세요.
          </aside>
        )}
      </ul>
    </section>
  );
};
