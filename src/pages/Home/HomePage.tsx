import { useNickname } from '@/hooks/useNickname';
import { NicknameDialog } from '@/features/auth/components/NicknameDialog'; // 1. 새로 만든 컴포넌트 import
import { Header, Layout } from '@/components/Layout';
import { Notice } from '@/features/notice/components';
import { AccountList } from '@/features/home/components';
import { useAccountStore } from '@/store/useAccountStore';

const HomePage = () => {
  const accounts = useAccountStore((state) => state.accounts);

  const {
    isDialogOpen,
    setIsDialogOpen,
    nickname,
    setNickname,
    isSubmitting,
    handleSubmit,
  } = useNickname();

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <Notice />
      <AccountList accounts={accounts} />

      {/* 2. 매우 깔끔해진 다이얼로그 렌더링 부분 */}
      <NicknameDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        nickname={nickname}
        onNicknameChange={setNickname}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default HomePage;
