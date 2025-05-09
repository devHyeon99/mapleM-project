import { Layout, Header } from '@/components/Layout';
import { CharacterSlider } from '@/features/character/components';
import { useCurrentAccountData } from '@/hooks/useCurrentAccountData';

const AccountManagerPage = () => {
  const { currentAccount } = useCurrentAccountData();

  if (!currentAccount) {
    return (
      <Layout header={<Header title='계정관리' showBackButton={true} />}>
        <div className='p-6 text-center'>계정을 찾을 수 없습니다.</div>
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <Header
          title='계정관리'
          showBackButton={true}
          showCharacterHelpButton={true}
        />
      }
    >
      <div className='flex flex-col gap-6 h-full'>
        <CharacterSlider />
      </div>
    </Layout>
  );
};

export default AccountManagerPage;
