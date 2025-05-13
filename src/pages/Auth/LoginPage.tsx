import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Header, Layout } from '@/components/Layout';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const message = location.state?.message;

    if (message) {
      setDialogMessage(message);
      setIsDialogOpen(true);

      // 새로고침 시 다이얼로그가 다시 뜨는 것을 방지하기 위해 location.state를 초기화
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex flex-col gap-5 h-full w-full items-center justify-center'>
        <LoginForm />
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이메일 인증 알림</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default LoginPage;
