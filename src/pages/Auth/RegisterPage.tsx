import { Header, Layout } from '@/components/Layout';
import { RegisterForm } from '@/features/auth';

const RegisterPage = () => {
  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='w-full max-w-sm'>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
