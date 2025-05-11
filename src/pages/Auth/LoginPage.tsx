import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Header, Layout } from '@/components/Layout';
import { signInWithUsername, signInWithGoogle } from '@/lib/supabase/auth';

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

    const { error } = await signInWithUsername(formData);

    if (error) {
      setError(error.message);
    }

    setIsPending(false);
  };

  const handleGoogleLogin = async () => {
    setIsPending(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex flex-col gap-5 h-full w-full items-center justify-center'>
        <LoginForm
          onUsernameLogin={handleUsernameLogin}
          onGoogleLogin={handleGoogleLogin}
          isPending={isPending}
          errorMessage={error}
        />
      </div>
    </Layout>
  );
};

export default LoginPage;
