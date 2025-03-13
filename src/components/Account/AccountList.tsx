import { AccountCard } from './AccountCard';
import { useAccountStore } from '@/store/accountStore';

export const AccountList = () => {
  const accounts = useAccountStore((state) => state.accounts);
  const selectionMode = useAccountStore((state) => state.selectionMode);
  const selectedIds = useAccountStore((state) => state.selectedIds);
  const selectAccount = useAccountStore((state) => state.selectAccount);

  return (
    <div className='grid gap-4'>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <AccountCard
            key={account.id}
            id={account.id}
            name={account.name}
            subtitle={account.subtitle}
            content={account.content}
            selectable={selectionMode}
            selected={selectedIds.includes(account.id)}
            onSelectChange={(checked) => selectAccount(account.id, checked)}
          />
        ))
      ) : (
        <span className='text-center font-normal'>
          계정을 추가하여 캐릭터를 관리 해보세요!
        </span>
      )}
    </div>
  );
};
