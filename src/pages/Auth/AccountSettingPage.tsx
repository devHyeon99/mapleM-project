import { useState } from 'react';
import { useNickname } from '@/hooks/useNickname';
import { Header, Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useNavigate } from 'react-router';

const AccountSettingPage = () => {
  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    nickname,
    setNickname,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    handleSubmit,
    canChangeNickname,
    daysUntilChangeable,
  } = useNickname({
    onSuccess: (newNickname) => {
      toast.success(
        `닉네임이 '${newNickname}'(으)로 성공적으로 변경되었습니다.`
      );
    },
  });

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleConfirmDelete = async () => {
    setIsAlertOpen(false);
    setIsDeleting(true);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'delete-user'
      );
      if (functionError) throw functionError;

      await supabase.auth.signOut();

      toast.success(data.message || '성공적으로 탈퇴 처리되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('계정 삭제 중 오류 발생:', error);
      toast.error('계정 삭제 중 오류가 발생했습니다.');
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <main className='flex flex-col items-center justify-center min-h-dvh'>
        <Loader2 className='h-12 w-12 animate-spin text-primary mb-6' />
        <h1 className='text-2xl font-bold mb-2'>회원탈퇴를 진행중입니다...</h1>
        <p className='text-muted-foreground text-center'>
          잠시만 기다려주세요...
        </p>
      </main>
    );
  }

  return (
    <>
      <Layout header={<Header title='MMGG' showMenuBar={true} />}>
        <main className='flex flex-col h-full items-center justify-center p-4 md:p-8'>
          <div className='w-full max-w-2xl space-y-8'>
            {/* 닉네임 변경 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>닉네임 변경</CardTitle>
                <CardDescription>
                  닉네임은 한 달에 한 번만 변경할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid w-full items-center gap-2'>
                  <Label htmlFor='nickname'>새 닉네임</Label>
                  <Input
                    id='nickname'
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder='2글자 이상 입력하세요'
                    aria-label='새 닉네임 입력'
                    data-error={!!errorMessage}
                    className='data-[error=true]:border-destructive'
                    disabled={!canChangeNickname || isSubmitting}
                  />
                  {errorMessage && (
                    <p className='text-sm font-medium text-destructive'>
                      {errorMessage}
                    </p>
                  )}
                  {!canChangeNickname && (
                    <p className='text-sm font-medium text-destructive'>
                      다음 변경 가능일 : ({daysUntilChangeable}일 남음)
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <Button
                  onClick={() => handleSubmit()}
                  disabled={!canChangeNickname || isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  {isSubmitting
                    ? '저장 중...'
                    : canChangeNickname
                    ? '변경사항 저장'
                    : '변경 불가'}
                </Button>
              </CardFooter>
            </Card>

            {/* 회원 탈퇴 섹션 */}
            <Card className='border-destructive'>
              <CardHeader>
                <CardTitle>회원 탈퇴</CardTitle>
                <CardDescription>
                  계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없으며, 모든
                  데이터가 삭제됩니다.
                </CardDescription>
              </CardHeader>
              <CardFooter className='flex justify-end'>
                <Button
                  variant='destructive'
                  onClick={() => setIsAlertOpen(true)}
                  aria-label='회원 탈퇴 절차 시작'
                >
                  회원 탈퇴
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>

        {/* 회원탈퇴 확인 다이얼로그 */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 탈퇴하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며, 모든
                관련 데이터가 서버에서 제거됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              >
                네, 탈퇴하겠습니다
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout>
    </>
  );
};

export default AccountSettingPage;
