import { Header, Layout } from '@/components/Layout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout header={<Header title='MMGG' showMenuBar={true} />}>
      <div className='flex flex-col gap-5 h-full w-full items-center justify-center'>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
