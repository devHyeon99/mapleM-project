import { Layout } from '@/components/Layout/Layout';
import { Notice } from '@/components/Notice/Notice';
import { AccountButtons } from '@/components/Account/AccountButtons';
import { AccountList } from '@/components/Account/AccountList';
import { Header } from '@/components/Layout/Header';

const App = () => {
  return (
    <Layout header={<Header title='메이플M 계정 관리' />}>
      <Notice />
      <AccountButtons />
      <AccountList />
    </Layout>
  );
};

export default App;
