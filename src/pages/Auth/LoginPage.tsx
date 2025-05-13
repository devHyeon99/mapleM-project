import { LoginForm } from '@/features/auth/components/LoginForm';
import { Header, Layout } from '@/components/Layout';

export const LoginPage = () => {
  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex flex-col gap-5 h-full w-full items-center justify-center'>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
