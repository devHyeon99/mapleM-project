import { Header, Layout } from '@/components/Layout';
import { Notice } from '@/features/notice/components';
import { AccountList } from '@/features/home/components';
import { useAccountStore } from '@/store/useAccountStore';

const HomePage = () => {
  const accounts = useAccountStore((state) => state.accounts);

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <Notice />
      <AccountList accounts={accounts} />
    </Layout>
  );
};

export default HomePage;
