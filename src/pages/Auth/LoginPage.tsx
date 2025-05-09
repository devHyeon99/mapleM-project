import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Header, Layout } from '@/components/Layout';
import { supabase } from '@/lib/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';

type FormData = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameLogin: SubmitHandler<FormData> = async (formData) => {
    setIsPending(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        'custom-username-login',
        {
          body: formData,
        }
      );

      if (error) {
        throw error;
      }
      if (data.error) throw new Error(data.error);

      const { error: sessionError } = await supabase.auth.setSession(
        data.session
      );
      if (sessionError) throw sessionError;
    } catch (err: unknown) {
      if (err instanceof FunctionsHttpError) {
        try {
          const errorJson = await err.context.json();
          if (errorJson.error) {
            setError(errorJson.error);
          } else {
            setError('알 수 없는 함수 오류가 발생했습니다.');
          }
        } catch {
          setError('에러 응답을 파싱하는 데 실패했습니다.');
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsPending(false);
    }
  };

  // Google 소셜 로그인 핸들러
  const handleGoogleLogin = async () => {
    setIsPending(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex flex-col gap-5 h-full w-full items-center justify-center'>
        <LoginForm
          onUsernameLogin={handleUsernameLogin}
          onGoogleLogin={handleGoogleLogin}
          isPending={isPending}
          errorMessage={error} // 에러 메시지를 폼에 전달하여 보여줄 수 있습니다.
        />
      </div>
    </Layout>
  );
};

export default LoginPage;
