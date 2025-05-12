import { useNickname } from '@/hooks/useNickname';
import { NicknameDialog } from '@/features/auth/components/NicknameDialog';
import { Header, Layout } from '@/components/Layout';
import { Notice } from '@/features/notice/components';
import { AccountList } from '@/features/home/components';
import { useAccountStore } from '@/store/useAccountStore';
import { toast } from 'sonner';

const HomePage = () => {
  const accounts = useAccountStore((state) => state.accounts);

  const {
    isDialogOpen,
    setIsDialogOpen,
    nickname,
    setNickname,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    handleSubmit,
  } = useNickname({
    autoOpenDialog: true,
    onSuccess: (newNickname) => {
      toast.success(`환영합니다, ${newNickname}님!`);
      setIsDialogOpen(false);
    },
  });

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <Notice />
      <AccountList accounts={accounts} />

      <NicknameDialog
        open={isDialogOpen}
        nickname={nickname}
        onNicknameChange={handleNicknameChange}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
    </Layout>
  );
};

export default HomePage;
